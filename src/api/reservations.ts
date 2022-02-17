const baseURL = 'purpledinoapi.link';
const port = '8080';
const reservationsAPI = '/api/reservations';
const reservationsEndpointURL = `https://www.${baseURL}:${port}${reservationsAPI}`;

export enum TravelerType {
    Adult = "ADULT",
    Child = "CHILD"
};

export interface IFlightRequestInfo {
    departure_airport: string, // IATA Code
    arrival_airport: string, // IATA Code
    departure_time: string,
    arrival_time: string,
    flight_provider: string,
    flight_code: string
};

export interface IReservationData {
    price: number,
    trip_type: string,
    traveler_type: TravelerType,
    traveler_name: string,
    seat_id: string,
    seat_class: string,
    num_checked_bags: number,
    flight_request_info: IFlightRequestInfo[]
};

export interface IReservationList {
    reservationList: IReservationDataNew[]
}

// For the time being, I put the new schema into a seperate 
// interface. I was worried updating IReservationData interface above 
// might break something that was being worked on
export interface IReservationDataNew {
    reservation_id?: number,
    booking_id?: number,
    subject_id?: string,
    price: number,
    trip_type: string,
    flight_id: number,
    traveler_type: string,
    traveler_name: string,
    seat_id: string,
    seat_class: string,
    num_checked_bags: number,
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

export const getReservationsByUser = async (subject_id: string): Promise<IReservationList | Error> => {
    const options = {
        'method': 'GET',
        'headers' : {
            'Authorization': subject_id
        }
    };

    const url = reservationsEndpointURL + '/user';

    try {
        const responseData: Response = await fetch(url, options,);

        const statusCode = responseData.status;
        console.log(`Recieved response from ${reservationsEndpointURL} endpoint with status: '${statusCode}'`);

        const json: IReservationList = await responseData.json();
        console.log(`JSON recieved from ${reservationsEndpointURL} endpoint: '${JSON.stringify(json)}'`);

        return json;

    } catch (error) {
        console.error(`Failed to get reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}

export const getReservationById = async (id: number, subject_id: string): Promise<IReservationDataNew | Error> => {
    const url = reservationsEndpointURL + '/' + id.toString();

    const options = {
        'method': 'GET',
        'headers' : {
            'Authorization': subject_id
        }
    };

    try {
        const responseData: Response = await fetch(url, options);

        const statusCode = responseData.status;
        console.log(`Recieved response from ${reservationsEndpointURL} endpoint with status: '${statusCode}'`);

        const json: IReservationDataNew = await responseData.json();
        console.log(`JSON recieved from ${reservationsEndpointURL} endpoint: '${JSON.stringify(json)}'`);

        return json;

    } catch (error) {
        console.error(`Failed to get reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}

export const registerReservation = async (reservation: IReservationData, userID: string): Promise<Response | Error> => {

    console.log(reservation);
    console.log(`Registering reservation with endpoint: ${reservationsEndpointURL}`);
    const options = {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': userID,
            'Content-Type': 'application/json'
        },
        body: `[${JSON.stringify(reservation)}]`
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


export const registerReservations = async (reservations: IReservationData[], userID: string): Promise<Response | Error> => {
    console.log(reservations);
    console.log(`Registering reservation with endpoint: ${reservationsEndpointURL}`);
    const options = {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': userID,
            'Content-Type': 'application/json'
        },
        body: `${JSON.stringify(reservations)}`
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

export const updateReservation = async (newName: string, newBagCount: number, id: number, subject_id: string): Promise<Response | Error> => {
    const url = reservationsEndpointURL + '/' + id.toString();

    const options = {
        'method': 'PUT',
        'headers': {
            'Authorization': subject_id,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({
            "traveler_name": newName,
            "num_checked_bags": newBagCount,
        })
    };

    try {
        const responseData: Response = await fetch(url, options);

        return responseData;
    } catch (error) {
        console.error(`Failed to get reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}

export const deleteReservation = async (id: number, subject_id: string) : Promise<Response | Error> => {
    const options = {
        'method': 'DELETE',
        headers: {
            'Authorization': subject_id,
            'Content-Type': 'application/json'
        }
    }
    try {
        const url = reservationsEndpointURL + '/' + id.toString();
        const responseData: Response = await fetch(url, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from ${reservationsEndpointURL} endpoint with status: '${statusCode}'`);
        return responseData;

    } catch (error) {
        console.error(`Failed to delete reservation data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}
