import * as React from "react";

import './styles/HomePage.css';
import './styles/theme.css';

interface IHomePageState {
}

interface IHomePageProps {

}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    public constructor(props: IHomePageProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <header>
                    <div className="banner">
                        <img className="logo" alt="Dino Travel Logo" src="../assets/dino_travel_logo.png"/>
                        <div className="slogan">
                            <h3>Travel More</h3>
                        </div>
                    </div>

                    <nav>
                        <button>support</button>
                        <button>about us</button>
                        <button>trips</button>
                    </nav>
                </header>
                <section>
                    <div id="filterRow">
                        <h1>Search Flights</h1>
                        <div className="flightTypeFilters">
                            <button>Round Trip</button>
                            <button>One-Way</button>
                            <button>Multi-City</button>
                        </div>

                        <div className="filterDropdowns">
                            <select>
                                <option>Travelers</option>
                            </select>

                            <select>
                                <option>
                                    Class
                                </option>
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

                    <button id="submitButton">Submit</button>


                </section>
            </div>
        )
    }
}
