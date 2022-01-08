import * as React from "react";
import { FlightClass } from "./enums/FlightClass";
import { FlightType } from "./enums/FlightType";
import { ToastMessage } from "./components/ToastMessage";

import './styles/HomePage.css';
import './styles/theme.css';
import { ToastType } from "./enums/ToastType";

interface IHomePageState {
    flightType: FlightType;
    flightClass: FlightClass;
    numAdultTravelers: number;
    numChildTravelers: number;
    isMultiCity: boolean;
    // Error/Message Toast display and configuration
    showToast: boolean;
    toastMessage: IToastMessage;
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
            showToast: false
        }
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
                            <input className="datePicker" type="date"></input>
                        </div>
                        
                        <div className="dateInputContainer">
                            <h3>Returning</h3>
                            <input className="datePicker" type="date"></input>
                        </div>
                    </div>

                    <button className="nontoggle" id="submitButton">Submit</button>
                </section>

                <ToastMessage toastType={this.state.toastMessage.toastType} show={this.state.showToast} message={this.state.toastMessage.message}></ToastMessage>
            </div>
        )
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
}
