import React from 'react';
import '../../styles/Policies.css';

export default function Policies() {
    return (
        <>
            <div id="policies">
                <div className="salesPolicy">
                    <h2>Sales Policy</h2>
                    <p>Sales are final in most cases. Refunds will be given out through
                        Dino Travel credit. Please see the Refund Policy for more information.
                    </p>
                </div>

                <div className="cancellationPolicy">
                    <h2>Cancellation Policy</h2>
                    <p>Reservations may be cancelled by the user who initially created the reservation. 
                        Please contact us if the user is unable to access their reservations.
                    </p>
                </div>

                <div className="refundPolicy">
                    <h2>Refund Policy</h2>
                    <p>Refunds will be payed out through Dino Travel credit. 
                        For any refund on an eligible reservation, please wait 
                        up to 48 hours for the refund to process. Reservations are eligible for a refund if:
                        <ul>
                            <li>there are more than 24 hours before the flight departs</li>
                            <li>the flight has been cancelled by the airline and they have not offered a replacement flight</li>
                        </ul>
                    </p>
                </div>
            </div>  
        </>
    );
}
