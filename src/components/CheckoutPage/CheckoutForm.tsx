import React from 'react';

export default function CheckoutForm() {
    return (
        <>
            <div id="checkoutForm">
                <div id="checkoutHeader">
                    <h1>Secure Booking - only takes a few minutes!</h1>
                    <h2>Traveler Info</h2>
                    <p>Traveler names must match government-issued photo ID exactly.<br></br>
                        All fields must be filled out.</p>
                </div>

                <div id="userInfoCheckout">
                    <p>
                        <label htmlFor="txtFirstName">First Name*</label><br></br>
                        <input type="text"></input>
                    </p>

                    <p>
                        <label htmlFor="txtLastName">Last Name*</label><br></br>
                        <input type="text"></input>
                    </p>

                    <p>
                        <label htmlFor="txtCountry">Country*</label><br></br>
                        <input type="text"></input>
                    </p>

                    <p>
                        <label htmlFor="txtPhoneNo">Phone Number*</label><br></br>
                        <input type="text"></input>
                    </p>

                    <p>
                        <label>Gender*</label><br></br>

                        <input type="radio" name="radGender" id="male" value="male"></input>
                        <label htmlFor="male">Male</label>
                        
                        <input type="radio" name="radGender" id="female" value="female"></input>
                        <label htmlFor="female">Female</label>
                    </p>

                    <p>
                        <label htmlFor="txtBirthDate">Date of birth*</label><br></br>
                        <input className="datePicker" type="date" placeholder="yyyy-mm-dd"></input>
                    </p>

                    <p>
                        {/* NOT IMPLEMENTED */}
                        <label htmlFor="btnChooseSeats">Seat Selection</label><br></br>
                        <button id="btnChooseSeats">Choose Seats</button>
                    </p>
                </div>

                <hr></hr>

                <div id="manageCheckout">
                    <div id="manageCheckoutHeader">
                        <h2>Manage your booking</h2>
                        <span style={{"fontWeight": "bold"}}>Confirmation email</span>
                        <p>Please enter the email address where you would like to receive your confirmation.</p>
                    </div>

                    <div id="inputEmail">
                        <p>
                            <label htmlFor="txtEmail">Email address*</label><br></br>
                            <input type="txtEmail"></input>
                        </p>
                    </div>
                </div>

                <hr></hr>

                <div id="reviewCheckout">
                    <h2>Review and book your trip</h2>
                    <p>Review your trip details to make sure the dates and times are correct</p>
                    <p>Check your spelling. Flight passenger names must match government-issued photo ID exactly.</p>
                    <p>Review the terms of your booking on the flight website.</p>
                    <p>By clicking the complete booking button, I acknowledge 
                        that I have reviewed the Privacy Statement and Government 
                        Travel Adice and have reviewed and accept the above Rules 
                        & Restrictions and Terms of Use.</p>
                </div>
            </div>
        </>
    );
}
