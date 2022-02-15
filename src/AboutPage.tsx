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
                    <div id="aboutUsParagraphs">
                        <p>
                            ABOUT
                        </p>
                    </div>
                </main>

                <div id='bannerCarousel'>
                    <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                </div>
            </>
        )
    }
}