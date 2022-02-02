import * as React from "react";
import { ToastType } from "../enums/ToastType";

import '../styles/Toast.css';

interface IToastState {
    show: boolean;
    toastType: ToastType;
    message: string;
}

interface IToastProps {
    toastType: ToastType;
    message: string;
    show: boolean;
}

export class ToastMessage extends React.Component<IToastProps, IToastState> {

    public constructor(props: IToastProps) {
        super(props)

        this.state = {
            toastType: props.toastType,
            message: props.message,
            show: props.show
        }
    }

    componentDidUpdate(prevProps: IToastProps) {
        // Update show/hide state when props updates from parent component.
        if (prevProps.show !== this.props.show) {
            this.setState({
                show: this.props.show
            });
        }

        if (prevProps.message !== this.props.message) {
            this.setState({
                message: this.props.message
            })
        }

        if (prevProps.toastType !== this.props.toastType) {
            this.setState({
                toastType: this.props.toastType
            })
        }
    }

    closeToast = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const toastClass = `toast ${this.state.toastType}`;

        return (
            <div className='toastContainer'>
                {this.state.show ?
                    <div className={toastClass}>
                        <h3>{this.state.message}</h3>
                        <label onClick={this.closeToast} className="closeButton">x</label>
                    </div>
                    : null
                }
            </div>
        )
    }


}
