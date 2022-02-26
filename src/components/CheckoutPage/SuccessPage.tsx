import React from 'react'
import { Link } from "react-router-dom";
import checkmark from "../../assets/Checkmark_green.png";

import '../../styles/Success.css';

import { ImageCarousel } from "../ImageCarousel";
import Header from '../Header';
const bannerImages = [ 'flight.jpg', 'flight1.jpg', 'flight2.jpg', 'vacation.png', 'vacation1.png', 'vacation2.png', 'vacation3.png', 'vacation4.png' ];

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
