import * as React from "react";
import ComplaintForm from "./components/SupportPage/ComplaintForm";
import Policies from "./components/SupportPage/Policies";
import ReviewForm from "./components/SupportPage/ReviewForm";
import { ImageCarousel } from "./components/ImageCarousel";

const bannerImages = [ 'flight.jpg', 'flight1.jpg', 'flight2.jpg', 'vacation.png', 'vacation1.png', 'vacation2.png', 'vacation3.png', 'vacation4.png' ];


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