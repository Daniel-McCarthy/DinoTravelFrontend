import * as React from "react";
import {Link} from "react-router-dom";
import CheckoutForm from "./components/CheckoutPage/CheckoutForm";
import CheckoutReceipt from "./components/CheckoutPage/CheckoutReceipt";
import {ImageCarousel} from "./components/ImageCarousel";
import './styles/CheckoutPage.css';
import moment = require("moment");

interface ICheckoutPageState {
    bannerImages: string[];
    firstName: string;
    lastName: string;
    birthday: moment.Moment;
    email: string;
}

interface ICheckoutPageProps{
    id_Token: string | null
    isLoggedIn: boolean
}

export class CheckoutPage extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

    public constructor(props: ICheckoutPageProps) {
        super(props)

        this.updateFirstName.bind(this);
        this.updateLastName.bind(this);
        this.updateBirthday.bind(this);
        this.updateEmail.bind(this);

        this.state = {
            bannerImages: [],
            firstName: "",
            lastName: "",
            birthday: moment(),
            email: ""
        }
    }

    updateFirstName = (newFirstName: string) => {
        this.setState({
            firstName: newFirstName,
        })
    }

    updateLastName = (newLastName: string) => {
        this.setState({
            lastName: newLastName
        })
    }

    updateBirthday = (newBirthday: moment.Moment) => {
        this.setState({
            birthday: newBirthday
        })
    }

    updateEmail = (newEmail: string) =>{
        this.setState({
            email: newEmail
        })
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
                            <Link to="/about">
                                <button className="nontoggle">about us</button>
                            </Link>
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
                    <div id="checkoutComponents">
                        <div id="checkoutFormContainer">
                            <CheckoutForm updateFirstName={this.updateFirstName} updateLastName={this.updateLastName} updateBirthday={this.updateBirthday} updateEmail={this.updateEmail} />
                        </div>
                        <div id="checkoutReceiptContainer">
                            <CheckoutReceipt firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} dob={(this.state.birthday)} idToken={this.props.id_Token} />
                        </div>
                    </div>
                </main>
                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>
            </div>
        )
    }
}