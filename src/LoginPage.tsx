import * as React from "react";
import {AuthenticationButton} from "./components/AuthenticationButton";

interface ILoginPageState {
}

interface ILoginPageProps{
}

export class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <AuthenticationButton/>
            </div>
        )
    }
}
