import * as React from "react";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./components/ImageCarousel";
import { getReservationsByUser } from "./api/reservations";

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

const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];

// Temp data
const tableItem1: ITableData = {
        index: 0,
        airline: "American",
        travelerName: "Mr Dino",
        departure: "ORD",
        arrival: "LAX",
        departureDate: "12/21/22",
        class: "Economy",
        travelerType: "Adult",
        price: 120,
        pnr: 2
    }
const tableItem2: ITableData = {
    index: 1,
    airline: "American",
    travelerName: "Mr Dino",
    departure: "LAX",
    arrival: "ORD",
    departureDate: "12/24/22",
    class: "Economy",
    travelerType: "Adult",
    price: 180,
    pnr: 3
}
// Temp data
const data = [tableItem1, tableItem2]

export interface ITableData {
    index: number,
    airline: string,
    travelerName: string,
    departure: string,
    arrival: string,
    departureDate: string,
    class: string,
    travelerType: string,
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

}

export class TripsPage extends React.Component<ITripsPageProps, ITripsPageState> {
    
    public constructor(props: ITripsPageProps) {
        super(props)

        this.state = {
            bannerImages,
            data,
            cancel : false,
            update: false,
        }
    }


    // Currently unused
    getUserReservations = async (id: number) => {
        const response = await getReservationsByUser(id);
        if (response instanceof Error) {
            console.error("Error getting reservations");
            return []
        } else {
            console.log(response);
            return response
        }
    }

    // User ID is currently hardcoded to "2"
    // Would normally pull the current user_id from a prop
    // Unused since using hardcoded test data
    // reservations = this.getUserReservations(2);

    render() {
        return (
            <>
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
                            <Link to='/support' >
                                <button className="nontoggle">support</button>
                            </Link>
                            <button className="nontoggle">about us</button>
                            <Link to='/trips' >
                                <button className="nontoggle">trips</button>    
                            </Link>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
                <main>
                    <div id="content">
                        <div id="tripsPageTitle">
                            <h1>Manage your Trips</h1>
                        </div>

                        <div id="manageButtons">
                            <a href="/" id="addFlightLink">Add flight</a>

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
                            <FlightsTable tableData={data} cancel={this.state.cancel} update={this.state.update} />
                        </div>
                    </div>
                    
                    <div id='bannerCarousel'>
                        <ImageCarousel height={300} imagesToUse={this.state.bannerImages} />
                    </div>
                </main>
            </>
        )
    }
}