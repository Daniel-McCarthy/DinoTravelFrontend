import * as React from "react";
import {AuthenticationButton} from "./components/AuthenticationButton";
import {Link} from "react-router-dom";
import {ImageCarousel} from "./components/ImageCarousel";
import './styles/Login.css';

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
                <header>
                    <div id="headerContent">
                        <div className="banner">
                            <Link to='/'>
                                <img className="logo" alt="Dino Travel Logo" />
                            </Link>
                            <div className="slogan">
                                <h3>Travel More</h3>
                            </div>
                        </div>

                        <nav>
                            <Link to="/support">
                                <button className="nontoggle">support</button>
                            </Link>
                            <button className="nontoggle">about us</button>
                            <Link to="/trips">
                                <button className="nontoggle">trips</button>
                            </Link>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
                <div className="center">
                    <AuthenticationButton updateIDToken={this.props.updateIDToken} isLoggedIn={this.props.isLoggedIn}/>
                </div>

                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>
            </div>
        )
    }
}
