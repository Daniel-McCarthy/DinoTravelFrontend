const baseURL = 'purpledinoapi.link';
const port = '8080';
const complaintsAPI = '/api/reviews';
const complaintsEndpointURL = `https://www.${baseURL}:${port}${complaintsAPI}`;

export interface IReviewsData{
    fullName: string,
    email: string,
    experience_rating: number,
    recommendation_rating: number,
    review: string
}

export const makeReview = async (review: IReviewsData): Promise<Response | Error> => {
    console.log(`Making a review with endpoint: ${complaintsEndpointURL}`);
    const options = {
        'method': 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
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
