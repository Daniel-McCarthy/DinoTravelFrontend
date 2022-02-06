import React from 'react';
import { ITableData } from '../../TripsPage';
import PropTypes from 'prop-types';

import '../../styles/FlightComponents/FlightsTable.css'


export type TableData = Array<ITableData>;

export default function FlightsTable({tableData} : {tableData: TableData}) {
    const tableHeaders = [
        {title: "Index"},
        {title: "Airline"},
        {title: "Traveler Name"},
        {title: "Departure"},
        {title: "Arrival"},
        {title: "Departure Date"},
        {title: "Class"},
        {title: "Traveler Type"},
        {title: "Price"},
        {title: "PNR"},
    ]

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
                {tableData.map((_) => (
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
                            {_.price}
                        </td>
                        
                        <td>
                            {_.pnr}
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