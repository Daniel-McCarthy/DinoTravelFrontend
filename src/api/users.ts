import moment from "moment";

const baseURL = 'purpledinoapi.link';
const port = '8080';
const usersAPI = '/api/users';
const usersEndpointURL = `https://www.${baseURL}:${port}${usersAPI}`;

export const updateUser = async (newFirstName: string, newLastName: string, newBirthday: moment.Moment, subjectId: string) => {
    
    const options = {
        'method': 'PUT',
        'headers': {
            'Authorization': subjectId,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            "first_name": newFirstName,
            "last_name": newLastName,
            "dob": newBirthday
        })
    };

    try {
        const responseData: Response = await fetch(usersEndpointURL, options);
        console.log("User updated");
        return responseData;
    } catch (error) {
        console.error(`Failed to update user data from API endpoint due to reason: ${error}`);
        return error as Error;
    }
}