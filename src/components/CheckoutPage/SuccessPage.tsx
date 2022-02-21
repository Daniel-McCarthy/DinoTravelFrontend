import React from 'react'
import { Link } from "react-router-dom";
import checkmark from "../../assets/Checkmark_green.png";

import '../../styles/Success.css';

import * as bannerImage1 from '../../../assets/banner_images/flight.jpg';
import * as bannerImage2 from '../../../assets/banner_images/flight1.jpg';
import * as bannerImage3 from '../../../assets/banner_images/flight2.jpg';
import * as bannerImage4 from '../../../assets/banner_images/vacation.png';
import * as bannerImage5 from '../../../assets/banner_images/vacation1.png';
import * as bannerImage6 from '../../../assets/banner_images/vacation2.png';
import * as bannerImage7 from '../../../assets/banner_images/vacation3.png';
import * as bannerImage8 from '../../../assets/banner_images/vacation4.png';
import { ImageCarousel } from "../ImageCarousel";
import Header from '../Header';
const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];

export default function SuccessPage({isLoggedIn}:{isLoggedIn: boolean}) {
    return (
        <>
            <div>
                <Header isLoggedIn={isLoggedIn} />
                <div id="successContent">
                    <div id="successHeader">
                        <h1>Success!</h1>
                        <h2>Your flight has been booked.</h2>
                        <img src={checkmark}></img>
                    </div>

                    <div id="successRedirects">
                        <Link to="/trips">
                            <button className="nontoggle">Update your trip</button>
                        </Link>

                        <Link to="/">
                            <button className="nontoggle">Book another flight?</button>
                        </Link>
                        <p>
                            <Link to="/support">
                                <a href='javascript: void(0)'>Leave some feedback!</a>
                            </Link>
                        </p>
                    </div>

                </div>

                <div id='bannerContainer'>
                    <div id='bannerCarousel'>
                        <ImageCarousel height={300} imagesToUse={bannerImages} />
                    </div>
                </div>
            </div>
        </>
    )
}
