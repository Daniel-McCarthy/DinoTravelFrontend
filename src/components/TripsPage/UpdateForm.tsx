import React from 'react'
import { ITableData } from '../../TripsPage';
import '../../styles/UpdateForm.css'

export default function UpdateForm({updateItem} : {updateItem : ITableData}) {

    console.log(updateItem);



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
                        <label htmlFor="txtNameChange">Change Traveler's Name</label>
                        <input type="text" id="txtNameChange" placeholder={updateItem.travelerName}></input>
                    </p>

                    <p>
                        <label htmlFor="numBags">Change Number of Checked Bags</label>
                        <input type="number" placeholder="0" step={1} max={10} min={0}></input>
                    </p>

                    <p>
                        Price: ${updateItem.price}
                    </p>

                    <p>
                        <input type="button" value="Confirm Changes" onClick={() => {window.location.reload()}}></input>
                    </p>
                </div>
            </div>
        </>      
    );
}
