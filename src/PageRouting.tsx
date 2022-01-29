import * as React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";

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
                </Routes>
            </Router>
        )
    }
}
