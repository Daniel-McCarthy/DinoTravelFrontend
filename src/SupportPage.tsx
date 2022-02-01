import * as React from "react";
import { Link } from "react-router-dom";
import ComplaintForm from "./components/SupportPage/ComplaintForm";

import './styles/SupportPage.css';


interface ISupportPageState {
}

interface ISupportPageProps {
}

export class SupportPage extends React.Component<ISupportPageProps, ISupportPageState> {
    
    public constructor(props: ISupportPageProps) {
        super(props)

        this.state = {
        }
    }


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
                            <button>Complaints</button>
                            <button>Rate Us</button>
                            <button>Policies</button>
                        </div>
                    </div>

                    <div id="content">
                        <ComplaintForm />
                    </div>
                </main>
            </>
        )
    }
}