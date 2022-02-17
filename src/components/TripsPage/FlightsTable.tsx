import React, { useEffect, useState } from 'react';
import { ITableData } from '../../TripsPage';
import UpdateForm from './UpdateForm';
import PropTypes from 'prop-types';

import '../../styles/FlightsTable.css'
import { deleteReservation} from '../../api/reservations';


export type TableData = Array<ITableData>;

export default function FlightsTable({tableData, cancel, update, idToken} : {tableData: TableData, cancel: boolean, update: boolean, idToken: string | null}) {
    const tableHeaders = [
        {title: ""},
        {title: "Airline"},
        {title: "Traveler Name"},
        {title: "Departure"},
        {title: "Arrival"},
        {title: "Departure Date"},
        {title: "Class"},
        {title: "Traveler Type"},
        {title: "Checked Bags"},
        {title: "Price"},
        {title: "PNR"}
    ]

    const emptyItem: ITableData = {
        index: -1,
        airline: "",
        travelerName: "",
        departure: "",
        arrival: "",
        departureDate: "",
        class: "",
        travelerType: "",
        numCheckedBags: 0,
        price: -1,
        pnr: -1
    }

    const [data, setData] = useState(tableData);
    const [newItem, setNewItem] = useState(emptyItem);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    const handleDelete = async (resId: number) => {
        if (window.confirm("Are you sure you want you cancel your flight?")) {

            if (idToken !== null) {
                deleteReservation(resId, idToken);

            await new Promise(r => setTimeout(r, 1500));
            window.location.reload()
            }
        }
    }

    const handleUpdate = (idx: number, airline: string, name: string, departure: string, arrival: string, departureDate: string, classType: string, travelerType: string ,numBags: number, price: number, pnr: number) => {
        setNewItem({
            index: idx,
            airline: airline,
            travelerName: name,
            departure: departure,
            arrival: arrival,
            departureDate: departureDate,
            class: classType,
            travelerType: travelerType,
            numCheckedBags: numBags,
            price: price,
            pnr: pnr
        });

        setShowForm(true);
    }

    return (
        <>
            <table id="flightsTable">
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
                            {_.travelerName}
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
                            {_.numCheckedBags}
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
                            
                            {update && <a href="javascript: void(0)" onClick={
                                () => handleUpdate(_.index, _.airline, _.travelerName, _.departure, _.arrival, _.departureDate, _.class, _.travelerType, _.numCheckedBags, _.price, _.pnr)}>✏️</a>}
                        </td>
                    </tr>
                ))}
            </table>
            {update && showForm && <UpdateForm updateItem={newItem} idToken={idToken} />}
        </>
    );
}

FlightsTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.shape({
        airline: PropTypes.string.isRequired
    }))
}