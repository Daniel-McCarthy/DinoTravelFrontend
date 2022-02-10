import React, { useEffect, useState } from 'react'
import { ITableData } from '../../TripsPage';
import '../../styles/UpdateForm.css'
import { getReservationById, updateReservation, IReservationDataNew } from '../../api/reservations';

export default function UpdateForm({updateItem} : {updateItem : ITableData}) {

    // Add bags from reservation
    const [bags, setBags] = useState(3);
    const [name, setName] = useState(updateItem.travelerName);
    const [newPrice, setNewPrice] = useState(updateItem.price);

    useEffect(() => {
        setBags(1);
        setName(updateItem.travelerName);
        setNewPrice(updateItem.price);
    }, [updateItem])

    const bagChangeAdd = () => {
        if (bags < 2) {
            setBags(bags + 1);
            setNewPrice(newPrice + 35);
        }
    }

    const bagChangeSub = () => {
        if (bags > 0) {
            setBags(bags - 1);
            setNewPrice(newPrice - 35);
        }
    }

    const handleReservationUpdate = async () => {
        const existingItem = await getReservationById(updateItem.pnr);

        if (existingItem instanceof Error) {
            return;
        }

        const newItem: IReservationDataNew = {
            user_id: existingItem.user_id, // will change to user_subject
            trip_type: existingItem.trip_type,
            flight_id: existingItem.flight_id,
            traveler_type: existingItem.traveler_type,
            traveler_name: name,
            seat_id: existingItem.seat_id,
            seat_type: existingItem.seat_type,
            price: newPrice
        }

        updateReservation(newItem, updateItem.pnr);
        console.log(name, bags, newPrice);

        await new Promise(r => setTimeout(r, 2000));
        window.location.reload()
    }

    return (
        <>
            <div id="updateFormContent">
                <div className="updateFormTitle">
                    Update Flight: {updateItem.pnr}
                </div>

                <div className="flightDetails">
                    {updateItem.departure} ✈️ {updateItem.arrival}
                </div>

                <div id="updateForm">
                    <p>
                        <label htmlFor="txtNameChange">Change Traveler's Name</label><br></br>
                        <input type="text" id="txtNameChange" placeholder={updateItem.travelerName} style={{width: "300px", height: "40px"}}
                        onChange={(event) => setName(event.target.value)}></input>
                    </p>

                    <p>
                        <label>Change Number of Checked Bags</label><br></br>
                        <button onClick={bagChangeSub} style={{width: "30px", height: "30px", marginRight: "20px"}}>-</button>
                        <span style={{fontSize: "larger"}}>{bags}</span>
                        <button onClick={bagChangeAdd} style={{width: "30px", height: "30px", marginLeft: "20px"}}>+</button>
                    </p>

                    <p id="newPrice">
                        Price: ${newPrice}
                    </p>

                    <p>
                        <button id="btnSubmitChanges" style={{width: "300px"}} onClick={() => {handleReservationUpdate()}}>Confirm Changes</button>
                    </p>
                </div>
            </div>
        </>      
    );
}
