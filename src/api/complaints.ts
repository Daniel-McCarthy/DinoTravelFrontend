const baseURL = 'purpledinoapi.link';
const port = '8080';
const complaintsAPI = '/api/complaints';
const complaintsEndpointURL = `https://www.${baseURL}:${port}${complaintsAPI}`;

export interface IComplaintsData{
    fullName: string,
    email: string,
    reservation_id: number,
    complaint: string
}

export const makeComplaint = async (complaint: IComplaintsData): Promise<Response | Error> => {
    console.log(complaint);
    console.log(`Making a complaint with endpoint: ${complaintsEndpointURL}`);
    const options = {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(complaint)
    };
    try {
        const responseData: Response = await fetch(complaintsEndpointURL, options);
        const statusCode = responseData.status;
        console.log(`Received response from ${complaintsEndpointURL} endpoint with status: '${statusCode}'`);
        return responseData;
    } catch (error) {
        console.error(`Failed to post complaint data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}
