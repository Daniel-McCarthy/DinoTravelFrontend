import * as React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage } from "./AboutPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SupportPage } from "./SupportPage";

interface IPageRoutingProps {

};

export class PageRouting extends React.Component {
    constructor(props: IPageRoutingProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/support" element={<SupportPage/>} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        )
    }
}
