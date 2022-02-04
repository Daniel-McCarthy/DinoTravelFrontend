import * as React from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";



interface ILoginPageState {
    LoggedIn: boolean,
    LoginAttempted: boolean,
    ID: number,
    Name: string,
    ImageURL: string,
    EmailAddress: string
}

interface ILoginPageProps {
}

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props)

        this.state = {
            LoggedIn: false,
            LoginAttempted: false,
            ID: 0,
            Name: "",
            ImageURL: "",
            EmailAddress: ""
        }
    }

    onSignInFail = (response: any) => {
        this.setState({
            LoginAttempted: true,
            LoggedIn: false
        })
        console.log('FAILURE');
        console.log(response);
    }

    onSignIn = (googleUser : any) => {
        console.log(googleUser);
        const token = googleUser.tokenObj.id_token;
        console.log(token);
        const profile = googleUser.getBasicProfile();
        this.setState({
            LoginAttempted: true,
            LoggedIn: true,
            ID: profile.getId(),
            Name: profile.getName(),
            ImageURL: profile.getImageUrl(),
            EmailAddress: profile.getEmail()
        })
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    onLogOut = () => {
        this.setState({
            LoginAttempted: false,
            LoggedIn: false,
            ID: 0,
            Name: "",
            ImageURL: "",
            EmailAddress: ""
        });
    }

    render() {
        const googleClientID = "1042234633479-gpprc2adcpltfjnaij7gib55ko91441n.apps.googleusercontent.com";
        const isLoggedIn = this.state.LoggedIn;
        const loginAttempted = this.state.LoginAttempted;

        let response = null;
        if (loginAttempted) {
            if (isLoggedIn){
                response = <div>
                    <p>Welcome {this.state.Name}, to Purple Dino Travel!</p>
                    <p>ID {this.state.ID}</p>
                    <img src={this.state.ImageURL} alt = "profile picture"/>
                    <p>EMAIL {this.state.EmailAddress}</p>
                </div>
            }else{
                response = <p>Sorry Login has failed.</p>
            }
        }

        let LoginButton;
        if (isLoggedIn) {
            LoginButton =
                <GoogleLogout
                    clientId={googleClientID}
                    buttonText={"Logout"}
                    onLogoutSuccess={this.onLogOut}
                />
        }else{
            LoginButton =
                <GoogleLogin
                    clientId={googleClientID}
                    buttonText={"Login"}
                    onSuccess={this.onSignIn}
                    onFailure={this.onSignInFail}
                    cookiePolicy={'single_host_origin'}
                />;
        }

        return (
            <div>
                {LoginButton}
                {response}
            </div>
        )
    }
}
