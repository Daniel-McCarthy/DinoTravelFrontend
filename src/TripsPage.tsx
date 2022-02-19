import * as React from "react";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./components/ImageCarousel";
import { getReservationsByUser, IReservationList } from "./api/reservations";
import { getFlightDataById} from "./api/flights";

import * as bannerImage1 from '../assets/banner_images/flight.jpg';
import * as bannerImage2 from '../assets/banner_images/flight1.jpg';
import * as bannerImage3 from '../assets/banner_images/flight2.jpg';
import * as bannerImage4 from '../assets/banner_images/vacation.png';
import * as bannerImage5 from '../assets/banner_images/vacation1.png';
import * as bannerImage6 from '../assets/banner_images/vacation2.png';
import * as bannerImage7 from '../assets/banner_images/vacation3.png';
import * as bannerImage8 from '../assets/banner_images/vacation4.png';
import FlightsTable from "./components/TripsPage/FlightsTable";

import './styles/TripsPage.css'
import Header from "./components/Header";

const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];

export interface ITableData {
    index: number,
    airline: string,
    travelerName: string,
    departure: string,
    arrival: string,
    departureDate: string,
    class: string,
    travelerType: string,
    numCheckedBags: number,
    price: number,
    pnr: number
}

interface ITripsPageState {
    bannerImages: string[];
    data: Array<ITableData>;
    cancel: boolean,
    update: boolean
}

interface ITripsPageProps {
    id_Token: string | null
    isLoggedIn: boolean
}

export class TripsPage extends React.Component<ITripsPageProps, ITripsPageState> {
    
    public constructor(props: ITripsPageProps) {
        super(props)

        this.state = {
            bannerImages,
            data: [],
            cancel: false,
            update: false,
        }
    }

    // Change to use user token.
    getUserReservations = async (): Promise<IReservationList> => {

        if (this.props.id_Token !== null) {

            const response = await getReservationsByUser(this.props.id_Token);
            if (response instanceof Error) {
                console.error("Error getting reservations");
    
                const emptyTableData: IReservationList = {
                    reservationList: []
                }
    
                return emptyTableData;
            } else {
                console.log(response);
                return response
            }
        } else {
            const emptyTableData: IReservationList = {
                reservationList: []
            }

            return emptyTableData
        }
    }

    reservations = this.getUserReservations();

    createTableData = async () => {
        const reservations = (await this.reservations);

        const tableDataItems = [];

        if (reservations === undefined) {
            return;
        }

        const values = Object.values(reservations);
        
        var index = 0
        for (var value of values) {

            const flightData = await getFlightDataById(value.flight_id);
            if (flightData instanceof Error) {
                return;
            }

            // Create a row in the table
            if (value.reservation_id !== undefined) {
                const tableItem: ITableData = {
                    index: index,
                    airline: flightData.flight_provider,
                    travelerName: value.traveler_name,
                    departure: flightData.departure_airport,
                    arrival: flightData.arrival_airport,
                    departureDate: flightData.arrival_time.substring(0,10),
                    class: value.seat_class,
                    travelerType: value.traveler_type,
                    numCheckedBags: value.num_checked_bags,
                    price: value.price,
                    pnr: value.reservation_id,
                }

                // Add the finished row to the table
                tableDataItems.push(tableItem);
                index = index + 1;
            }
        }

        this.setState({
            data: tableDataItems,
        });

        console.log(this.state.data);

    }

    setTableData = () => {
        this.createTableData();
    }

    componentDidMount() {
        this.setTableData();
    }


    render() {
        return (
            <>
                <>
                    <Header />
                    {this.props.isLoggedIn ?
                    <main>
                        <div id="tripsContent">
                            <div id="tripsPageTitle">
                                <h1>Manage your Trips</h1>
                            </div>

                            <div id="manageButtons">
                                <Link to="/">
                                    <span id="addFlightLink">Add flight</span>
                                </Link>

                                {this.state.cancel ? <a href="javascript: void(0)" className="toggleSelected" onClick={
                                    () => this.setState({cancel : !this.state.cancel, update: false})}>Cancel flight</a>
                                    :<a href="javascript: void(0)" className="toggleUnselected" onClick={
                                    () => this.setState({cancel : !this.state.cancel, update: false})}>Cancel flight</a>
                                }

                                {this.state.update ? <a href="javascript: void(0)" className="toggleSelected" onClick={
                                    () => this.setState({update : !this.state.update, cancel: false})}>Update flight</a>
                                    :   <a href="javascript: void(0)" className="toggleUnselected" onClick={
                                    () => this.setState({update : !this.state.update, cancel: false})}>Update flight</a>
                                }

                            </div>

                            <div id="flightsTable">
                                <FlightsTable tableData={this.state.data} cancel={this.state.cancel} update={this.state.update} idToken={this.props.id_Token} />
                            </div>
                        </div>
                        
                        <div id='bannerCarousel'>
                            <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                        </div>
                    </main>
                    : 
                        <div id="loginRedirect">
                            <h1>Please sign in first</h1>
                            <Link to="/login">
                                <button className="nontoggle">Visit login page</button>
                            </Link>
                        </div>
                    }
                </>
            </>
        )
    }
}