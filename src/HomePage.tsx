import * as React from "react";
import { FlightClass } from "./enums/FlightClass";
import { FlightType } from "./enums/FlightType";
import { ToastType } from "./enums/ToastType";
import { IToastMessage, ToastMessage } from "./components/ToastMessage";
import  Header  from "./components/Header";

import './styles/HomePage.css';
import './styles/theme.css';
import { FlightList } from "./components/FlightList";
import { ImageCarousel } from "./components/ImageCarousel";
import moment = require("moment");
import { Flight, MultiCityFlightSelect } from "./components/MultiCityFlightSelection";
import { Link } from "react-router-dom";
import { AirportSelector } from "./components/AirportSelector";
import { ILocationData } from "./api/locations";
import { getFlightOffersWithFilters, IFlightOfferArguments, IFlightOfferData } from "./api/flightOffers";

const bannerImages = [ 'flight.jpg', 'flight1.jpg', 'flight2.jpg', 'vacation.png', 'vacation1.png', 'vacation2.png', 'vacation3.png', 'vacation4.png' ];

interface IFlight {
    originAirportIataCode: string;
    destinationAirportIataCode: string;
    flightDate: moment.Moment;
}

interface IFlightSearch {
    flight: IFlight;
    numAdultTravelers: number;
    numChildTravelers: number;
    hasBeenSearched: boolean;
    selectedFlightOffer?: IFlightOfferData;
}

enum SearchStatus {
    SettingFilters,
    Searching,
    Finished
}

export interface ISearchProgress {
    searchStatus: SearchStatus;
    flightIndexBeingSearched : number;
    flightsTotalToSearch: number;
}

export enum SortOrder {
    Ascending,
    Descending
}

interface IHomePageState {
    flightType: FlightType;
    flightClass: FlightClass;
    numAdultTravelers: number;
    numChildTravelers: number;
    // Error/Message Toast display and configuration
    showToast: boolean;
    toastMessage: IToastMessage;
    flightOfferData: Array<IFlightOfferData>;

    // Selected Flight location from the FlightList component
    selectedFlightOffer: IFlightOfferData | null;
    finalizedFlightSelections: IFlightOfferData[];
    showingFlightList: boolean;
    flightListLoading: boolean;

    departureAirport: ILocationData | null;
    departureFlightDate: moment.Moment;
    returnAirport: ILocationData | null;
    returnFlightDate: moment.Moment;

    // A copy of any selected flights to search for in multi-city mode.
    // These flights are passed up from the MultiCityFlightSelection component.
    multiCityFlightOfferSelections: Flight[];

    bannerImages: string[];
    currentSearches: IFlightSearch[];
    searchProgress: ISearchProgress;
}

interface IHomePageProps {
    id_Token: string | null
    isLoggedIn: boolean
    onReservedFlightsFinalized: (finalFlightSelections: IFlightOfferData[], numberOfAdults: number, numberOfChildren: number, flightClass: FlightClass, flightType: FlightType) => void
}

