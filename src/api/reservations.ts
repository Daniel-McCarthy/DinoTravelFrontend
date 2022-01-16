const baseURL = 'purpledinoapi.link';
const port = '8080';
const reservationsAPI = '/api/reservations';
const reservationsEndpointURL = `https://www.${baseURL}:${port}${reservationsAPI}`;


export interface IReservationData {
    reservation_id: number,
    user_id: number,
    trip_type: string,
    outgoing_flight_type: string,
    outgoing_flight_id: number,
    returning_flight_type: string | undefined,
    returning_flight_id: number | undefined,
    price: number
}


export type Reservations = Array<IReservationData>;

export const getAllReservations = async () : Promise<Reservations | Error> => {
    console.log(`Retrieving all Reservation data from: ${reservationsEndpointURL}`);
    const options = {
        'method': 'GET'
    };
    try {
        const responseData: Response = await fetch(reservationsEndpointURL, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from ${reservationsEndpointURL} endpoint with status: '${statusCode}'`);
        const json: [IReservationData] = await responseData.json();
        console.log(`JSON recieved from ${reservationsEndpointURL} endpoint: '${JSON.stringify(json)}'`);
        return json;
    } catch (error) {
        console.error(`Failed to get reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
};

