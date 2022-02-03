import * as React from "react";
import GoogleLogin from "react-google-login";

const responseGoogle = (response: any) => {
    console.log('FAILURE');
    console.log(response);
}

function onSignIn(googleUser : any) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

interface ILoginPageState {
}

interface ILoginPageProps {
}

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props)

        this.state = {
        }
    }


    render() {
        return (
            <GoogleLogin
                clientId="1042234633479-gpprc2adcpltfjnaij7gib55ko91441n.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSignIn}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        )
    }
}
