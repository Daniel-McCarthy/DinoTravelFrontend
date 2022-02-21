import * as React from "react";
import CheckoutForm from "./components/CheckoutPage/CheckoutForm";
import CheckoutReceipt from "./components/CheckoutPage/CheckoutReceipt";
import {ImageCarousel} from "./components/ImageCarousel";
import './styles/CheckoutPage.css';
import moment = require("moment");
import { IFlightOfferData } from "./api/flightOffers";
import { IToastMessage, ToastMessage } from "./components/ToastMessage";
import { ToastType } from "./enums/ToastType";
import { IFlightRequestInfo, IReservationData, registerReservations, TravelerType } from "./api/reservations";
import { getAirlineNameFromIataCode } from "./lib/AirlineMapping";
import { FlightType, flightTypeAsJsonLabel } from "./enums/FlightType";
import { FlightClass, flightClassAsJsonLabel } from "./enums/FlightClass";
import Header from "./components/Header";

interface ICheckoutPageState {
    bannerImages: string[];
    user: ICheckoutFormInfo;

    // Error/Message Toast display and configuration
    showToast: boolean;
    toastMessage: IToastMessage;
}

interface ICheckoutPageProps{
    id_Token: string | null
    isLoggedIn: boolean
    reservedFlightOffers: IFlightOfferData[]
    numAdultTravelers: number
    numChildTravelers: number
    flightType: FlightType
    flightClass: FlightClass
}

export interface ICheckoutFormInfo {
    firstName: string,
    lastName: string,
    country: string,
    phoneNo: string,
    gender: string,
    birthday: moment.Moment,
    email: string
}

