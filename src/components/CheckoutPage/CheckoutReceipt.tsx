import React from 'react';
import '../../styles/CheckoutPage.css';

export default function CheckoutReceipt() {
    const testFlights = ["Chicago (ORD) to New York (LGA)","Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)", "Chicago (ORD) to New York (LGA)"];

    const completeBooking = () => {
        console.log("booking");
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