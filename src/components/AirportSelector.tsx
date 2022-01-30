import * as React from "react";

import '../styles/AirportSelector.css';
import { getLocationsForQuery, ILocationData } from "../api/locations";

interface IAirportSelectorState {
    locationResults: ILocationData[];
}

interface IAirportSelectorProps {
}

export class AirportSelector extends React.Component<IAirportSelectorProps, IAirportSelectorState> {

    public constructor(props: IAirportSelectorProps) {
        super(props)

        this.state = {
            locationResults: [],
        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }

    updateResultsFromAPI = async () => {
        console.log('Getting search results from AirportSelector component');
        const query = this.state.airportQuery;
        const flightJSON: Array<ILocationData> | Error = await getLocationsForQuery(query);
        if (flightJSON instanceof Error) {
            this.setState({
                locationResults: []
            });
            console.error(`Failed to get location data from API via AirportSelector component: '${flightJSON.message}`);
            return;
        }

        
        this.setState({
            hasFirstQueryBeenMade: true,
            locationResults: airportsOnlyLocations
        });
    };
}
