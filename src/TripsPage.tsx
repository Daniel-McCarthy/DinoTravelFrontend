import * as React from "react";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./components/ImageCarousel";

import * as bannerImage1 from '../assets/banner_images/flight.jpg';
import * as bannerImage2 from '../assets/banner_images/flight1.jpg';
import * as bannerImage3 from '../assets/banner_images/flight2.jpg';
import * as bannerImage4 from '../assets/banner_images/vacation.png';
import * as bannerImage5 from '../assets/banner_images/vacation1.png';
import * as bannerImage6 from '../assets/banner_images/vacation2.png';
import * as bannerImage7 from '../assets/banner_images/vacation3.png';
import * as bannerImage8 from '../assets/banner_images/vacation4.png';
import FlightsTable from "./components/TripsPage/FlightsTable";

import './styles/TripsPage.css'

const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];


interface ITripsPageState {
    bannerImages: string[];
}

interface ITripsPageProps {
}

export class TripsPage extends React.Component<ITripsPageProps, ITripsPageState> {
    
    public constructor(props: ITripsPageProps) {
        super(props)

        this.state = {
            bannerImages
        }
    }


    render() {
        return (
            <>
                <header>
                    <div id="headerContent">
                        <div className="banner">
                            <Link to='/'>
                                <img className="logo" alt="Dino Travel Logo" />
                            </Link>
                            <div className="slogan">
                                <h3>Travel More</h3>
                            </div>
                        </div>

                        <nav>
                            <Link to='/support' >
                                <button className="nontoggle">support</button>
                            </Link>
                            <button className="nontoggle">about us</button>
                            <Link to='/trips' >
                                <button className="nontoggle">trips</button>    
                            </Link>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
                <main>
                    <div id="content">
                        <div id="tripsPageTitle">
                            <h1>Manage your Trips</h1>
                        </div>

                        <div id="manageButtons">
                            <a href="/">Add flight</a>
                            <a href="javascript: void(0)">Cancel flight</a>
                            <a href="javascript: void(0)">Update flight</a>
                        </div>

                        <div id="flightsTable">
                            <FlightsTable />
                        </div>
                    </div>
                    
                    <div id='bannerCarousel'>
                        <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                    </div>
                </main>
            </>
        )
    }
}