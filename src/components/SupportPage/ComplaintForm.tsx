import React, { useState } from 'react';
import { ToastType } from '../../enums/ToastType';
import { ToastMessage } from '../ToastMessage';

import '../../styles/ComplaintForm.css';

export default function ComplaintForm() {
    interface IToast {
        message: string,
        toastType: ToastType,
        show: boolean
    }
    
    const [toast, setToast] = useState<IToast>({toastType: ToastType.InfoToast, message: "", show: false});
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [resNumber, setResNumber] = useState<string>();
    const [complaint, setComplaint] = useState<string>();


    // TODO make resNumber optional
    console.log(resNumber);

    const validateComplaint = () => {
        if (name && email && complaint) {
            setToast({
                message: "Thank you for your feedback. Complaint recieved.",
                toastType: ToastType.SuccessToast,
                show: true
            });
        } else {
            setToast({
                message: "Please enter: " + (name? "" : "(full name)") + "\t" 
                    + (email? "" : "(email)") + "\t" + (complaint? "" : "(complaint)"),
                toastType: ToastType.ErrorToast,
                show: true
            });
        }
    }

    const onToastClosed = () => {
        setToast({
            message: "",
            toastType: ToastType.InfoToast,
            show: false
        });
    }

    return (
        <>
            <div id="complaint">
                <p>
                    <label htmlFor="txtFullName">Full Name</label><br></br>
                    <input type="text" id="txtFullName" placeholder="First and Last" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setName(_.currentTarget.value)
                    }></input>
                </p>

                <p>
                    <label htmlFor="txtEmail">Email Address</label><br></br>
                    <input type="text" id="txtFullName" required placeholder="email@domain.com" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setEmail(_.currentTarget.value)
                    }></input>
                </p>

                <p>
                    <label htmlFor="txtResNum">Reservation Number (Optional)</label><br></br>
                    <input type="text" id="txtResNum" placeholder="000" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setResNumber(_.currentTarget.value)
                    }></input>
                </p>

                <p>
                    <label htmlFor="txtarComplaint">Complaint</label><br></br>
                    <textarea id="txtarComplaint" placeholder="Type Here" onChange={
                        (_ : React.ChangeEvent<HTMLTextAreaElement>) => setComplaint(_.currentTarget.value)
                    }></textarea>
                </p>

                <p>
                    <button id="btnSubmit" onClick={validateComplaint}>Submit</button>
                </p>
            </div>

            <ToastMessage toastType={toast.toastType} show={toast.show} message={toast.message} onToastClosed={onToastClosed}></ToastMessage>
        </>
    );
}

