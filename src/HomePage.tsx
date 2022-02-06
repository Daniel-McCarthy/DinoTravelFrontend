import * as React from "react";
import { FlightClass, flightClassAsJsonLabel } from "./enums/FlightClass";
import { FlightType, flightTypeAsJsonLabel } from "./enums/FlightType";
import { ToastType } from "./enums/ToastType";
import { ToastMessage } from "./components/ToastMessage";
import { getFlightData, IFlightData } from "./api/flights";

import './styles/HomePage.css';
import './styles/theme.css';
import { FlightList } from "./components/FlightList";
import { IReservationData, registerReservation } from "./api/reservations";
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
import { Link } from "react-router-dom";
import { AirportSelector } from "./components/AirportSelector";
import { ILocationData } from "./api/locations";
const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];



interface IHomePageState {
    flightType: FlightType;
    flightClass: FlightClass;
    numAdultTravelers: number;
    numChildTravelers: number;
    // Error/Message Toast display and configuration
    showToast: boolean;
    toastMessage: IToastMessage;
    flightsData: Array<IFlightData>;

    // Selected Flight location from the FlightList component
    selectedFlight: IFlightData | null;
    showingFlightList: boolean;

    departureAirport: ILocationData | null;
    departureFlightDate: moment.Moment;
    returnAirport: ILocationData | null;
    returnFlightDate: moment.Moment;

    // A copy of any selected flights to search for in multi-city mode.
    // These flights are passed up from the MultiCityFlightSelection component.
    multiCityFlightSelections: Flight[];

    bannerImages: string[];
}

interface IHomePageProps {

}

interface IToastMessage {
    message: string;
    toastType: ToastType,
}

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
            flightsData: [],
            selectedFlight: null,
            showingFlightList: false,

            departureAirport: null,
            departureFlightDate: moment(),
            returnAirport: null,
            returnFlightDate: moment(),

            multiCityFlightSelections: [],

            bannerImages
        }
    }

    getFlightAPIData = async () => {
        try {
            const flights = await getFlightData();
            console.log(flights);

            this.setState({
                flightsData: flights,
                showingFlightList: true
            })
            return flights;
        } catch (error) {
            this.displayError(`Error: ${JSON.stringify(error)}`);
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
                            <button className="nontoggle">support</button>
                            <button className="nontoggle">about us</button>
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

                    {isMultiCitySelected ? <MultiCityFlightSelect hide={false} onFlightSelectionsChanged={this.onMultiCityFlightSelectionChange} />
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
                                <input className="datePicker" type="date" onChange={this.onArrivalFlightDateSelected} placeholder="yyyy-mm-dd"></input>
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

                    <FlightList flightData={this.state.flightsData} onFlightSelectionUpdate={this.selectedFlightUpdated} hide={!this.state.showingFlightList}></FlightList>

                    <button className="nontoggle" id="searchButton" onClick={this.onSearchClicked}>Search</button>
                </section>

                <div id='bannerCarousel'>
                    <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                </div>

                <ToastMessage toastType={this.state.toastMessage.toastType} show={this.state.showToast} message={this.state.toastMessage.message}></ToastMessage>
            </div>
        )
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

    renderSubmitButton = () => {
        return <button className="nontoggle" id="submitButton" onClick={this.submitReservation}>Submit</button>
    }

    onSearchClicked = () => {
        // Must verify filters are set in order to search
        this.getFlightAPIData();
    }

    onArrivalFlightDateSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.value;
        this.setState({
            returnFlightDate: moment(newDate, 'YYYY-MM-DD')
        });
    }

    onReturnFlightDateSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.currentTarget.value;
        this.setState({
            returnFlightDate: moment(newDate, 'YYYY-MM-DD')
        });
    }

    selectRoundTrip = () => {
        this.setState({
            flightType: FlightType.RoundTrip
        });
    }

    selectOneWay = () => {
        this.setState({
            flightType: FlightType.OneWay
        });
    }

    selectMultiCityFlight = () => {
        this.setState({
            flightType: FlightType.MultiCity
        });
    }

    submitReservation = async () => {
        // Reject submission and warn user if submitting without a flight selection.
        if (this.state.selectedFlight == null) {
            this.displayError(`A flight to book must be selected before submission.`)
            return;
        }

        const reservation: IReservationData = {
            user_id: 1, // Set as a constant until login/sessions is supported.
            trip_type: flightTypeAsJsonLabel(this.state.flightType),
            outgoing_flight_type: flightClassAsJsonLabel(this.state.flightClass),
            outgoing_flight_id: this.state.selectedFlight.flight_id,
            returning_flight_type: undefined, // Empty until return flight selection is supported.
            returning_flight_id: undefined,
            price: this.state.selectedFlight.flight_cost
        };
        const response: Response | Error = await registerReservation(reservation);
        if (response instanceof Error) {
            this.displayError('Failed to send reservation submission to Dino Travel.');
            return;
        }

        if (response.status !== 200) {
            this.displayError('Failed to register reservation.');
            console.error(`Reservation registration failed with error status '${response.status} and error: '${response.statusText}'.'`);
        } else {
            this.displaySuccess(`Success! Your flight has now been booked. We'll now show you the flight details.`);
        }
    }

    selectedFlightUpdated = (flightSelection: IFlightData | null) => {
        this.setState({
            selectedFlight: flightSelection
        });
    }

    // This function is called when flight selections are changed in the MultiCityFlightSelection component.
    onMultiCityFlightSelectionChange = (flightSelections: Flight[]) => {
        this.setState({
            multiCityFlightSelections: flightSelections
        });
    }
}
