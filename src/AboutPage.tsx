import * as React from "react";
import { ImageCarousel } from "./components/ImageCarousel";

const bannerImages = [ 'flight.jpg', 'flight1.jpg', 'flight2.jpg', 'vacation.png', 'vacation1.png', 'vacation2.png', 'vacation3.png', 'vacation4.png' ];


import './styles/AboutPage.css';
import Header from "./components/Header";

interface IAboutPageState {
    bannerImages: string[];
}

interface IAboutPageProps {
    isLoggedIn: boolean
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
                <Header isLoggedIn={this.props.isLoggedIn} />
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

                            <p style={{"fontSize": "12px", "marginTop": "100px"}}>
                                Created by the Purple Dinos for DePaul's Winter Quarter Senior Capstone Project (CSC394/IS376).<br></br>
                                <div style={{"display": "inline-block"}}>
                                    <ul>
                                        <li>
                                            Dan McCarthy
                                        </li>
                                        <li>
                                            David Gawel
                                        </li>
                                        <li>
                                            Jackson Meyer
                                        </li>
                                        <li>
                                            Jawan L. Davis
                                        </li>
                                        <li>
                                            Jenna Dahl-Crimmins
                                        </li>
                                    </ul>
                                </div>
                                
                                <div style={{"display": "inline-block"}}>
                                    <ul>
                                        <li>
                                            Mario DiBartolomeo
                                        </li>
                                        <li>
                                            Muhammad Fahad
                                        </li>
                                        <li>
                                            Nick Clark
                                        </li>
                                        <li>
                                            Philip Reeves
                                        </li>
                                        <li>
                                            Suhaib Mikbel
                                        </li>
                                    </ul>
                                </div>
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