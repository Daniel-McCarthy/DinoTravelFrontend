import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getTotalFlightTimeFromItinerary, IFlightOfferData } from '../../api/flightOffers';
import { updateUser } from '../../api/users';
import { ICheckoutFormInfo } from '../../CheckoutPage';
import '../../styles/CheckoutPage.css';

export default function CheckoutReceipt({checkoutFormInfo, flightOffers, idToken, onBookingComplete, displayError}: 
        {checkoutFormInfo: ICheckoutFormInfo, idToken: string | null, 
            flightOffers: IFlightOfferData[], onBookingComplete: () => void, displayError: (message :string) => void}) {

    const [total, setTotal] = useState(0);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const validateUser = (): boolean => {
        for (const info of Object.values(checkoutFormInfo)) {
            if (!info) {
                console.log("No user info")
                displayError("Please fill out all fields.");
                return false;
            }
        }
        return true;
    }

    const validateFlights = (): boolean => {
        if (flightOffers.length === 0) {
            console.log("No flights")
            displayError("Please add a flight first.")
            return false;
        }
        return true;
    }

    const completeBooking = async () => {
        console.log("booking");

        if (idToken !== null && validateFlights() && validateUser()) {
            // TODO send error message if booking could not go through

            updateUser(checkoutFormInfo.firstName, checkoutFormInfo.lastName, checkoutFormInfo.email, checkoutFormInfo.birthday, idToken);

            onBookingComplete();

            await new Promise(r => setTimeout(r, 1000));
            setSuccess(true);
        }
    }


    const getTotal = (offers: IFlightOfferData[]) => {
        
        var sm = 0
        offers.forEach((offer) =>{
            if (offer.price.grandTotal) {
                const gt = parseFloat(offer.price.grandTotal);
                sm = sm + gt
            }
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
                    <h3>{flightOffers.length} {(flightOffers.length === 1)? "Reservation": "Reservations"}</h3>
                </div>

                <div id="receiptFlights">
                    {flightOffers.map((offer) => {
                        return offer.itineraries.map((itenary) => {
                            return  ( 
                                <>
                                    <p>
                                        ${offer.price.grandTotal && parseFloat(offer.price.grandTotal).toFixed(2)}
                                    </p>
                                    {itenary.segments.map((segment) => {
                                        return (
                                            <>
                                                <p>({segment.departure.iataCode}) to ({segment.arrival.iataCode})</p>
                                                <p>{(segment.departure.at).substring(11)} - {(segment.arrival.at).substring(11)}
                                                    {/* How to save time in a single variable?*/}
                                                    ({getTotalFlightTimeFromItinerary(itenary).totalHours}h {getTotalFlightTimeFromItinerary(itenary).totalMinutes}m)
                                                </p>
                                                <p>
                                                    {segment.carrierCode}
                                                </p>
                                                <br></br>
                                            </>
                                        )
                                    })}
                                </>
                            )
                        })
                    })}
                </div>

                <div id="receiptTotal">
                    <h3>Your estimated total:</h3>
                    <p>${total.toFixed(2)}</p>
                </div>

                <p>
                    <button id="btnCompleteBooking" onClick={() => completeBooking()}>Complete Booking</button>
                    {success && navigate("/success")}
                </p>
            </div>
        </>
    );
}