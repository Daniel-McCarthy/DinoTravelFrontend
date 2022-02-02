import * as React from "react";
import { Link } from "react-router-dom";
import ComplaintForm from "./components/SupportPage/ComplaintForm";
import Policies from "./components/SupportPage/Policies";
import ReviewForm from "./components/SupportPage/ReviewForm";

import './styles/SupportPage.css';

interface ISupportPageState {
    showComplaints: boolean,
    showReviews: boolean,
    showPolicies: boolean
}

interface ISupportPageProps {
}

export class SupportPage extends React.Component<ISupportPageProps, ISupportPageState> {
    
    public constructor(props: ISupportPageProps) {
        super(props)

        this.state = {
            showComplaints: true,
            showReviews: false,
            showPolicies: false
        }
    }


    render() {
        const complaintsButtonClass = this.state.showComplaints ? "selected" : "";
        const reviewsButtonClass = this.state.showReviews ? "selected" : "";
        const policiesButtonClass = this.state.showPolicies ? "selected" : "";
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
                            <button className="nontoggle">trips</button>
                            <Link to='/login'>
                                <button className="nontoggle">login</button>
                            </Link>
                        </nav>
                    </div>
                </header>
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
                </main>
            </>
        )
    }
}