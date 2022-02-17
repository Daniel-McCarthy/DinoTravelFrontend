import * as React from "react";
import { FlightClass, flightClassAsJsonLabel } from "./enums/FlightClass";
import { FlightType, flightTypeAsJsonLabel } from "./enums/FlightType";
import { ToastType } from "./enums/ToastType";
import { ToastMessage } from "./components/ToastMessage";

import './styles/HomePage.css';
import './styles/theme.css';
import { FlightList } from "./components/FlightList";
import { IFlightRequestInfo, IReservationData, registerReservations, TravelerType } from "./api/reservations";
import { ImageCarousel } from "./components/ImageCarousel";

// Import banner images needed to load in Image Carousel
import * as bannerImage1 from '../assets/banner_images/flight.jpg';
import * as bannerImage2 from '../assets/banner_images/flight1.jpg';
import * as bannerImage3 from '../assets/banner_images/flight2.jpg';
import * as bannerImage4 from '../assets/banner_images/vacation.png';
import * as bannerImage5 from '../assets/banner_images/vacation1.png';
import * as bannerImage6 from '../assets/banner_images/vacation2.png';
import * as bannerImage7 from '../assets/banner_images/vacation3.png';
import * as bannerImage8 from '../assets/banner_images/vacation4.png';
import moment = require("moment");
import { Flight, MultiCityFlightSelect } from "./components/MultiCityFlightSelection";
import { Link, useNavigate } from "react-router-dom";
import { AirportSelector } from "./components/AirportSelector";
import { ILocationData } from "./api/locations";
import { getFlightOffersWithFilters, IFlightOfferArguments, IFlightOfferData } from "./api/flightOffers";
import { getAirlineNameFromIataCode } from "./lib/AirlineMapping";
const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];

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
    onReservedFlightsFinalized: (finalFlightSelections: IFlightOfferData[], numberOfAdults: number, numberOfChildren: number) => void
}

interface IToastMessage {
    message: string;
    toastType: ToastType,
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

            // if (this.state.flightType === FlightType.RoundTrip)
            //     flightOfferArguments.returnDate = this.state.returnFlightDate;
            const flightOffers: Array<IFlightOfferData> | Error = await getFlightOffersWithFilters(flightOfferArguments);
            console.log(flightOffers);

            // So that we can handle it in catch and function can treat 
            // flight offers as Array<IFlightOfferData>.
            if (flightOffers instanceof Error) {
                throw flightOffers;
            }

            this.setState({
                flightOfferData: flightOffers,
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
                <header>
                    <div id="headerContent">
                        <div className="banner">
                            <Link to='/'>
                                <img className="logo" alt="Dino Travel Logo" />
                            </Link>
                            <div className="slogan">
                                <h3>Travel More</h3>
                            </div>
                        </div>

                        <nav>
                            <Link to='/support' >
                                <button className="nontoggle">support</button>
                            </Link>
                            <Link to='/about'>
                                <button className="nontoggle">about us</button>
                            </Link>
                            <button className="nontoggle">trips</button>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
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
            return <Link to={"/checkout"}><button className={classes} id="submitButton" onClick={this.onSubmitClicked} disabled={!isFlightSelected}>Submit</button></Link>
        } else {
            return <button className={classes} id="nextFlightButton" onClick={this.onNextFlightClicked} disabled={!isFlightSelected}>Next Flight</button>
        }
    }

    onSubmitClicked = async () => {
        // Update status of search progress and add final flight to flight selections
        if (this.state.selectedFlightOffer == null) {
            return;
        }
        const finalizedFlightSelections = this.state.finalizedFlightSelections;
        finalizedFlightSelections.push(this.state.selectedFlightOffer);
        const currentSearchProgress = this.state.searchProgress;
        currentSearchProgress.searchStatus = SearchStatus.Finished;

        // Update PageRouter parent component with our final flight offer data
        this.props.onReservedFlightsFinalized(finalizedFlightSelections, this.state.numAdultTravelers, this.state.numChildTravelers);

        this.setState({
            finalizedFlightSelections,
            searchProgress: currentSearchProgress
        }, async () => {
            // Submit reservations once finalized selections are set
            const didSucceed = await this.submitReservations();

            if (didSucceed) {
                // Navigate to checkout page
                const navigate = useNavigate();
                navigate('/checkout');
            }
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

    submitReservations = async (): Promise<boolean> => {
        const userId = this.props.id_Token;
        if (userId == null) {
            this.displayError('Failed to reserve flights due to not being logged in.');
            return false;
        }

        // Reject submission and warn user if submitting without a flight selection.
        if (this.state.selectedFlightOffer == null) {
            this.displayError(`A flight to book must be selected before submission.`)
            return false;
        }

        // Will need to submit a copy of every flight once for each passenger
        const numAdults = this.state.numAdultTravelers;
        const numChildren = this.state.numChildTravelers;
        const flightsToReserve = this.state.finalizedFlightSelections;
        const finalReservations: IReservationData[] = [];

        flightsToReserve.forEach(async flight => {
            // Submit reservations for each traveler
            let adultsLeft = numAdults;
            let childrenLeft = numChildren;

            while (adultsLeft > 0 || childrenLeft > 0) {
                // Figure out what kind of traveler we are reserving for and ensure they are counted as reserved.
                const travelerType = adultsLeft > 0 ? TravelerType.Adult : TravelerType.Child;
                if (travelerType === TravelerType.Adult) {
                    adultsLeft -= 1;
                } else {
                    childrenLeft -= 1;
                }

                const itinerary = flight.itineraries[0];
                const flightRequestInfo: IFlightRequestInfo[] = itinerary.segments.map(segment => {
                    return {
                        arrival_airport: segment.arrival.iataCode,
                        departure_airport: segment.departure.iataCode,
                        departure_time: segment.departure.at,
                        arrival_time: segment.arrival.at,
                        flight_provider: getAirlineNameFromIataCode(segment.carrierCode),
                        flight_code: ''
                    }
                });

                const reservation: IReservationData = {
                    price: parseFloat(!!flight.price.grandTotal ? flight.price.grandTotal : '0'),
                    trip_type: flightTypeAsJsonLabel(this.state.flightType),
                    traveler_type: travelerType,
                    traveler_name: 'FlightPassenger',
                    seat_id: '',
                    seat_class: flightClassAsJsonLabel(this.state.flightClass),
                    num_checked_bags: 0,
                    flight_request_info: flightRequestInfo
                };

                finalReservations.push(reservation);
            }
        });

        const response: Response | Error = await registerReservations(finalReservations, userId);

        if (response instanceof Error) {
            this.displayError('Failed to send reservation submission to Dino Travel.');
            return false;
        }

        if (response.status !== 200) {
            this.displayError('Failed to register reservation.');
            console.error(`Reservation registration failed with error status '${response.status} and error: '${response.statusText}'.'`);
            return false;
        } else {
            this.displaySuccess(`Success! Your flight has now been booked. We'll now show you the flight details.`);
            return true;
        }
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
