import React, { useState } from 'react'

import '../../styles/FlightDetails.css';

// There are a lot of fields
// Definitely adjust as needed
export interface IFlightDetailsReview {
    departureCity: string,
    departureAirportCode: string,
    departureAirportName: string,
    departureTime: string,
    departureDate: string,
    arrivalCity: string,
    arrivalAirportCode: string,
    arrivalAirportName: string,
    arrivalTime: string,
    airplaneModel: string,
    flightClass: string,
    airline: string,
    numCheckedBags: number
}

export default function FlightDetails({flightDetails} : {flightDetails: IFlightDetailsReview}) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div id="flightDetailsReview">
            <div id="cityTitle">
                <h1>{flightDetails.departureCity} to {flightDetails.arrivalCity}</h1>
            </div>

            <div id="detailsHeader">
                <h2>{flightDetails.airline} - {flightDetails.departureDate}</h2><br></br>
                <a href="javascript: void(0)" onClick={() => setShowDetails(!showDetails)}>Show Details</a>
            </div>

            {showDetails &&
            <div id="expandedFlightDetails">
                <div id="departureHeader">
                    Departure: {flightDetails.departureTime} {flightDetails.departureCity}
                </div>
                
                <div id="departureDetails">
                    {flightDetails.departureAirportName} ({flightDetails.arrivalAirportCode})
                    <p>
                        {flightDetails.airplaneModel}<br></br>
                        {flightDetails.flightClass}
                    </p>
                </div>

                <div id="arrivalHeader">
                    <span id="arrivalTitle">Arrival: {flightDetails.arrivalTime} {flightDetails.arrivalCity}</span><br></br>
                    {flightDetails.arrivalAirportName} ({flightDetails.arrivalAirportCode})
                </div>

                <hr></hr>

                <div id="flightInfoContainer">
                    <div id="userFlightInfo">
                        <h2>Your Fare: {flightDetails.flightClass}</h2>

                        {/* NOT IMPLEMENTED */}
                        <p><a href="javascript: void(0)">Change Fare</a></p>
                        
                        {/* Did not make this an interactive button because I think users are selected their bags before this point? */}
                        <p>Checked bags: {flightDetails.numCheckedBags}</p>
                    </div>
                    <div id="bagDisclaimer">
                        <h2>Bags</h2>
                        <p>Personal Item Included</p>
                        <p>Carry-on bag not available</p>
                        <p>Each checked bag: $35</p>
                    </div>
                </div>

                <hr></hr>
                {/* NOT IMPLEMENTED */}
                <a href="javascript: void(0)">Change Flight</a>

            </div>}
        </div>
    );
}
