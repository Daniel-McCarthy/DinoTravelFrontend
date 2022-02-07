import * as React from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";

interface IAuthenticationState {
    LoggedIn: boolean,
    LoginAttempted: boolean,
    Profile: any,
    Token: any,
}

interface IAuthenticationProps {
}

export class AuthenticationButton extends React.Component<IAuthenticationProps, IAuthenticationState> {

    public constructor(props: IAuthenticationProps) {
        super(props)

        this.state = {
            LoggedIn: localStorage.getItem('LoggedIn') == 'true',
            LoginAttempted: false,
            Profile: JSON.parse(localStorage.getItem('Profile') as string),
            Token: JSON.parse(localStorage.getItem('Token') as string),
        }
    }

    onSignInFail = (response: any) => {
        localStorage.setItem('LoggedIn', 'false');
        localStorage.setItem('LoginAttempted', 'true');
        this.setState({
            LoggedIn: false,
            LoginAttempted: true,
        })
        console.log('Sorry but your login has failed');
        console.log(response);
    }

    onSignIn = (googleUser : any) => {
        //DO NOT SEND USER ID TO BACKEND
        console.log(googleUser);
        localStorage.setItem('LoggedIn', 'true');
        localStorage.setItem('LoginAttempted', 'true');
        localStorage.setItem('Profile', JSON.stringify(googleUser.profileObj));
        localStorage.setItem('Token', JSON.stringify(googleUser.tokenObj));
        this.setState({
            LoginAttempted: true,
            LoggedIn: true,
            Profile: googleUser.profileObj,
            Token: googleUser.tokenObj,
        })
    }

    onLogOut = () => {
        localStorage.setItem('LoggedIn', 'false');
        localStorage.setItem('LoginAttempted', 'false');
        localStorage.removeItem('Profile');
        localStorage.removeItem('Token');
        this.setState({
            LoginAttempted: false,
            LoggedIn: false,
        });
    }

    render() {
        //login info
        const googleClientID = "1042234633479-gpprc2adcpltfjnaij7gib55ko91441n.apps.googleusercontent.com";
        const isLoggedIn = this.state.LoggedIn;

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
            </div>
        )
    }
}