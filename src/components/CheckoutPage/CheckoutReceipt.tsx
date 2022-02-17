import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IFlightOfferData } from '../../api/flightOffers';
import { updateUser } from '../../api/users';
import '../../styles/CheckoutPage.css';

export default function CheckoutReceipt({firstName, lastName, email, dob, idToken, flightOffers} : {firstName: string, lastName: string, email: string, dob: moment.Moment, idToken: string | null, flightOffers: IFlightOfferData[]}) {

    const [total, setTotal] = useState(0);

    const completeBooking = () => {
        console.log("booking");

        if (idToken !== null) {
            updateUser(firstName, lastName, email, dob, idToken);
        }
    }

    const getTotal = (offers: IFlightOfferData[]) => {
        
        var sm = 0
        offers.forEach((offer) =>{
            const gt = parseFloat(offer.price.grandTotal);

            sm = sm + gt
        });
        setTotal(sm);
        return sm;
    }

    useEffect(() => {
        getTotal(flightOffers);
    }, flightOffers)


    return (
        <>
            <div id="bookingReceipt">
                <div id="receiptTitle">
                    <h2>Booking Information</h2>
                    <p>{flightOffers.length} Reservations</p>
                </div>

                <div id="receiptFlights">
                    {flightOffers.map((offer) => {
                        offer.itineraries.map((itinerary) => {
                            itinerary.segments.map((segment) => {
                                <p>({segment.departure.iataCode}) to ({segment.arrival.iataCode})</p>
                            })
                        })
                    })}
                </div>

                <div id="receiptTotal">
                    <h3>Your estimated total:</h3>
                    <p>${total}</p>
                </div>

                <p>
                    <button id="btnCompleteBooking" onClick={() => completeBooking()}>Complete Booking</button>
                </p>
            </div>
        </>
    );
}