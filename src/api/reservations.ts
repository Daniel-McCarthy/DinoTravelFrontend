const baseURL = 'purpledinoapi.link';
const port = '8080';
const reservationsAPI = '/api/reservations';
const reservationsEndpointURL = `https://www.${baseURL}:${port}${reservationsAPI}`;


export interface IReservationData {
    reservation_id?: number,
    user_id: number,
    trip_type: string,
    outgoing_flight_type: string,
    outgoing_flight_id: number,
    returning_flight_type?: string,
    returning_flight_id?: number,
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


export const registerReservation = async (reservation: IReservationData): Promise<Response | Error> => {
    console.log(reservation);
    console.log(`Registering reservation with endpoint: ${reservationsEndpointURL}`);
    const options = {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    };
    try {
        const responseData: Response = await fetch(reservationsEndpointURL, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from ${reservationsEndpointURL} endpoint with status: '${statusCode}'`);
        return responseData;
    } catch (error) {
        console.error(`Failed to get reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
};
