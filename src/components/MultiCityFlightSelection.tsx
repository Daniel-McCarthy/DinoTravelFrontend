import moment = require("moment");
import { v4 as uuid } from "uuid";
import * as React from "react";

import '../styles/MultiCityFlightSelection.css';
import { AirportSelector } from "./AirportSelector";
import { ILocationData } from "../api/locations";

interface IMultiCityFlightSelectProps {
    hide: boolean;
    onFlightSelectionsChanged: (flightSelections: Flight[]) => void;
};

interface IMultiCityFlightSelectState {
    isHidden: boolean;
    flights: Flight[];
};

export interface Flight {
    id: string
    leavingFrom: ILocationData | null;
    goingTo: ILocationData | null;
    depatureDate: moment.Moment;
};

export class MultiCityFlightSelect extends React.Component<IMultiCityFlightSelectProps, IMultiCityFlightSelectState> {
    constructor(props: IMultiCityFlightSelectProps) {
        super(props)

        const blankFlight: Flight = {
            id: uuid(),
            leavingFrom: null,
            goingTo: null,
            depatureDate: moment()
        };
        this.state = {
            isHidden: this.props.hide,
            flights: [blankFlight]
        }
    }

    render() {
        return (
            <div className='multiCityFlightSelectionContainer'>
                {this.renderFlightSelectors()}
            </div>
        )
    }

    renderFlightSelectors = () => {
        if (this.state.isHidden)
            return null;

        return  <div>
                    {this.state.flights.map((flight, index) => {
                        const isFirst = index === 0;
                        const isLast = index === this.state.flights.length - 1;
                        // const departingAirport = flight.leavingFrom;
                        // const arrivingAirport = flight.goingTo;
                        console.log(flight);
                        return <div key={flight.id}>
                                <div className="flightDestination">
                                    <h3 className='flightLabel'>Flight {index}</h3>
                                    <AirportSelector placeholderText='Leaving From' rowNumber={index} onAirportSelectionUpdated={this.updateDepartureAirport} />
                                    <AirportSelector placeholderText='Leaving From' rowNumber={index} onAirportSelectionUpdated={this.updateArrivalAirport} />
                                </div>
                                <div className="flightDate">
                                    <h3>{isFirst ? "Departing" : " "}</h3>
                                    {/* Placeholder is used as a fallback on browsers that don't support the datepicker, e.g. Safari and IE */}
                                    <input className="datePicker" type="date" placeholder="yyyy-mm-dd" onChange={this.onFlightDateChanged} accessKey={index.toString()} />
                                </div>
                                <div className="addRemoveButtons">
                                    <div className="addRemoveSpacer">

                                    </div>
                                    { isLast ? <label className="buttonLabel" onClick={this.addFlight}>+ Add another flight</label> : null }
                                    { isFirst ? null : <label className="buttonLabel" accessKey={index.toString()} onClick={this.onRemoveFlightClicked}>Remove</label> }
                                </div>
                            </div>

                    })}
                </div>;
    }

    addFlight = () => {
        const flights = this.state.flights;
        flights.push({
            id: uuid(),
            leavingFrom: null,
            goingTo: null,
            depatureDate: moment()
        })
        this.updateFlightsState(flights);
    }

    onFlightDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateInput: HTMLInputElement = event.target;
        const rowNumber = parseInt(dateInput.accessKey);
        const newDate = dateInput.value;
        const flights = this.state.flights;
        flights[rowNumber].depatureDate = moment(newDate, 'YYYY-MM-DD');
        // Update flights data with modified array data
        // Flight associated with row has been updated with new flight date.
        
        // Update component state with changed flights, and update parent with the modification that was made.
        this.updateFlightsState(flights);
    }

    onRemoveFlightClicked = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const flightToRemoveID: HTMLLabelElement = event.target as HTMLLabelElement;
        const flightRowNumber = parseInt(flightToRemoveID.accessKey);

        if (flightRowNumber === 0 || flightRowNumber >= this.state.flights.length) {
            console.info(`Failed to remove flight index of ${flightRowNumber} from MultiCityFlightSelection component.`);
            return;
        }
        const flights = this.state.flights.filter((_flight, index) => {
            return index !== flightRowNumber;
        });

        // Update component state with changed flights, and update parent with the modification that was made.
        this.updateFlightsState(flights);
    }

    updateDepartureAirport = (selectedLocation: ILocationData, rowNumber: number) => {
        const flights = this.state.flights;
        
        // Update flight that matches input index to new departure airport selection
        flights[rowNumber].leavingFrom = selectedLocation;
        this.updateFlightsState(flights);

        // Update component state with changed flights, and update parent with the modification that was made.
    }

    updateArrivalAirport = (selectedLocation: ILocationData, rowNumber: number) => {
        const flights = this.state.flights;

        // Update flight that matches input index to new arrival airport selection
        flights[rowNumber].goingTo = selectedLocation;
        this.updateFlightsState(flights);
    }

    updateFlightsState = (newFlights: Flight[]) => {
        this.setState({
            flights: newFlights
        });
        this.props.onFlightSelectionsChanged(newFlights);
    }
}
