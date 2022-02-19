import * as React from "react";
import {AuthenticationButton} from "./components/AuthenticationButton";
import {ImageCarousel} from "./components/ImageCarousel";
import './styles/Login.css';
import Header from "./components/Header";

interface ILoginPageState {
    bannerImages: string[];
}

interface ILoginPageProps{
    updateIDToken: (newID: string | null) => void
    isLoggedIn: boolean
}

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props)

        this.state = {
            bannerImages: [],
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="center">
                    <h1>Sign in with Google</h1>
                    <div id="googleButton">
                        <AuthenticationButton updateIDToken={this.props.updateIDToken} isLoggedIn={this.props.isLoggedIn}/>
                    </div>
                    <span style={{"fontSize": "12px"}}>Account login must be done through Google. By signing in, you accept DinoTravel's Terms of Service and Privacy Policy</span>
                </div>

                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>
            </div>
        )
    }
}
