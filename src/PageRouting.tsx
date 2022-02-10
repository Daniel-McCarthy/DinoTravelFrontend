import * as React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

interface IPageRoutingProps {

};

interface IPageRoutingState {
    userID: number | null;
}

export class PageRouting extends React.Component<IPageRoutingProps, IPageRoutingState> {
    constructor(props: IPageRoutingProps) {
        super(props)

        this.state = {
            userID: null
        }
    }

    updateUserID = (newID: number) => {
        this.setState({
            userID: newID
        });
        console.log(`Recieved Login Event from PageRouting.tsx: New user ID:${newID}`)
        this.render();
    }
    

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage userID={this.state.userID} />}/>
                    <Route path="/login" element={<LoginPage onLoginUserUpdate={this.updateUserID}/>} />
                </Routes>
            </Router>
        )
    }
}
