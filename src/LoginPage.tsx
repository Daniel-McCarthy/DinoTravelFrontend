import * as React from "react";
import {GoogleLogin, GoogleLogout, } from "react-google-login";



interface ILoginPageState {
    LoggedIn: boolean,
    LoginAttempted: boolean,
    Profile: any,
    Token: any,
}

interface ILoginPageProps {
}

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props)

        this.state = {
            LoggedIn: false,
            LoginAttempted: false,
            Profile: null,
            Token: null,
        }
    }

    onSignInFail = (response: any) => {
        this.setState({
            LoginAttempted: true,
            LoggedIn: false
        })
        console.log(response);
    }

    onSignIn = (googleUser : any) => {
        //DO NOT SEND USER ID TO BACKEND
        console.log(googleUser);
        this.setState({
            LoginAttempted: true,
            LoggedIn: true,
            Profile: googleUser.profileObj,
            Token: googleUser.tokenObj,
        })
    }

    onLogOut = () => {
        this.setState({
            LoginAttempted: false,
            LoggedIn: false,
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
                    <p>Welcome {this.state.Profile.name}, to Purple Dino Travel!</p>
                    <p>ID {this.state.Profile.googleId}</p>
                    <img src={this.state.Profile.imageUrl} alt = "profile picture"/>
                    <p>EMAIL {this.state.Profile.email}</p>
                    <p>TOKEN ID {this.state.Token.id_token}</p>
                    <p>SCOPES {this.state.Token.scope}</p>
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
