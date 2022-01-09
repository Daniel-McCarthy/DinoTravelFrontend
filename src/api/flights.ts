const baseURL = 'purpledinoapi.link';
const port = '8080';
const flightsAPI = '/api/flights';
const flightEndpointURL = `https://www.${baseURL}:${port}${flightsAPI}`;

export interface IFlightData {
    arrival_airport: string; // 3 character abbreviation of the airport name
    arrival_time: string;
    departure_airport: string;
    departure_time: string;
    flight_id: number;
    flight_provider: string;
    seats_available: number;
    flight_cost: number; // Not currently provided from flights API, will be filled later.
}

const apiDataString = `[{"flight_id":1,"seats_available":55,"flight_provider":"American Airlines","departure_airport":"ORD","departure_time":"2021-01-05 01:10:00","arrival_airport":"JFK","arrival_time":"2021-01-05 02:00:00"},{"flight_id":2,"seats_available":12,"flight_provider":"United Airlines","departure_airport":"LON","departure_time":"2021-01-06 01:10:00","arrival_airport":"YMQ","arrival_time":"2021-01-06 02:00:00"},{"flight_id":3,"seats_available":1,"flight_provider":"Alaska Airlines","departure_airport":"STO","departure_time":"2021-01-07 01:10:00","arrival_airport":"TYO","arrival_time":"2021-01-07 02:00:00"},{"flight_id":4,"seats_available":65,"flight_provider":"Jet Blue","departure_airport":"WAS","departure_time":"2021-01-08 01:10:00","arrival_airport":"DCA","arrival_time":"2021-01-08 02:00:00"},{"flight_id":5,"seats_available":123,"flight_provider":"Southwest Airlines","departure_airport":"MDW","departure_time":"2021-01-09 01:10:00","arrival_airport":"LAX","arrival_time":"2021-01-09 02:00:00"},{"flight_id":6,"seats_available":3,"flight_provider":"Spirit Airlines","departure_airport":"IAD","departure_time":"2021-01-10 01:10:00","arrival_airport":"LBG","arrival_time":"2021-01-10 02:00:00"},{"flight_id":7,"seats_available":43,"flight_provider":"United Airlines","departure_airport":"BKK","departure_time":"2021-01-11 01:10:00","arrival_airport":"GLA","arrival_time":"2021-01-11 02:00:00"},{"flight_id":8,"seats_available":16,"flight_provider":"Air Wisconsin","departure_airport":"HOU","departure_time":"2021-01-12 01:10:00","arrival_airport":"SNA","arrival_time":"2021-01-12 02:00:00"},{"flight_id":9,"seats_available":7,"flight_provider":"Mesa Airlines","departure_airport":"SEA","departure_time":"2021-01-13 01:10:00","arrival_airport":"TPE","arrival_time":"2021-01-13 02:00:00"},{"flight_id":10,"seats_available":8,"flight_provider":"Dino Airlines","departure_airport":"BHX","departure_time":"2021-01-14 01:10:00","arrival_airport":"BHM","arrival_time":"2021-01-14 02:00:00"},{"flight_id":11,"seats_available":17,"flight_provider":"LOT Polish Airlines","departure_airport":"ORD","departure_time":"2022-01-12 08:00:00","arrival_airport":"WAW","arrival_time":"2022-01-12 18:00:00"}]`;

export const getFlightData = async () => {
    console.log(`Retrieving Flight data from: ${flightEndpointURL}`);
    var opts = {
        headers: {
            'method': 'get',
            'mode': 'no-cors'
        }
    }

    try {
        const responseData: Response = await fetch(flightEndpointURL, opts);
        return await responseData.json();
    } catch (error) {
        console.error(`Failed to get flight data from API endpoint due to reason: ${error}`);
    }

    // Parse local data as backup if network call doesn't work.
    return JSON.parse(apiDataString);
};
