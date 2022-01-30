const baseURL = 'purpledinoapi.link';
const port = '8080';
const locationsAPI = '/api/locations';
const locationsEndpointURL = `https://www.${baseURL}:${port}${locationsAPI}`;

export interface IAddress {
    cityName: string,
    countryName: string
};

export interface ILocationData {
    type: string,
    subType: string,
    name?: string
    detailedName: string,
    iataCode: string,
    address: IAddress
};

export const getAllLocations = async () => {
    console.log(`Retrieving all Locations data from: '${locationsEndpointURL}'`);
    const options = {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',           
        }
    }

    try {
        const responseData: Response = await fetch(locationsEndpointURL, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from /locations endpoint with status: '${statusCode}'`);
        const json = await responseData.json();
        console.log(`JSON recieved from /locations endpoint: '${JSON.stringify(json)}'`);
        return json;
    } catch (error) {
        console.error(`Failed to get locations data from API endpoint due to reason: ${error}`);
    }
};

export const getLocationsForQuery = async (searchQuery: string): Promise<Array<ILocationData> | Error> => {
    const locationsEndpointWithQuery = `${locationsEndpointURL}?keyword=${searchQuery}`;
    console.log(`Retrieving Locations data from: ${locationsEndpointWithQuery} for query: '${searchQuery}'`);
    const options = {
        'method': 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',           
        }
    }

    try {
        const responseData: Response = await fetch(locationsEndpointWithQuery, options);
        const statusCode = responseData.status;
        console.log(`Recieved response from /locations endpoint with status: '${statusCode}'`);
        const json = await responseData.json();
        console.log(`JSON recieved from /locations endpoint: '${JSON.stringify(json)}'`);
        return json;
    } catch (error) {
        const errorMessage = `Failed to get locations data from API endpoint due to reason: ${error}`;
        console.error(errorMessage);
        return Error(errorMessage);
    }
};