// noinspection DuplicatedCode
export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    public constructor(props: IHomePageProps) {
        super(props)

        this.state = {
            flightType: FlightType.RoundTrip,
            flightClass: FlightClass.EconomyClass,
            numAdultTravelers: 1,
            numChildTravelers: 0,
            // Initialize toast data, invisible by default until is configured for a message to be shown.
            toastMessage: { toastType: ToastType.InfoToast, message: "" },
            showToast: false,
            flightOfferData: [],
            selectedFlightOffer: null,
            finalizedFlightSelections: [],
            showingFlightList: false,
            flightListLoading: false,

            departureAirport: null,
            departureFlightDate: moment(),
            returnAirport: null,
            returnFlightDate: moment(),

            multiCityFlightOfferSelections: [],
            bannerImages,
            currentSearches: [],
            searchProgress: {
                searchStatus: SearchStatus.SettingFilters,
                flightIndexBeingSearched: 0,
                flightsTotalToSearch: 0
            }
        }
    }

    getCurrentFlightToSelect = (flightSearchList?: IFlightSearch[]): IFlightSearch | null => {
        const searchList = !!flightSearchList ? flightSearchList : this.state.currentSearches;
        for (const flightSearch of searchList) {
            if (!flightSearch.hasBeenSearched)
                return flightSearch
        }
        return null;
    }

    setCurrentFlightSelected = () => {
        if (!this.state.selectedFlightOffer) {
            this.displayError('You must select a flight before moving to the next.');
            return;
        }

        const finalizedFlightSelections = this.state.finalizedFlightSelections;
        const updatedSearches = this.state.currentSearches;
        for(let i = 0; i < updatedSearches.length; i++) {
            const currentSearch = updatedSearches[i];
            if (!currentSearch.hasBeenSearched) {
                updatedSearches[i].hasBeenSearched = true;
                finalizedFlightSelections.push(this.state.selectedFlightOffer);
                break;
            }
        }

        const updatedSearchProgress = this.state.searchProgress;
        updatedSearchProgress.flightIndexBeingSearched += 1;
        this.setState({
            currentSearches: updatedSearches,
            finalizedFlightSelections,
            searchProgress: updatedSearchProgress,
            selectedFlightOffer: null
        }, () => {
            this.getFlightOfferAPIData();
        });
    }

    resetAllSearchDataAndFlightList = () => {
        this.setState({
            showingFlightList: false,
            currentSearches: [],
            selectedFlightOffer: null,
            finalizedFlightSelections: []
        })
    }

    resetFlightSearches = () => {
        const searchesWithClearedOffers = this.state.currentSearches.map(flightSearch => {
            flightSearch.hasBeenSearched = false;
            flightSearch.selectedFlightOffer = undefined;
            return flightSearch;
        });
        this.setState({
            currentSearches: searchesWithClearedOffers
        });
    }

    selectOfferForCurrentFlightSearch = (selectedOffer: IFlightOfferData) => {
        const updatedSearches = this.state.currentSearches.map(flightSearch => {
            // If the flight has already been searched (previous search), simply return it to the array unmodified.
            if (flightSearch.hasBeenSearched)
                return flightSearch;

            // If the flight hasn't been searched, it is the current active search.
            // Update this flight with the new offer selection.
            flightSearch.hasBeenSearched = true;
            flightSearch.selectedFlightOffer = selectedOffer;
            return flightSearch;
        });
        this.setState({
            currentSearches: updatedSearches
        });
    }

    assembleFlightSearchList = (): IFlightSearch[] => {

        const flightType = this.state.flightType;
        if (flightType === FlightType.MultiCity) {
            if (this.state.multiCityFlightOfferSelections.length <= 0) {
                // Add proper handling
                return[];
            }

            const flightsToSearch: IFlightSearch[] = [];
            this.state.multiCityFlightOfferSelections.forEach(flightToSearch => {
                const originLocation = flightToSearch.leavingFrom;
                const destinationLocation = flightToSearch.goingTo;
                if (originLocation == null || destinationLocation == null) {
                    console.error(`Error assembling flightList. Found following selected flight to search with missing destination or origin data:\n${JSON.stringify(flightToSearch)}`);
                    return;
                }
                const asFlightInterface: IFlight = {
                    originAirportIataCode: originLocation.iataCode,
                    destinationAirportIataCode: destinationLocation?.iataCode,
                    flightDate: flightToSearch.depatureDate
                };
                const asFlightSearchInterface: IFlightSearch = {
                    flight: asFlightInterface,
                    numAdultTravelers: this.state.numAdultTravelers,
                    numChildTravelers: this.state.numChildTravelers,
                    hasBeenSearched: false
                };
                flightsToSearch.push(asFlightSearchInterface);
            });
            // Set search list for all flights configured via multicity selection
            // TODO: Bubble up error to user if searching incomplete selection in multi-city instead of just ignoring it and printing to console
            this.setState({
                searchProgress: {
                    searchStatus: SearchStatus.Searching,
                    flightIndexBeingSearched: 0,
                    flightsTotalToSearch: flightsToSearch.length
                },
                currentSearches: flightsToSearch
            });
            return flightsToSearch;

        } else {
            if (!this.state.returnAirport || !this.state.departureAirport) {
                // Add proper handling
                return [];
            }

            const flightsToSearch: IFlightSearch[] = [];
            const firstFlight: IFlight = {
                originAirportIataCode: this.state.departureAirport?.iataCode,
                destinationAirportIataCode: this.state.returnAirport?.iataCode,
                flightDate: this.state.departureFlightDate
            };
            const firstFlightSearch: IFlightSearch = {
                flight: firstFlight,
                numAdultTravelers: this.state.numAdultTravelers,
                numChildTravelers: this.state.numChildTravelers,
                hasBeenSearched: false
            };

            flightsToSearch.push(firstFlightSearch);
            const isRoundTripSelected = this.state.flightType === FlightType.RoundTrip;
            if (isRoundTripSelected) {
                // Add return trip
                const returnOrigin = this.state.returnAirport;
                const returnDestination = this.state.departureAirport;

                const secondFlightSearch: IFlightSearch = {
                    flight: {
                        originAirportIataCode: returnOrigin.iataCode,
                        destinationAirportIataCode: returnDestination.iataCode,
                        flightDate: this.state.returnFlightDate
                    },
                    numAdultTravelers: this.state.numAdultTravelers,
                    numChildTravelers: this.state.numChildTravelers,
                    hasBeenSearched: false
                };
                flightsToSearch.push(secondFlightSearch);
            }

            // Set outbound (and if RoundTrip, inbound too) flight to currentSearches to go through.
            this.setState({
                searchProgress: {
                    searchStatus: SearchStatus.Searching,
                    flightIndexBeingSearched: 0,
                    flightsTotalToSearch: isRoundTripSelected ? 2 : 1
                },
                currentSearches: flightsToSearch
            });
            return flightsToSearch;
        }
    }



    getFlightOfferAPIData = async (flightToSearch?: IFlightSearch | null) => {

        try {
            const currentFlightToSearch = !!flightToSearch
                ? flightToSearch
                : this.getCurrentFlightToSelect();
            if (currentFlightToSearch === null) {
                // Handle error
                return;
            }

            const flightOfferArguments: IFlightOfferArguments = {
                departureAirportIataCode: currentFlightToSearch?.flight.originAirportIataCode,
                departureDate: currentFlightToSearch.flight.flightDate,
                arrivalAirportIataCode: currentFlightToSearch?.flight.destinationAirportIataCode,
                numberOfAdults: this.state.numAdultTravelers,
                numberOfChildren: this.state.numChildTravelers,
            };

            const flightOffers: Array<IFlightOfferData> | Error = await getFlightOffersWithFilters(flightOfferArguments);
            console.log(flightOffers);

            // So that we can handle it in catch and function can treat 
            // flight offers as Array<IFlightOfferData>.
            if (flightOffers instanceof Error) {
                throw flightOffers;
            }

            const sortedFlightOffers = this.sortFlightsByPrice(flightOffers, SortOrder.Ascending);

            this.setState({
                flightOfferData: sortedFlightOffers,
                flightListLoading: false,
                showingFlightList: true
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            this.displayError(`Error: ${JSON.stringify(errorMessage)}`);
            // Ensure if we can't get any data, we show that no results are found.
            this.setState({
                flightListLoading: false,
                showingFlightList: true,
                flightOfferData: []
            });
        }
    }

    sortFlightsByPrice = (flightOffers: IFlightOfferData[], priceSortOrder: SortOrder) => {
        return priceSortOrder === SortOrder.Ascending
            ? flightOffers.sort((a, b) => { return parseFloat(a.price.grandTotal || '0') - parseFloat(b.price.grandTotal || '0')})
            : flightOffers.sort((a, b) => { return parseFloat(b.price.grandTotal || '0') - parseFloat(a.price.grandTotal || '0')});
    }

    displayError = (message: string) => {
        this.setState({
            showToast: true,
            toastMessage: {
                message,
                toastType: ToastType.ErrorToast
            }
        });
    }

    displaySuccess = (message: string) => {
        this.setState({
            showToast: true,
            toastMessage: {
                message,
                toastType: ToastType.SuccessToast
            }
        });
    }

    onAdultPassengersChanged = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const adultPassengersInput: HTMLInputElement = changeEvent.target;
        const newValue = parseInt(adultPassengersInput.value);
        this.setState({
            numAdultTravelers: newValue
        });
    }

    onChildPassengersChanged = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const childPassengersInput: HTMLInputElement = changeEvent.target;
        const newValue = parseInt(childPassengersInput.value);
        this.setState({
            numChildTravelers: newValue
        });
    }

    render() {
        const isRoundTripSelected = this.state.flightType === FlightType.RoundTrip;
        const isMultiCitySelected = this.state.flightType === FlightType.MultiCity;
        const isOneWaySelected = this.state.flightType === FlightType.OneWay;
        const roundTripButtonClass = isRoundTripSelected ? 'selected' : '';
        const oneWayButtonClass = isOneWaySelected ? 'selected' : '';
        const multiCityButtonClass = isMultiCitySelected ? 'selected' :  '';

        return (
            <div>
                <Header isLoggedIn={this.props.isLoggedIn} />
                <section>
                    <div id="filterRow">
                        <h1>Search Flights</h1>
                        <div className="flightTypeFilters">
                            <button className={roundTripButtonClass} onClick={this.selectRoundTrip}>Round Trip</button>
                            <button className={oneWayButtonClass} onClick={this.selectOneWay}>One-Way</button>
                            <button className={multiCityButtonClass} onClick={this.selectMultiCityFlight}>Multi-City</button>
                        </div>

                        <div className="filterDropdowns">
                            <div className="travelersInput">
                                <h3>Number of Adult Travelers:</h3>
                                <input
                                    type="number"
                                    value={this.state.numAdultTravelers}
                                    step={1}
                                    max={10}
                                    min={0}
                                    onChange={this.onAdultPassengersChanged}
                                />
                            </div>

                            <div className="travelersInput">
                                <h3>Number of Child Travelers:</h3>
                                <input
                                    type="number"
                                    value={this.state.numChildTravelers}
                                    step={1}
                                    max={10}
                                    min={0}
                                    onChange={this.onChildPassengersChanged}
                                />
                            </div>

                            <select>
                                <option disabled selected>Class</option>
                                {Object.values(FlightClass).map(flightClass => (
                                    <option>{flightClass}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {isMultiCitySelected ? <MultiCityFlightSelect hide={false} onFlightSelectionsChanged={this.onMultiCityFlightOfferSelectionChange} />
                        :
                        <div id="userInputRow">
                            <div id="destinationInputs">
                                <div className="leavingAirportSelectorContainer">
                                    <AirportSelector placeholderText='Leaving From' onAirportSelectionUpdated={this.onDepartureAirportSelectionUpdated} />
                                </div>
                                <div className="arrivingAirportSelectorContainer">
                                    <AirportSelector placeholderText='Going To' onAirportSelectionUpdated={this.onArrivalAirportSelectionUpdated} />
                                </div>
                            </div>
                            <div className="dateInputContainer">
                                <h3 className='verticalSpacer'>Departing</h3>
                                {/* Placeholder is used as a fallback on browsers that don't support the datepicker, e.g. Safari and IE */}
                                <input className="datePicker" type="date" onChange={this.onDepartureFlightDateSelected} placeholder="yyyy-mm-dd"></input>
                            </div>
                            
                            {isRoundTripSelected 
                                ? <div className="dateInputContainer">
                                    <h3 className='verticalSpacer'>Returning</h3>
                                    {/* Placeholder is used as a fallback on browsers that don't support the datepicker, e.g. Safari and IE */}
                                    <input className="datePicker" onChange={this.onReturnFlightDateSelected} type="date" placeholder="yyyy-mm-dd"></input>
                                </div>
                                : null
                            }
                        </div>
                    }
                    <button className="nontoggle" id="searchButton" onClick={this.onSearchClicked}>Search</button>


                    <FlightList flightSearchStatus={this.state.searchProgress} flightSelectionType={this.state.flightType} flightOfferData={this.state.flightOfferData} onFlightSelectionUpdate={this.selectedFlightOfferUpdated} hide={!this.state.showingFlightList} isLoadingData={this.state.flightListLoading}></FlightList>
                    {this.renderNextOrSubmitButton()}
                </section>

                <div id='bannerContainer'>
                    <div id='bannerCarousel'>
                        <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                    </div>
                </div>

                <ToastMessage toastType={this.state.toastMessage.toastType} show={this.state.showToast} message={this.state.toastMessage.message} onToastClosed={this.onToastClosed}></ToastMessage>
            </div>
        )
    }

    onToastClosed = () => {
        this.setState({
            showToast: false
        });
    }

    onDepartureAirportSelectionUpdated = (selectedAirport: ILocationData | null) => {
        this.setState({
            departureAirport: selectedAirport
        });
    };

    onArrivalAirportSelectionUpdated = (selectedAirport: ILocationData | null) => {
        this.setState({
            returnAirport: selectedAirport
        });
    };

    renderNextOrSubmitButton = () => {
        // Don't render the submit/next button unless the flight list is present to submit or progress on.
        if (this.state.showingFlightList === false || this.state.flightListLoading)
            return null;

        const searchProgress = this.state.searchProgress;
        const isOnFinalPage = searchProgress.flightIndexBeingSearched >= searchProgress.flightsTotalToSearch - 1;
        const isFlightSelected = !!this.state.selectedFlightOffer;
        let classes = isFlightSelected ? 'nontoggle':'disabledButton';

        if (isOnFinalPage) {
            if (this.props.id_Token == null) {
                return <Link to={"/login"}><button id='submitButton'>Go to Login</button></Link>
            } else {
                return <Link to={"/checkout"} onClick={this.onSubmitClicked}><button className={classes} id="submitButton" disabled={!isFlightSelected}>Submit</button></Link>
            }
        } else {
            return <button className={classes} id="nextFlightButton" onClick={this.onNextFlightClicked} disabled={!isFlightSelected}>Next Flight</button>
        }
    }

    displayLoginSubmissionError = () => {
        this.displayError('Cannot submit until you have logged in.');
    }

    onSubmitClicked = () => {
        if (this.props.id_Token == null) {
            this.displayError('Cannot submit due to not being logged in.');
            return;
        }

        // Update status of search progress and add final flight to flight selections
        if (this.state.selectedFlightOffer == null) {
            return;
        }
        const finalizedFlightSelections = this.state.finalizedFlightSelections;
        finalizedFlightSelections.push(this.state.selectedFlightOffer);
        const currentSearchProgress = this.state.searchProgress;
        currentSearchProgress.searchStatus = SearchStatus.Finished;

        // Update PageRouter parent component with our final flight offer data
        this.props.onReservedFlightsFinalized(finalizedFlightSelections, this.state.numAdultTravelers, this.state.numChildTravelers, this.state.flightClass, this.state.flightType);

        this.setState({
            finalizedFlightSelections,
            searchProgress: currentSearchProgress
        });
    }

    onNextFlightClicked = () => {
        this.setCurrentFlightSelected();
    }

    onSearchClicked = async () => {
        // Must verify filters are set in order to search
        this.setState({
            flightListLoading: true
        }, () => {
            const currentFlightOfferList = this.assembleFlightSearchList();
            const currentFlightToSearch = this.getCurrentFlightToSelect(currentFlightOfferList);
            this.getFlightOfferAPIData(currentFlightToSearch);
        });
    }

    onDepartureFlightDateSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.value;
        this.setState({
            departureFlightDate : moment(newDate, 'YYYY-MM-DD')
        });
    }

    onReturnFlightDateSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.value;
        this.setState({
            returnFlightDate: moment(newDate, 'YYYY-MM-DD')
        });
    }

    selectRoundTrip = () => {
        this.resetAllSearchDataAndFlightList();
        this.setState({
            flightType: FlightType.RoundTrip
        });
    }

    selectOneWay = () => {
        this.resetAllSearchDataAndFlightList();
        this.setState({
            flightType: FlightType.OneWay
        });
    }

    selectMultiCityFlight = () => {
        this.resetAllSearchDataAndFlightList();
        this.setState({
            flightType: FlightType.MultiCity
        });
    }

    selectedFlightOfferUpdated = (flightOfferSelection: IFlightOfferData | null) => {
        this.setState({
            selectedFlightOffer: flightOfferSelection
        });
    }

    // This function is called when flight selections are changed in the MultiCityFlightSelection component.
    onMultiCityFlightOfferSelectionChange = (flightOfferSelections: Flight[]) => {
        this.setState({
            multiCityFlightOfferSelections: flightOfferSelections
        });
    }
}
