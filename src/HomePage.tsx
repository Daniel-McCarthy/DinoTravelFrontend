import * as React from "react";

interface IHomePageState {
}

interface IHomePageProps {

}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    public constructor(props: IHomePageProps) {
        super(props)

        this.state = {
        }
    }
    
    render() {
        return (
            <div>
                <h1>Test</h1>
            </div>
        )
    }
}
