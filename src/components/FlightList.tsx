import moment = require("moment");
import * as React from "react";
import { IFlightData } from "../api/flights";
import { randomInt } from "../lib/utility";

import '../styles/FlightList.css';

interface IFlightListState {
    flightData: Array<IFlightData>
    isHidden: boolean;
    selectedFlight: string;
}

interface IFlightListProps {
    flightData: Array<IFlightData>
    hide: boolean;

    onFlightSelectionUpdate(selectedFlight: IFlightData): void;
}

export class FlightList extends React.Component<IFlightListProps, IFlightListState> {

    public constructor(props: IFlightListProps) {
        super(props)

        this.state = {
            flightData: props.flightData,
            isHidden: props.hide,
            selectedFlight: ''
        }
    }

    componentDidUpdate(prevProps: IFlightListProps) {
        // Update show/hide state when props updates from parent component.
        if (prevProps.hide !== this.props.hide) {
            this.setState({
                isHidden: this.props.hide
            });
        }

        if (prevProps.flightData !== this.props.flightData) {
            // Add dummy costs until real costs are included in database.
            for (const flight of this.props.flightData) {
                flight.flight_cost = this.calculateRandomDummyPrice();
            }

            this.setState({
                flightData: this.props.flightData
            });
        }
    }

    renderNoFlightDataMessage = () => {
            return <div>
                <h1 className="noDataList">No matching flight data available to be displayed.</h1>
            </div>
    }

    renderFlightList = () => {
        return <div className="flightList">
                <div>
                    <text className="flightListHeader">{`Choose departing flight > Choose Return Flight > Review your Trip`}</text>
                    {this.assembleFlightListTable()}
                </div>
            </div>
    }

    assembleFlightListTable = () => {
        return (
            <div>
                {this.state.flightData.map((flight: IFlightData) => {
                    const takeOffLandingTime = this.formatFlightTakeOffAndLandingTime(flight.departure_time, flight.arrival_time);
                    const flightLengthLabel = this.formatFlightLengthTime(flight.departure_time, flight.arrival_time);
                    const isSelected = flight.flight_id.toString() === this.state.selectedFlight;
                    const selectionClass = isSelected ? 'selectedFlight' : '';
                    return <div className={`flightRow ${selectionClass}`} onClick={this.selectFlight} id={flight.flight_id.toString()}>
                        <table>
                            <tr>
                                <td>{takeOffLandingTime}</td>
                                <td>{flightLengthLabel}</td>
                            </tr>
                            <tr>
                                <td>({flight.arrival_airport}) - ({flight.departure_airport})</td>
                                <td>Direct flight.</td>
                            </tr>
                            <tr>
                                <td>{flight.flight_provider}</td>
                            </tr>
                        </table>
                        <div className="ticketPrice">
                            <text>{`$${flight.flight_cost}`}</text>
                        </div>
                    </div>
                })}
            </div>
        )
    }

     parseDateFormat = (date: string): moment.Moment => {
        return moment(date, 'YYYY-MM-DD HH-mm-ss');
     }

    // Good candidate for a unit test
    formatFlightLengthTime = (departure_time: string, arrival_time: string): string => {
        const departureMoment = this.parseDateFormat(departure_time);
        const arrivalMoment = this.parseDateFormat(arrival_time);

        const timeDifferenceInMinutes = Math.abs(departureMoment.diff(arrivalMoment, 'minutes'));
        const hourDifference = Math.floor(timeDifferenceInMinutes / 60);
        const minuteDifference = timeDifferenceInMinutes % 60;
        return `${hourDifference} hrs ${minuteDifference} min`;
    }

    formatFlightTakeOffAndLandingTime = (depature_time: string, arrival_time: string): string => {
        const departureDate = new Date(Date.parse(depature_time));
        const arrivalDate = new Date(Date.parse(arrival_time));


        return `${this.formatTime(departureDate)} - ${this.formatTime(arrivalDate)}`;
    }

    formatTime = (date: Date): string => {
        const hour = date.getHours();
        let min = date.getMinutes().toString();

        // Pad minutes to 2 digits
        if (min.length < 2)
            min += '0';

        const amPMLabel = (hour < 12) || (hour == 24) ? 'AM' : 'PM';
        return `${hour}:${min} ${amPMLabel}`;
    }

    calculateRandomDummyPrice = () => {
        return randomInt(100, 600);
    }

    getFlightByID = (id: number): IFlightData | null => {
        const matchingFlights = this.state.flightData.filter((flight: IFlightData) => { return flight.flight_id === id });
        return (matchingFlights.length > 0) ? matchingFlights[0] : null;
    }

    selectFlight = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedFlightID = event.currentTarget.id;
        this.props.onFlightSelectionUpdate(this.getFlightByID(parseInt(selectedFlightID, 16)))
        this.setState({
            selectedFlight: selectedFlightID
        });
    }

    render() {
        const isDataEmpty = this.state.flightData.length === 0;
        return (
            <div className="flightList">
                {isDataEmpty ? this.renderNoFlightDataMessage() : this.renderFlightList()}
            </div>   
        )
    }
}
