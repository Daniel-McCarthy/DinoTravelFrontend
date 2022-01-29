import moment = require("moment");
import { v4 as uuid } from "uuid";
import * as React from "react";

import '../styles/MultiCityFlightSelection.css';

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
    leavingFrom: string;
    goingTo: string;
    depatureDate: moment.Moment;
};

export class MultiCityFlightSelect extends React.Component<IMultiCityFlightSelectProps, IMultiCityFlightSelectState> {
    constructor(props: IMultiCityFlightSelectProps) {
        super(props)

        const blankFlight: Flight = {
            id: uuid(),
            leavingFrom: '',
            goingTo: '',
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
                                    <input className="leavingInput" placeholder="Leaving From" accessKey={index.toString()} onChange={this.updateDepartureAirport} />
                                    <input placeholder="Going To" />
                                </div>
                                <div className="flightDate">
                                    <h3>{isFirst ? "Departing" : " "}</h3>
                                    {/* Placeholder is used as a fallback on browsers that don't support the datepicker, e.g. Safari and IE */}
                                    <input className="datePicker" type="date" placeholder="yyyy-mm-dd"></input>
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
            leavingFrom: '',
            goingTo: '',
            depatureDate: moment()
        })
        this.setState({
            flights
        });
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
        this.setState({
            flights
        });
    }

    updateDepartureAirport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const airportDepartureInput: HTMLInputElement = event.currentTarget as HTMLInputElement;
        const flightRowNumber = parseInt(airportDepartureInput.accessKey);
        const newAirportSelection = airportDepartureInput.value;
        const flights = this.state.flights;
        
        // Update flight that matches input index to new departure airport selection
        flights[flightRowNumber].leavingFrom = newAirportSelection;
    }
}
