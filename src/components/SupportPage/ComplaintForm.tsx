import React, { useState } from 'react';
import { ToastType } from '../../enums/ToastType';
import { ToastMessage } from '../ToastMessage';

import '../../styles/ComplaintForm.css';
import {IComplaintsData, makeComplaint} from "../../api/complaints";

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
    const [val, setVal] = useState<string>();


    // TODO make resNumber optional
    console.log(resNumber);

    const validateComplaint = async () => {
        if (name && email && complaint) {
            //send post with all info
            const reservation: IComplaintsData = {
                fullName: name,
                email: email,
                reservation_id: Number(resNumber),
                complaint: complaint
            };
            const response: Response | Error = await makeComplaint(reservation);
            if (response instanceof Error) {
                console.log('Failed to send reservation submission to Dino Travel.');
            } else {
                setVal("");
                setToast({
                    message: "We appreciate the feedback. Your complaint has been received.",
                    toastType: ToastType.SuccessToast,
                    show: true
                });
            }
        } else {
            setToast({
                message: "Please enter: " + (name? "" : "(full name)") + "\t" 
                    + (email? "" : "(email)") + "\t" + (complaint? "" : "(complaint)"),
                toastType: ToastType.ErrorToast,
                show: true
            });
        }
    }

    const isFormValid = () => {
        return name && email && complaint;
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
                    <label htmlFor="txtFullName">Full Name</label>
                    <br/>
                    <input type="text" id="txtFullName" placeholder="John Smith" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setName(_.currentTarget.value)
                    } value={val} required/>
                </p>

                <p>
                    <label htmlFor="txtEmail">Email Address</label>
                    <br/>
                    <input type="text" id="txtFullName" placeholder="email@domain.com" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setEmail(_.currentTarget.value)
                    } value={val} required/>
                </p>

                <p>
                    <label htmlFor="txtResNum">Reservation ID (Optional)</label>
                    <br/>
                    <input type="text" id="txtResNum" placeholder="123456" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setResNumber(_.currentTarget.value)
                    } value={val}/>
                </p>

                <p>
                    <label htmlFor="txtarComplaint">Complaint</label>
                    <br/>
                    <textarea id="txtarComplaint" placeholder="Type Complaint Here" onChange={
                        (_ : React.ChangeEvent<HTMLTextAreaElement>) => setComplaint(_.currentTarget.value)
                    } value={val} required/>
                </p>

                <p>
                    <button id="btnSubmit" onClick={validateComplaint} disabled={!isFormValid()}>Submit</button>
                </p>
            </div>

            <ToastMessage toastType={toast.toastType} show={toast.show} message={toast.message} onToastClosed={onToastClosed}/>
        </>
    );
}

