import React, { useEffect, useState } from 'react';
import { ITableData } from '../../TripsPage';
import PropTypes from 'prop-types';

import '../../styles/FlightsTable.css'
import { deleteReservation, getReservationById, IReservationDataNew, updateReservation } from '../../api/reservations';


export type TableData = Array<ITableData>;

export default function FlightsTable({tableData, cancel, update} : {tableData: TableData, cancel: boolean, update: boolean}) {
    const tableHeaders = [
        {title: ""},
        {title: "Airline"},
        {title: "Traveler Name"},
        {title: "Departure"},
        {title: "Arrival"},
        {title: "Departure Date"},
        {title: "Class"},
        {title: "Traveler Type"},
        {title: "Price"},
        {title: "PNR"}, // Equivalent to reservation number
    ]

    const [data, setData] = useState(tableData);

    useEffect(() => {
        setData(tableData);
    });

    // Would normally send a /delete request instead
    const handleDelete = (resId: number) => {
        if (window.confirm("Are you sure you want you cancel your flight?")) {

            deleteReservation(resId);
        }
    }

    const handleUpdate = async (resId: number) => {
        const oldReservation = await getReservationById(resId);


        // Change to a name the user entered
        const newName = "Test";
        
        if (oldReservation instanceof Error) {
            return;
        }

        if (newName !== null) {
            const newReservation: IReservationDataNew = {
                user_id : oldReservation.user_id,
                trip_type: oldReservation.trip_type,
                flight_id: oldReservation.flight_id,
                traveler_type: oldReservation.traveler_type,
                traveler_name: newName,
                seat_id: oldReservation.seat_id,
                seat_type: oldReservation.seat_type,
                price: oldReservation.price
            }

            await updateReservation(newReservation, resId);
        }
    }

    return (
        <>
            <table>
                <tr>
                    {tableHeaders.map((item) => (
                        <th key={item.title}>
                            {item.title}
                        </th>
                    ))}
                </tr>
                {data.map((_) => (
                    <tr>
                        <td>
                            {_.index}
                        </td>

                        <td>
                            {_.airline}
                        </td>

                        <td>
                            {update ?
                                <input id="txtNameChange" type="text" placeholder={_.travelerName} onChange={
                                    () => handleUpdate(_.pnr)}></input>
                                : _.travelerName
                            }
                        </td>

                        <td>
                            {_.departure}
                        </td>

                        <td>
                            {_.arrival}
                        </td>

                        <td>
                            {_.departureDate}
                        </td>

                        <td>
                            {_.class}
                        </td>

                        <td>
                            {_.travelerType}
                        </td>

                        <td>
                            ${_.price}
                        </td>

                        <td>
                            {_.pnr}
                        </td>
                        
                        <td>
                            {cancel && <a href="javascript: void(0)" onClick={
                                () => handleDelete(_.pnr)}>❌</a>}
                        </td>
                    </tr>
                ))}
            </table>
        </>
    );
}

FlightsTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.shape({
        airline: PropTypes.string.isRequired
    }))
}