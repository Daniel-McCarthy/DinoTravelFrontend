import * as React from "react";

import '../styles/AirportSelector.css';
import { getLocationsForQuery, ILocationData } from "../api/locations";

interface IAirportSelectorState {
}

interface IAirportSelectorProps {
}

export class AirportSelector extends React.Component<IAirportSelectorProps, IAirportSelectorState> {

    public constructor(props: IAirportSelectorProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }

}
