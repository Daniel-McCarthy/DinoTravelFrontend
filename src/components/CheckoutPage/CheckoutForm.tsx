import React from 'react';
import moment = require("moment");

export default function CheckoutForm({updateFirstName, updateLastName, updateCountry, updatePhoneNo, updateGender, updateBirthday}: {
    updateFirstName: (newFirstName: string) => void, 
    updateLastName: (newLastName: string) => void,
    updateCountry: (newCountry: string) => void,
    updatePhoneNo: (newPhoneNo: string) => void,
    updateGender: (newGender: string) => void,
    updateBirthday: (newBirthday: moment.Moment) => void,
    }) {

    // Gender, Country, and Phone no. don't need to be added to the users DB

    return (
        <>
            <div id="checkoutForm">
                <div id="checkoutHeader">
                    <h1>Secure Booking - only takes a few minutes!</h1>
                    <h2>Traveler Info</h2>
                    <p>Your name must match government-issued photo ID exactly.<br></br>
                        All fields must be filled out.</p>
                </div>

                <div id="userInfoCheckout">
                    <p>
                        <label htmlFor="txtFirstName">First Name*</label><br></br>
                        <input type="text" onChange={(event) => updateFirstName(event.target.value)} required></input>
                    </p>

                    <p>
                        <label htmlFor="txtLastName">Last Name*</label><br></br>
                        <input type="text" onChange={(event) => updateLastName(event.target.value)} required></input>
                    </p>

                    <p>
                        <label htmlFor="txtCountry">Country*</label><br></br>
                        <input type="text" onChange={(event) => updateCountry(event.target.value)} required></input>
                    </p>

                    <p>
                        <label htmlFor="txtPhoneNo">Phone Number*</label><br></br>
                        <input type="text" onChange={(event) => updatePhoneNo(event.target.value)} required></input>
                    </p>

                    <p>
                        <label>Gender*</label><br></br>

                        <input type="radio" name="radGender" id="male" value="male" onChange={(event) => updateGender(event.target.value)} required></input>
                        <label htmlFor="male">Male</label>
                        
                        <input type="radio" name="radGender" id="female" value="female" onChange={(event) => updateGender(event.target.value)} required></input>
                        <label htmlFor="female">Female</label>
                    </p>

                    <p>
                        <label htmlFor="txtBirthDate">Date of birth*</label><br></br>
                        <input className="datePicker" type="date" placeholder="yyyy-mm-dd" required
                            onChange={(event) => updateBirthday(moment(event.currentTarget.value, "YYYY-MM-DD"))}></input>
                    </p>
                </div>

                <hr></hr>

                <div id="manageCheckout">
                    <div id="manageCheckoutHeader">
                        <h2>Manage your booking</h2>
                        <span style={{"fontWeight": "bold"}}>Confirmation email</span>
                        <p>You will recieve a booking confirmation through the email associated with your account. </p>
                    </div>
                </div>

                <hr></hr>

                <div id="reviewCheckout">
                    <h2>Review and book your trip</h2>
                    <p>Review your trip details to make sure the dates and times are correct</p>
                    <p>Check your spelling. Your name must match government-issued photo ID exactly.</p>
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
