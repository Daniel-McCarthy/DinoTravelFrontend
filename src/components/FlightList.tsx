import moment = require("moment");
import * as React from "react";
import { getFlightStopsFromItinerary, getInitialAirlineFromItinerary, getTotalFlightTimeFromItinerary, IDuration, IFlightOfferData, parseFlightTimeFormat } from "../api/flightOffers";
import { FlightType } from "../enums/FlightType";
import { ISearchProgress } from "../HomePage";
import { randomInt } from "../lib/utility";

import '../styles/FlightList.css';

interface IFlightListState {
    flightOfferData: Array<IFlightOfferData>
    isHidden: boolean;
    selectedFlight: string;
}

interface IFlightListProps {
    destinationIataCode?: string,
    flightOfferData: Array<IFlightOfferData>
    hide: boolean;

    // Controlling how multi-flight selection is displayed
    flightSelectionType: FlightType;
    flightSearchStatus: ISearchProgress;

    onFlightSelectionUpdate(selectedFlight: IFlightOfferData | null): void;
}

export class FlightList extends React.Component<IFlightListProps, IFlightListState> {

    public constructor(props: IFlightListProps) {
        super(props)

        this.state = {
            flightOfferData: props.flightOfferData,
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

        if (prevProps.flightOfferData !== this.props.flightOfferData) {
            this.setState({
                flightOfferData: this.props.flightOfferData
            });
        }
    }

    renderNoFlightDataMessage = () => {
            return <div>
                <h1 className="noDataList">No matching flight data available to be displayed.</h1>
            </div>
    }

    getFlightListHeaderMessage = () => {
        if (this.props.flightSelectionType === FlightType.MultiCity) {
            return `Choosing flight ${this.props.flightSearchStatus.flightIndexBeingSearched} of ${this.props.flightSearchStatus.flightsTotalToSearch}`;
        } else if (this.props.flightSelectionType === FlightType.RoundTrip) {
            const isSearchingFirstFlight = this.props.flightSearchStatus.flightIndexBeingSearched === 0;
            return isSearchingFirstFlight
                ? 'Choosing Departing Flight >'
                : 'Departing Flight > Choosing Return Flight';
        } else {
            return "Choosing your Flight >"
        }
    }

    renderFlightList = () => {
        return <div className="flightList">
                <div>
                    <text className="flightListHeader">{this.getFlightListHeaderMessage()}</text>
                    {this.assembleFlightListTable()}
                </div>
            </div>
    }

    assembleFlightListTable = () => {
        return (
            <div>
                {this.state.flightOfferData.map((flightOffer: IFlightOfferData, index) => {
                    // Limit number of flgiths being rendered
                    if (index > 15) {
                        return null;
                    }

                    const originalTakeOffTime = parseFlightTimeFormat(flightOffer.itineraries[0].segments[0].departure.at);
                    const finalLandingTime = parseFlightTimeFormat(this.getFinalLandingTimeFromFlightOffer(flightOffer));

                    const takeOffLandingTime = this.formatFlightTakeOffAndLandingTime(originalTakeOffTime.toString(), finalLandingTime.toString());
                    const flightLengthLabel = this.formatFlightDuration(getTotalFlightTimeFromItinerary(flightOffer.itineraries[0]));
                    const isSelected = flightOffer.id === this.state.selectedFlight;
                    const selectionClass = isSelected ? 'selectedFlight' : '';

                    const airline = getInitialAirlineFromItinerary(flightOffer.itineraries[0]);
                    const takeOffLocationIata = flightOffer.itineraries[0].segments[0].departure.iataCode;
                    const landingLocationIata = flightOffer.itineraries[0].segments[0].arrival.iataCode;

                    return <div className={`flightRow ${selectionClass}`} onClick={this.selectFlight} id={flightOffer.id}>
                        <table>
                            <tr>
                                <td>{takeOffLandingTime}</td>
                                <td>{flightLengthLabel}</td>
                            </tr>
                            <tr>
                                <td>({takeOffLocationIata}) - ({landingLocationIata})</td>
                                {this.renderFlightStops(flightOffer)}
                            </tr>
                            <tr>
                                <td>{airline}</td>
                            </tr>
                        </table>
                        <div className="ticketPrice">
                            <text>{`$${flightOffer.price.grandTotal}`}</text>
                        </div>
                    </div>
                })}
            </div>
        )
    }

    renderFlightStops = (flightOffer: IFlightOfferData) => {
        const stopsForFlight = getFlightStopsFromItinerary(flightOffer.itineraries[0]);
        const stopsAvailable = stopsForFlight != null && stopsForFlight.length > 0;

        return (
            stopsAvailable
                ? stopsForFlight.map(stop => {
                    return <td className="stopsMessage">{stop.duration.totalHours} hour {stop.duration.totalMinutes} min stop at {stop.location} airport.</td>
                })
                : <td className="stopsMessage">Direct flight</td>
        );
    }

    getTotalFirstFlightTime = (flightOffer: IFlightOfferData): IDuration => {
        const itineraries = flightOffer.itineraries[0];
        const segments = itineraries.segments;
        let totalHours = 0;
        let totalMinutes = 0;
  
        segments.forEach(segment => {
            const durationString = segment.duration;
            const hoursMatch = durationString.match(/\d+(?=H)/);
            const minutesMatch = durationString.match(/\d+(?=M)/);

            totalHours += !!hoursMatch ? parseInt(hoursMatch[0]) : 0;
            totalMinutes += !!minutesMatch ? parseInt(minutesMatch[0]) : 0;
        });

        // If minutes is an hour or multiple, increase hours and set minutes back down to less than an hour
        if (totalMinutes >= 60) {
            const hoursFromMinutes = Math.floor(totalMinutes/60);
            totalHours += hoursFromMinutes;
            totalMinutes -= 60 * hoursFromMinutes;
        }
        return {
            totalHours,
            totalMinutes
        };
    }

    getFinalLandingTimeFromFlightOffer = (flightOffer: IFlightOfferData) => {
        const finalItinerary = flightOffer.itineraries[flightOffer.itineraries.length-1];
        const finalSegment = finalItinerary.segments[finalItinerary.segments.length-1];
        return finalSegment.arrival.at;
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

    formatFlightDuration = (flightDuration: IDuration) => {
        return `${flightDuration.totalHours} hrs ${flightDuration.totalMinutes} min`;
    }

    formatFlightTakeOffAndLandingTime = (depature_time: string, arrival_time: string): string => {
        const departureDate = new Date(Date.parse(depature_time));
        const arrivalDate = new Date(Date.parse(arrival_time));


        return `${this.formatTime(departureDate)} - ${this.formatTime(arrivalDate)}`;
    }

    formatTime = (date: Date): string => {
        let hour = date.getHours() + 1; // +1 since 1AM would appear as 0AM otherwise
        let min = date.getMinutes().toString();

        if (hour > 12)
            hour -= 12; // Format to 12/12 AM/PM structure

        // Pad minutes to 2 digits
        if (min.length < 2)
            min += '0';

        const amPMLabel = (hour < 12) || (hour == 24) ? 'AM' : 'PM';
        return `${hour}:${min} ${amPMLabel}`;
    }

    calculateRandomDummyPrice = () => {
        return randomInt(100, 600);
    }

    getFlightByID = (id: number): IFlightOfferData | null => {
        const matchingFlights = this.state.flightOfferData.filter((flightOffer: IFlightOfferData) => { return flightOffer.id === id.toString() });
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
        const isDataEmpty = this.state.flightOfferData.length === 0;
        return (
            this.state.isHidden
                ? null
                : <div className="flightList">
                    {isDataEmpty ? this.renderNoFlightDataMessage() : this.renderFlightList()}
                  </div>   
        )
    }
}
