import * as React from "react";

import AwesomeDebouncePromise from "awesome-debounce-promise";

import '../styles/AirportSelector.css';
import { getLocationsForQuery, ILocationData } from "../api/locations";

interface IAirportSelectorState {
    locationResults: ILocationData[];
    isInputFocused: boolean;
    airportQuery: string;
    hasFirstQueryBeenMade: boolean; // So that we don't show the user that no results were found upon initially typing

    selectedLocation: ILocationData | null;
}

interface IAirportSelectorProps {
    placeholderText?: string;
    onAirportSelectionUpdated: (selectedLocation: ILocationData) => void;
}

export class AirportSelector extends React.Component<IAirportSelectorProps, IAirportSelectorState> {

    selectorContainerRef: React.RefObject<HTMLDivElement>;

    public constructor(props: IAirportSelectorProps) {
        super(props)

        this.selectorContainerRef = React.createRef();

        this.state = {
            locationResults: [],
            isInputFocused: false,
            airportQuery: '',
            hasFirstQueryBeenMade: false,
            selectedLocation: null
        }
    }

    onInputFocus = () => {
        // When the input element is focused, we set that in state so we know
        // to display the results list (if a sufficient query is entered).
        this.setState({
            isInputFocused: true
        });
    };

    onInputBlur = () => {
        // Check if focus shifted to a child element, if so, keep the selection list open.
        const currentlyFocusedElement = document.activeElement;
        const selectorContainerElement: HTMLDivElement | null = this.selectorContainerRef.current;
        if (!!selectorContainerElement && !!currentlyFocusedElement && this.isElementParentOf(selectorContainerElement, currentlyFocusedElement)) {
            return;
        }

        // The focus has been lost on the Selector input and the new focus element is not a child of the AirportSelector.
        // Closing the list since focus is now on an unrelated component or element.
        this.setState({
            isInputFocused: false
        });
    }

    isElementParentOf = (parentElement: Element, childElement: Element) => {
        // Uses the Node class to check if a HTMLElement is a descendant of another.
        // The Node compareDocumentPosition function returns a bitmask containing bits
        // that encode information about their dom structure. We just want to see if 
        // the parent contains the child, so we check if the Node.DOCUMENT_POSITION_CONTAINS (8)
        // bit is set in the mask or not. If it is, the the child element DOES descend from the parent.
        return (parentElement.compareDocumentPosition(childElement) & Node.DOCUMENT_POSITION_CONTAINS) !== 0;
    }

    isQueryEntered = (): boolean => {
        const currentQuery = this.state.airportQuery;
        return !!currentQuery && currentQuery.length > 0;
    }

    render() {
        const hasSelection = !!this.state.selectedLocation;
        return (
            <div>
            {hasSelection
                ? this.renderSelectedAirport()
                : this.renderSelectionInput()
            }
            </div>
        )
    }

    renderSelectedAirport = () => {
        const hasPlaceholder = !!this.props.placeholderText;
        return <div className='airportSelected'>
            <div className='selectedAirportDetails'>
                {hasPlaceholder
                    ? <label className="placeholder">{this.props.placeholderText}:</label>
                    : null}
                <label className='airportName'>{this.state.selectedLocation?.name}</label>
                <label className='airportCity'>{this.state.selectedLocation?.address.cityName}</label>
                {/* <label className='airportCountry'>{this.state.selectedLocation?.address.countryName}</label> */}
                {/* <label className='iataCode'>{this.state.selectedLocation?.iataCode}</label> */}
            </div>
            <div className='deselectButtonContainer'>
                <label className='deselectButton' onClick={this.onDeselectingAirportLocation}>x</label>
            </div>
        </div>;
    };

    onDeselectingAirportLocation = () => {
        this.setState({
            selectedLocation: null,
            airportQuery: ''
        });
    };

    renderSelectionInput = () => {
        const shouldShowResults = this.state.isInputFocused && this.state.hasFirstQueryBeenMade && this.isQueryEntered();
        return <div className='airportSelector' ref={this.selectorContainerRef}>
                    <input placeholder={this.props.placeholderText} onChange={this.onQueryUpdated} onFocus={this.onInputFocus} onBlur={this.onInputBlur} />
                    { shouldShowResults
                        ? this.renderResultsList()
                        : null
                    }
                </div>
    }

    renderNoResultsMessage = () => {
        return <label className='noResultsMessage'>No results found for this query.</label>
    };

    renderResultsList = () => {
        return <div className="floatBlock">
            {this.state.locationResults.length == 0
                ? this.renderNoResultsMessage()
                : this.state.locationResults.map((location, index) => {
                    return index > 10
                        ? null
                        : this.renderLocationListItem(location)
                })
            }

        </div>
    };

    renderLocationListItem = (location: ILocationData) => {
        return <div className="locationListItem" onClick={this.onLocationListItemClicked} accessKey={location.iataCode}>
            <label className="airportName">{location.name}</label>
            <label className="cityName">{location.address.cityName}</label>
            <label className="iataCode">{location.iataCode}</label>
        </div>
    };

    getLocationByIataCode = (iataCode: string): ILocationData | undefined => {
        return this.state.locationResults.find(location => {
            return location.iataCode === iataCode;
        });
    };

    onLocationListItemClicked = (event: React.MouseEvent<HTMLDivElement>) => {
        const iataCode = event.currentTarget.accessKey;
        const locationBeingSelected: ILocationData | undefined = this.getLocationByIataCode(iataCode);

        if (locationBeingSelected === undefined) {
            console.error(`User clicked a list item from the AirportSelector, however no airport with expected IATA code was found: ${iataCode}`)
            return;
        }

        this.setState({
            selectedLocation: locationBeingSelected
        });
        this.props.onAirportSelectionUpdated(locationBeingSelected);
    };

    onQueryUpdated = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement: HTMLInputElement = event.currentTarget;
        const newQuery = inputElement.value;
        this.setState({
            airportQuery: newQuery
        });
        this.debouncedResultsUpdating();
    };

    updateResultsFromAPI = async () => {
        console.log('Getting search results from AirportSelector component');
        const query = this.state.airportQuery;
        const flightJSON: Array<ILocationData> | Error = await getLocationsForQuery(query);
        if (flightJSON instanceof Error) {
            this.setState({
                locationResults: []
            });
            console.error(`Failed to get location data from API via AirportSelector component: '${flightJSON.message}`);
            return;
        }

        // Filter out results that are just towns/locations, not airports.
        const airportsOnlyLocations = flightJSON.filter(location => {
            return location.subType === 'AIRPORT';
        });
        
        this.setState({
            hasFirstQueryBeenMade: true,
            locationResults: airportsOnlyLocations
        });
    };

    // Waits to call the function until it finds that it has not been called again for 500ms.
    // This allows us to hold off on the call if we're still typing so that we can reduce
    // unnecessary API calls made to the backend when we haven't finished writing the query.
    debouncedResultsUpdating = AwesomeDebouncePromise(this.updateResultsFromAPI, 500);
}
