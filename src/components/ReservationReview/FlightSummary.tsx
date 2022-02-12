import React from 'react'
import '../../styles/FlightSummary.css';

export default function FlightSummary({total} : {total: number}) {

    const tax = parseFloat((total * .1).toFixed(2));

    return (
        <div id="flightSummary">
            <div id="summaryTitle">
                <h1>Flight Summary</h1>
            </div>


            {/*Compared to the original design, I made this a total instead of listing all flights.
            I thought doing it this way would be easier to work with*/}
            <div id="priceDetails">
                <table id="priceDetailsTable">
                    <th></th><th></th>
                    <tr>
                        <td>
                            Total
                        </td>
                        
                        <td>
                            ${total}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Taxes & Fees
                        </td>

                        <td>
                            ${tax}
                        </td>
                    </tr>
                </table>

                <hr></hr>

                <table id="totalTable">
                    <tr>
                        <td>
                            Trip Total
                        </td>

                        <td>
                            ${tax + total}
                        </td>
                    </tr>
                </table>

                <p id="checkoutDisclaimer">
                    Prices displayed are not final prices. DinoTravel provides booking services only
                    and our data provides you with the best estimates. Payments to be made on data of departure
                    at counter.
                </p>
            </div>

            <div id="checkoutButton">
                {/* NOT IMPLEMENTED */}
                <button>Checkout</button>
            </div>
        </div>
    );
}
