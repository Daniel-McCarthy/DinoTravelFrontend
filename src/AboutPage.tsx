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

const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];


import './styles/AboutPage.css';

interface IAboutPageState {
    bannerImages: string[];
}

interface IAboutPageProps {
}

export class AboutPage extends React.Component<IAboutPageProps, IAboutPageState> {
    
    public constructor(props: IAboutPageProps) {
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
                            <Link to='/about'>
                                <button className="nontoggle">about us</button>
                            </Link>
                            <button className="nontoggle">trips</button>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
                <main>
                    <div id="aboutUsContainer">
                        <div id="aboutUsTitle">
                            <h1>About Us</h1>
                        </div>

                        <div id="aboutUsSection">
                            <p>
                                DinoTravel is an easy to use itinerary service that is 
                                designed to help customers find flights within specific 
                                price ranges across all airline companies. We want to make 
                                travel planning simpler and more accessible to the everday person.
                            </p>

                            <p>
                                With new services and applications coming out every day, 
                                it can be hard to keep track of it all. Our application is 
                                designed to make your traveling experience organized and simple. 
                                Whether you travel for business or leisure, you can count on 
                                DinoTravel to make it hassle-free.
                            </p>
                        </div>
                    </div>
                </main>

                <div id='bannerCarousel'>
                    <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                </div>
            </>
        )
    }
}