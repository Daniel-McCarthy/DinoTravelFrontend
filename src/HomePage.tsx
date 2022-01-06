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
                        <div className="logo">Dino Travel Logo</div>
                        <div className="slogan">
                            <h2 className="slogan">Travel More (slogan)</h2>
                        </div>
                    </div>

                    <nav>
                        <button>support</button>
                        <button>about us</button>
                        <button>trips</button>
                    </nav>
                </header>
                <section>
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
                </section>
            </div>
        )
    }
}
