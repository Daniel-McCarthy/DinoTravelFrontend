import * as React from "react";

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
                <p>Code for button move to home page on this branch </p>
                <p>Yes this is actually the login page because I did not change it </p>
                <button onClick={() => {console.log(localStorage.getItem('name'))}} >CLICK ME!</button>
            </div>
        )
    }
}
