import * as React from "react";
import {Link} from "react-router-dom";
import CheckoutForm from "./components/CheckoutPage/CheckoutForm";
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

    updateFirstName(newFirstName: string) {
        this.setState({
            firstName: newFirstName,
        })
        console.log(this.state.firstName);

        // is this required?
        this.render();
    }

    updateLastName(newLastName: string) {
        this.setState({
            lastName: newLastName
        })
        console.log(this.state.lastName);

        // is this required?
        this.render();
    }

    updateBirthday(newBirthday: moment.Moment) {
        this.setState({
            birthday: newBirthday
        })
        console.log(this.state.birthday);

        // is this required?
        this.render();
    }

    updateEmail(newEmail: string) {
        this.setState({
            email: newEmail
        })
        console.log(this.state.email);
        
        // is this required?
        this.render();
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
                        <CheckoutForm updateFirstName={this.updateFirstName} updateLastName={this.updateLastName} updateBirthday={this.updateBirthday} updateEmail={this.updateEmail}/>
                    </div>
                </main>
                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>
            </div>
        )
    }
}