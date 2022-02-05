import React from 'react';
import '../../styles/FlightComponents/FlightsTable.css'


export default function FlightsTable() {
    const tableHeaders = [
        {title: "Airline"},
        {title: "Departure"},
        {title: "Arrival"},
        {title: "Departure Date"},
        {title: "Price"},
        {title: "Class"},
        {title: "Traveler Type"},
        {title: "Traveler Name"},
        {title: "PNR"},
    ]

    // Temp data
    const tableData = [
        {airline: "American"},
        {departure: "ORD"},
        {arrival: "LAX"},
        {departureDate: "2/6/2022"},
        {price: 120},
        {class: "Economy"},
        {travlerType: "Adult"},
        {travlerName: "me :)"},
        {pnr: 23}
    ]

    // Temp data
    const tableDatas = [tableData, tableData, tableData]

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
                {tableDatas.map((_) => (
                    <tr>
                        {tableData.map((item) => (
                            <td key={item.pnr}>
                                {item.airline}
                                {item.departure}
                                {item.arrival}
                                {item.departureDate}
                                {item.price}
                                {item.class}
                                {item.travlerType}
                                {item.travlerName}
                                {item.pnr}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </>
    );
}
