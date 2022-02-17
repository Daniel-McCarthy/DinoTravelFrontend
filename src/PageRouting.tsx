import * as React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage } from "./AboutPage";
import { CheckoutPage } from "./CheckoutPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SupportPage } from "./SupportPage";
import { IFlightOfferData } from "./api/flightOffers";

interface IPageRoutingProps {

}

interface IPageRoutingState {
    IDToken: string | null
    isLoggedIn: boolean
    reservedFlights: IFlightOfferData[]
}

export class PageRouting extends React.Component<IPageRoutingProps, IPageRoutingState> {
    constructor(props: IPageRoutingProps) {
        super(props)
        this.state = {IDToken: null, isLoggedIn: false, reservedFlights: []}
        let TokenJson = JSON.parse(localStorage.getItem('Token') as string)
        console.log(TokenJson)
        if (TokenJson != null) {
            let TimeExpired = TokenJson.expires_at
            if (Date.now() >= TimeExpired) {
                this.state = {IDToken: null, isLoggedIn: false, reservedFlights: []}
                localStorage.setItem('LoggedIn', 'false');
                localStorage.setItem('LoginAttempted', 'false');
                localStorage.removeItem('Profile');
                localStorage.removeItem('Token');
                console.log('Token has expired');
            }else{
                this.state = {IDToken: TokenJson.id_token, isLoggedIn: true, reservedFlights: []};
            }
        }
    }

    updateIdToken = (newID: string | null) => {
        this.setState({
            IDToken: newID,
            isLoggedIn: newID !== null
        });
        console.log("updated to: " + newID);
        this.render();
    }

    updateReservedFlights = (reservedFlights: IFlightOfferData[]) => {
        this.setState({
            reservedFlights
        });
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/support" element={<SupportPage/>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/checkout" element={<CheckoutPage id_Token={this.state.IDToken} isLoggedIn={this.state.isLoggedIn} />} />
                    <Route path="/" element={<HomePage id_Token={this.state.IDToken} isLoggedIn={this.state.isLoggedIn} onReservedFlightsFinalized={this.updateReservedFlights} />} />
                    <Route path="/login" element={<LoginPage updateIDToken={this.updateIdToken} isLoggedIn={this.state.isLoggedIn}/>} />
                </Routes>
            </Router>
        )
    }
}
