import React, { useEffect, useState } from 'react'
import { ITableData } from '../../TripsPage';
import '../../styles/UpdateForm.css'

export default function UpdateForm({updateItem} : {updateItem : ITableData}) {

    // Add bags from reservation
    const [bags, setBags] = useState(3);
    const [name, setName] = useState(updateItem.travelerName);
    const [newPrice, setNewPrice] = useState(updateItem.price);


    useEffect(() => {
        setBags(3);
        setName(updateItem.travelerName);
        setNewPrice(updateItem.price);
    }, [updateItem])

    const bagChangeAdd = () => {
        if (bags < 5) {
            setBags(bags + 1);
            setNewPrice(newPrice + 50);
        }
    }

    const bagChangeSub = () => {
        if (bags > 0) {
            setBags(bags - 1);
            setNewPrice(newPrice - 50);
        }
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
                        <button id="btnSubmitChanges" style={{width: "300px"}} onClick={() => {window.location.reload()}}>Confirm Changes</button>
                    </p>
                </div>
            </div>
        </>      
    );
}
