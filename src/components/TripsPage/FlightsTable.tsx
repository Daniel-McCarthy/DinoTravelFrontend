import React, { useState } from 'react';
import { ITableData } from '../../TripsPage';
import PropTypes from 'prop-types';

import '../../styles/FlightComponents/FlightsTable.css'


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

    // Would normally send a /delete request instead
    const handleDelete = (resId: number) => {
        if (window.confirm("Are you sure you want you cancel your flight?")) {

            setData(data.filter(_ => _.pnr !== resId))
        }
    }

    // Would normally send a /put request instead and use reservation number instead of
    const handleNameUpdate = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {

        const newName = event.currentTarget.value;

        if (newName !== "") {
            const currentData = [...data];
            const updatedItem = {...currentData[index]};

            updatedItem.travelerName = newName;
            currentData[index] = updatedItem

            setData(currentData);
        }
    }

    return (
        <>
            {data.length !== 0 ?
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
                                    <input type="text" placeholder={_.travelerName} onChange={
                                        (event) => handleNameUpdate(_.index, event)}></input>
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
            : <p>There are no flights to display.</p>}
        </>
    );
}

FlightsTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.shape({
        airline: PropTypes.string.isRequired
    }))
}