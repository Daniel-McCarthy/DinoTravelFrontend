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
    selectedFlight: IFlightData | null;
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
            flightsData: [],
            selectedFlight: null
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

                    <button className="nontoggle" id="submitButton" onClick={this.submitReservation}>Submit</button>
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
}
