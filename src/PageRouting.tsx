import * as React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage } from "./AboutPage";
import { CheckoutPage } from "./CheckoutPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { TripsPage } from "./TripsPage";
import { SupportPage } from "./SupportPage";
import { IFlightOfferData } from "./api/flightOffers";
import SuccessPage from "./components/CheckoutPage/SuccessPage";
import { FlightClass } from "./enums/FlightClass";
import { FlightType } from "./enums/FlightType";

interface IPageRoutingProps {

}

interface IPageRoutingState {
    IDToken: string | null
    isLoggedIn: boolean
    reservedFlights: IFlightOfferData[]
    reservedAdultSeats: number
    reservedChildSeats: number
    flightClass: FlightClass
    flightType: FlightType
}
// const test: IFlightOfferData[] = [{"type":"flight-offer","id":"1","source":"GDS","instantTicketingRequired":false,"nonHomogeneous":false,"oneWay":false,"lastTicketingDate":"2022-02-18","numberOfBookableSeats":9,"itineraries":[{"duration":"PT4H30M","segments":[{"departure":{"iataCode":"ORD","terminal":"1","at":"2022-02-21T15:40:00"},"arrival":{"iataCode":"LAX","terminal":"7","at":"2022-02-21T18:10:00"},"carrierCode":"UA","number":"2375","aircraft":{"code":"753"},"duration":"PT4H30M","id":"120","numberOfStops":0,"blacklistedInEU":false}]}],"price":{"currency":"USD","total":"138.65","base":"115.35","fees":[{"amount":0.0,"type":"SUPPLIER"},{"amount":0.0,"type":"TICKETING"}],"grandTotal":"138.65"},"pricingOptions":{"includedCheckedBagsOnly":false,"fareType":["PUBLISHED"],"refundableFare":false,"noRestrictionFare":false,"noPenaltyFare":false},"validatingAirlineCodes":["UA"],"travelerPricings":[{"travelerId":"1","fareOption":"STANDARD","travelerType":"ADULT","price":{"currency":"USD","total":"138.65","base":"115.35"},"fareDetailsBySegment":[{"segmentId":"120","cabin":"ECONOMY","fareBasis":"LAA3AWEN","class":"L","includedCheckedBags":{"weight":0}}]}]},
// {"type":"flight-offer","id":"1","source":"GDS","instantTicketingRequired":false,"nonHomogeneous":false,"oneWay":false,"lastTicketingDate":"2022-02-18","numberOfBookableSeats":9,"itineraries":[{"duration":"PT4H30M","segments":[{"departure":{"iataCode":"ORD","terminal":"1","at":"2022-02-21T15:40:00"},"arrival":{"iataCode":"LAX","terminal":"7","at":"2022-02-21T18:10:00"},"carrierCode":"UA","number":"2375","aircraft":{"code":"753"},"duration":"PT4H30M","id":"120","numberOfStops":0,"blacklistedInEU":false}]}],"price":{"currency":"USD","total":"138.65","base":"115.35","fees":[{"amount":0.0,"type":"SUPPLIER"},{"amount":0.0,"type":"TICKETING"}],"grandTotal":"138.65"},"pricingOptions":{"includedCheckedBagsOnly":false,"fareType":["PUBLISHED"],"refundableFare":false,"noRestrictionFare":false,"noPenaltyFare":false},"validatingAirlineCodes":["UA"],"travelerPricings":[{"travelerId":"1","fareOption":"STANDARD","travelerType":"ADULT","price":{"currency":"USD","total":"138.65","base":"115.35"},"fareDetailsBySegment":[{"segmentId":"120","cabin":"ECONOMY","fareBasis":"LAA3AWEN","class":"L","includedCheckedBags":{"weight":0}}]}]}];

export class PageRouting extends React.Component<IPageRoutingProps, IPageRoutingState> {
    constructor(props: IPageRoutingProps) {
        super(props)
        this.state = {IDToken: null, isLoggedIn: false, reservedFlights: [], reservedAdultSeats: 0, reservedChildSeats: 0, flightClass: FlightClass.BusinessClass, flightType: FlightType.MultiCity}
        let TokenJson = JSON.parse(localStorage.getItem('Token') as string)
        console.log(TokenJson)
        if (TokenJson != null) {
            let TimeExpired = TokenJson.expires_at
            if (Date.now() >= TimeExpired) {
                this.state = {IDToken: null, isLoggedIn: false, reservedFlights: [], reservedAdultSeats: 0, reservedChildSeats: 0, flightClass: FlightClass.BusinessClass, flightType: FlightType.MultiCity}
                localStorage.setItem('LoggedIn', 'false');
                localStorage.setItem('LoginAttempted', 'false');
                localStorage.removeItem('Profile');
                localStorage.removeItem('Token');
                console.log('Token has expired');
            } else {
                this.state = {IDToken: TokenJson.id_token, isLoggedIn: true, reservedFlights: [], reservedAdultSeats: 0, reservedChildSeats: 0, flightClass: FlightClass.BusinessClass, flightType: FlightType.MultiCity};
            }
        }
    }

    updateIdToken = (newID: string | null) => {
        this.setState({
            IDToken: newID,
            isLoggedIn: newID != null
        });
        console.log("updated to: " + newID);
        this.render();
    }

    updateReservedFlights = (reservedFlights: IFlightOfferData[], reservedAdultSeats: number, reservedChildSeats: number, flightClass: FlightClass, flightType: FlightType) => {
        this.setState({
            reservedFlights,
            reservedAdultSeats,
            reservedChildSeats,
            flightClass,
            flightType
        });
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/trips" element={<TripsPage id_Token={this.state.IDToken} isLoggedIn={this.state.isLoggedIn}/>} />
                    <Route path="/support" element={<SupportPage isLoggedIn={this.state.isLoggedIn} />} />
                    <Route path="/about" element={<AboutPage isLoggedIn={this.state.isLoggedIn} />} />
                    <Route path="/checkout" element={<CheckoutPage id_Token={this.state.IDToken} isLoggedIn={this.state.isLoggedIn} reservedFlightOffers={this.state.reservedFlights} numAdultTravelers={this.state.reservedAdultSeats} numChildTravelers={this.state.reservedChildSeats} flightClass={this.state.flightClass} flightType={this.state.flightType} />} />
                    <Route path="/success" element={<SuccessPage isLoggedIn={this.state.isLoggedIn} />} />
                    <Route path="/" element={<HomePage id_Token={this.state.IDToken} isLoggedIn={this.state.isLoggedIn} onReservedFlightsFinalized={this.updateReservedFlights} />} />
                    <Route path="/login" element={<LoginPage updateIDToken={this.updateIdToken} isLoggedIn={this.state.isLoggedIn}/>} />
                </Routes>
            </Router>
        )
    }
}
