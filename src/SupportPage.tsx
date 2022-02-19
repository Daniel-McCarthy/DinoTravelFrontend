import * as React from "react";
import ComplaintForm from "./components/SupportPage/ComplaintForm";
import Policies from "./components/SupportPage/Policies";
import ReviewForm from "./components/SupportPage/ReviewForm";
import { ImageCarousel } from "./components/ImageCarousel";

import * as bannerImage1 from '../assets/banner_images/flight.jpg';
import * as bannerImage2 from '../assets/banner_images/flight1.jpg';
import * as bannerImage3 from '../assets/banner_images/flight2.jpg';
import * as bannerImage4 from '../assets/banner_images/vacation.png';
import * as bannerImage5 from '../assets/banner_images/vacation1.png';
import * as bannerImage6 from '../assets/banner_images/vacation2.png';
import * as bannerImage7 from '../assets/banner_images/vacation3.png';
import * as bannerImage8 from '../assets/banner_images/vacation4.png';

const bannerImages = [ bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6, bannerImage7, bannerImage8 ];


import './styles/SupportPage.css';
import Header from "./components/Header";

interface ISupportPageState {
    showComplaints: boolean,
    showReviews: boolean,
    showPolicies: boolean,
    bannerImages: string[];
}

interface ISupportPageProps {
    isLoggedIn: boolean
}

export class SupportPage extends React.Component<ISupportPageProps, ISupportPageState> {
    
    public constructor(props: ISupportPageProps) {
        super(props)

        this.state = {
            showComplaints: false,
            showReviews: false,
            showPolicies: true,
            bannerImages
        }
    }


    render() {
        const complaintsButtonClass = this.state.showComplaints ? "selected" : "";
        const reviewsButtonClass = this.state.showReviews ? "selected" : "";
        const policiesButtonClass = this.state.showPolicies ? "selected" : "";
        return (
            <>
                <Header isLoggedIn={this.props.isLoggedIn} />
                <main>
                    <div id="supportPageTitle">
                        <h1>Customer Support</h1>
                        <div className="supportButtons"><br></br>
                            <button className={complaintsButtonClass} onClick={
                                () => this.setState({showComplaints : true, showReviews : false, showPolicies : false})
                            }>Complaints</button>

                            <button className={reviewsButtonClass} onClick={
                                () => this.setState({showComplaints : false, showReviews : true, showPolicies : false})
                            }>Rate Us</button>

                            <button className={policiesButtonClass} onClick={
                                () => this.setState({showComplaints : false, showReviews : false, showPolicies : true})
                            }>Policies</button>
                        </div>
                    </div>

                    <div id="content">
                        <div className="complaintForm">
                            { this.state.showComplaints && <ComplaintForm /> } 
                        </div>

                        <div className="reviewForm"> 
                            { this.state.showReviews && <ReviewForm /> }
                        </div>

                        <div className="policies">
                            { this.state.showPolicies && <Policies /> }
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