export class CheckoutPage extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

    public constructor(props: ICheckoutPageProps) {
        super(props)

        console.log('From checkoutpage; flight offers:' + JSON.stringify(this.props.reservedFlightOffers));

        this.updateFirstName.bind(this);
        this.updateLastName.bind(this);
        this.updateCountry.bind(this);
        this.updatePhoneNo.bind(this);
        this.updateGender.bind(this);
        this.updateBirthday.bind(this);
        this.updateEmail.bind(this);

        this.state = {
            bannerImages: [],
            user: {
                firstName: "",
                lastName: "",
                country: "",
                phoneNo: "",
                gender: "",
                birthday: moment(),
                email: ""
            },

            // Initialize toast data, invisible by default until is configured for a message to be shown.
            toastMessage: { toastType: ToastType.InfoToast, message: "" },
            showToast: false,
        }
    }

    // Sorry for adding all of these update functions. I'm not sure how to update a specific field
    // through a more generic function call
    updateFirstName = (newFirstName: string) => {
        this.setState({
            user: {
                firstName: newFirstName,
                lastName : this.state.user.lastName,
                country : this.state.user.country,
                phoneNo : this.state.user.phoneNo,
                gender : this.state.user.gender,
                birthday : this.state.user.birthday,
                email : this.state.user.email,
            }
        })
    }

    updateLastName = (newLastName: string) => {
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : newLastName,
                country : this.state.user.country,
                phoneNo : this.state.user.phoneNo,
                gender : this.state.user.gender,
                birthday : this.state.user.birthday,
                email : this.state.user.email,
            }
        })
    }

    updateCountry = (newCountry: string) => {
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : this.state.user.lastName,
                country : newCountry,
                phoneNo : this.state.user.phoneNo,
                gender : this.state.user.gender,
                birthday : this.state.user.birthday,
                email : this.state.user.email,
            }
        })
    }

    updatePhoneNo = (newPhoneNo: string) => {
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : this.state.user.lastName,
                country : this.state.user.country,
                phoneNo : newPhoneNo,
                gender : this.state.user.gender,
                birthday : this.state.user.birthday,
                email : this.state.user.email,
            }
        })
    }

    updateGender = (newGender: string) => {
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : this.state.user.lastName,
                country : this.state.user.country,
                phoneNo : this.state.user.phoneNo,
                gender : newGender,
                birthday : this.state.user.birthday,
                email : this.state.user.email,
            }
        })
    }

    updateBirthday = (newBirthday: moment.Moment) => {
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : this.state.user.lastName,
                country : this.state.user.country,
                phoneNo : this.state.user.phoneNo,
                gender : this.state.user.gender,
                birthday : newBirthday,
                email : this.state.user.email,
            }
        })
    }

    updateEmail = (newEmail: string) =>{
        this.setState({
            user: {
                firstName: this.state.user.firstName,
                lastName : this.state.user.lastName,
                country : this.state.user.country,
                phoneNo : this.state.user.phoneNo,
                gender : this.state.user.gender,
                birthday : this.state.user.birthday,
                email : newEmail,
            }
        })
    }

    render() {
        return (
            <div>
                <Header isLoggedIn={this.props.isLoggedIn} />
                <main>
                    <div id="checkoutComponents">
                        <div id="checkoutFormContainer">
                            <CheckoutForm updateFirstName={this.updateFirstName} updateLastName={this.updateLastName} updateCountry={this.updateCountry}
                                updatePhoneNo={this.updatePhoneNo} updateGender={this.updateGender} updateBirthday={this.updateBirthday} updateEmail={this.updateEmail} />
                        </div>
                        <div id="checkoutReceiptContainer">
                            <CheckoutReceipt checkoutFormInfo={this.state.user} idToken={this.props.id_Token} flightOffers={this.props.reservedFlightOffers} 
                            onBookingComplete={this.onBookingCompleteClicked} displayError={this.displayError}/>
                        </div>
                    </div>
                </main>
                <div id='bannerCarousel'>
                    <ImageCarousel height={500} imagesToUse={this.state.bannerImages} />
                </div>

                <ToastMessage toastType={this.state.toastMessage.toastType} show={this.state.showToast} message={this.state.toastMessage.message} onToastClosed={this.onToastClosed}></ToastMessage>
            </div>
        )
    }

    onBookingCompleteClicked = async () => {
        await this.submitReservations();
    }

    onToastClosed = () => {
        this.setState({
            showToast: false
        });
    }

    displayError = (message: string) => {
        this.setState({
            showToast: true,
            toastMessage: {
                message,
                toastType: ToastType.ErrorToast
            }
        });
    }

    displaySuccess = (message: string) => {
        this.setState({
            showToast: true,
            toastMessage: {
                message,
                toastType: ToastType.SuccessToast
            }
        });
    }

    submitReservations = async (): Promise<boolean> => {
        const userId = this.props.id_Token;
        if (userId == null) {
            this.displayError('Failed to reserve flights due to not being logged in.');
            return false;
        }

        // Will need to submit a copy of every flight once for each passenger
        const numAdults = this.props.numAdultTravelers;
        const numChildren = this.props.numChildTravelers;
        const flightsToReserve = this.props.reservedFlightOffers;
        const finalReservations: IReservationData[] = [];

        flightsToReserve.forEach(async flight => {
            // Submit reservations for each traveler
            let adultsLeft = numAdults;
            let childrenLeft = numChildren;

            while (adultsLeft > 0 || childrenLeft > 0) {
                // Figure out what kind of traveler we are reserving for and ensure they are counted as reserved.
                const travelerType = adultsLeft > 0 ? TravelerType.Adult : TravelerType.Child;
                if (travelerType === TravelerType.Adult) {
                    adultsLeft -= 1;
                } else {
                    childrenLeft -= 1;
                }

                const itinerary = flight.itineraries[0];
                const flightRequestInfo: IFlightRequestInfo[] = itinerary.segments.map(segment => {
                    return {
                        arrival_airport: segment.arrival.iataCode,
                        departure_airport: segment.departure.iataCode,
                        departure_time: segment.departure.at,
                        arrival_time: segment.arrival.at,
                        flight_provider: getAirlineNameFromIataCode(segment.carrierCode),
                        flight_code: ''
                    }
                });

                const reservation: IReservationData = {
                    price: parseFloat(!!flight.price.grandTotal ? flight.price.grandTotal : '0'),
                    trip_type: flightTypeAsJsonLabel(this.props.flightType),
                    traveler_type: travelerType,
                    traveler_name: `${this.state.user.firstName} ${this.state.user.lastName}`,
                    seat_id: '',
                    seat_class: flightClassAsJsonLabel(this.props.flightClass),
                    num_checked_bags: 0,
                    flight_request_info: flightRequestInfo
                };

                finalReservations.push(reservation);
            }
        });

        const response: Response | Error = await registerReservations(finalReservations, userId);

        if (response instanceof Error) {
            this.displayError('Failed to send reservation submission to Dino Travel.');
            return false;
        }

        if (response.status !== 200 && response.status != 201) {
            this.displayError('Failed to register reservation.');
            console.error(`Reservation registration failed with error status '${response.status} and error: '${response.statusText}'.'`);
            return false;
        } else {
            return true;
        }
    }
}