import * as React from "react";
import {Link} from "react-router-dom";
import CheckoutForm from "./components/CheckoutPage/CheckoutForm";
import {ImageCarousel} from "./components/ImageCarousel";
import './styles/CheckoutPage.css';

interface ICheckoutPageState {
    bannerImages: string[];
}

interface ICheckoutPageProps{
    id_Token: string | null
    isLoggedIn: boolean
}

export class CheckoutPage extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

    public constructor(props: ICheckoutPageProps) {
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
                <main>
                    <div>
                        <CheckoutForm />
                    </div>
                </main>
                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>
            </div>
        )
    }
}