import moment from 'moment';
import React from 'react';
import { updateUser } from '../../api/users';
import '../../styles/CheckoutPage.css';

export default function CheckoutReceipt({firstName, lastName, email, dob, idToken} : {firstName: string, lastName: string, email: string, dob: moment.Moment, idToken: string | null}) {
    const testFlights = ["Chicago (ORD) to New York (LGA)","Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)"];

    const completeBooking = () => {
        console.log("booking");

        if (idToken !== null) {
            updateUser(firstName, lastName, email, dob, idToken);
        }
    }

    return (
        <>
            <div id="bookingReceipt">
                <div id="receiptTitle">
                    <h2>Booking Information</h2>
                    <p>Number of flights</p>
                </div>

                <div id="receiptFlights">
                    {testFlights.map((_) => (
                        <p>
                            {_}
                        </p>
                    ))}

                </div>

                <div id="receiptTotal">
                    <h3>Your estimated total:</h3>
                    <p>$TOTAL</p>
                </div>

                <p>
                    <button id="btnCompleteBooking" onClick={() => completeBooking()}>Complete Booking</button>
                </p>
            </div>
        </>
    );
}