import * as React from "react";
import { FlightClass, flightClassAsJsonLabel } from "./enums/FlightClass";
import { FlightType, flightTypeAsJsonLabel } from "./enums/FlightType";
import { ToastType } from "./enums/ToastType";
import { ToastMessage } from "./components/ToastMessage";
import { getFlightData, IFlightData } from "./api/flights";

import './styles/HomePage.css';
import './styles/theme.css';
import { FlightList } from "./components/FlightList";
import { getAllReservations, IReservationData, registerReservation, Reservations } from "./api/reservations";

interface IHomePageState {
    flightType: FlightType;
    flightClass: FlightClass;
    numAdultTravelers: number;
    numChildTravelers: number;
    isMultiCity: boolean;
    // Error/Message Toast display and configuration
    showToast: boolean;
    toastMessage: IToastMessage;
    flightsData: Array<IFlightData>;
    selectedFlight: IFlightData;
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
            numAdultTravelers: 0,
            numChildTravelers: 0,
            isMultiCity: true,
            // Initialize toast data, invisible by default until is configured for a message to be shown.
            toastMessage: { toastType: ToastType.InfoToast, message: "" },
            showToast: false,
            flightsData: []
        }
    }

    getFlightAPIData = async () => {
        try {
            const flights = await getFlightData();
            console.log(flights);

            this.setState({
                flightsData: flights
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

    render() {
        const isRoundTripSelected = this.state.flightType === FlightType.RoundTrip;
        const roundTripButtonClass = isRoundTripSelected ? 'selected' : '';
        const oneWayButtonClass = !isRoundTripSelected ? 'selected' : '';
        const multiCityButtonClass = this.state.isMultiCity ? 'selected' : '';
        return (
            <div>
                <header>
                    <div className="banner">
                        <img className="logo" alt="Dino Travel Logo" />
                        <div className="slogan">
                            <h3>Travel More</h3>
                        </div>
                    </div>

                    <nav>
                        <button className="nontoggle">support</button>
                        <button className="nontoggle">about us</button>
                        <button className="nontoggle">trips</button>
                    </nav>
                </header>
                <section>
                    <div id="filterRow">
                        <h1>Search Flights</h1>
                        <div className="flightTypeFilters">
                            <button className={roundTripButtonClass} onClick={this.selectRoundTrip}>Round Trip</button>
                            <button className={oneWayButtonClass} onClick={this.selectOneWay}>One-Way</button>
                            <button className={multiCityButtonClass} onClick={this.toggleMultiCityFlight}>Multi-City</button>
                        </div>

                        <div className="filterDropdowns">
                            <div className="travelersInput">
                                <h3>Number of Adult Travelers:</h3>
                                <input
                                    type="number"
                                    placeholder="0"
                                    step={1}
                                    max={10}
                                    min={0}
                                />
                            </div>

                            <div className="travelersInput">
                                <h3>Number of Child Travelers:</h3>
                                <input
                                    type="number"
                                    placeholder="0"
                                    step={1}
                                    max={10}
                                    min={0}
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
                    <div id="userInputRow">
                        <div id="destinationInputs">
                            <input className="leavingInput" placeholder="Leaving From" />
                            <input placeholder="Going To" />
                        </div>
                        <div className="dateInputContainer">
                            <h3>Departing</h3>
                            <input className="datePicker" type="date" onChange={this.onArrivalFlightDateSelected}></input>
                        </div>
                        
                        <div className="dateInputContainer">
                            <h3>Returning</h3>
                            <input className="datePicker" type="date"></input>
                        </div>
                    </div>

                    <FlightList flightData={this.state.flightsData} onFlightSelectionUpdate={this.selectedFlightUpdated} hide={false}></FlightList>

                    <button className="nontoggle" id="submitButton" onClick={this.toggle}>Submit</button>
                </section>

                <ToastMessage toastType={this.state.toastMessage.toastType} show={this.state.showToast} message={this.state.toastMessage.message}></ToastMessage>
            </div>
        )
    }

    onArrivalFlightDateSelected = () => {
        this.getFlightAPIData();
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

    toggleMultiCityFlight = () => {
        this.setState({
            isMultiCity: !this.state.isMultiCity
        });
    }


    selectedFlightUpdated = (flightSelection: IFlightData) => {
        this.setState({
            selectedFlight: flightSelection
        });
    }

    toggle = () => {
        this.setState({
            showToast: true,
            toastMessage: { toastType: ToastType.SuccessToast, message: "Success! Your flight has now been booked. We'll now show you the flight details." }
        })
    }
}
