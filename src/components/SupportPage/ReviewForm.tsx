import React, { useState } from 'react';
import { ToastType } from '../../enums/ToastType';
import { ToastMessage } from '../ToastMessage';

import '../../styles/ReviewForm.css';

export default function ReviewForm() {
    interface IToast {
        message: string,
        toastType: ToastType,
        show: boolean
    }

    const [toast, setToast] = useState<IToast>({toastType: ToastType.InfoToast, message: "", show: false});
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [experience, setExperience] = useState<number>();
    const [recommendation, setRecommendation] = useState<number>();
    const [review, setReview] = useState<string>();

    const validateReview = () => {
        if (name && email && experience && recommendation && review) {
            setToast({
                message: "Thank you for your review!",
                toastType: ToastType.SuccessToast,
                show: true
            })
        } else {
            setToast({
                message: "Please fill out the whole form before submitting.",
                toastType: ToastType.ErrorToast,
                show: true
            })
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
            <div id="review">
                <p>
                    <label htmlFor="txtFullName">Full Name</label><br></br>
                    <input type="text" id="txtFullName" placeholder="First and Last" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setName(_.currentTarget.value)
                    }></input>
                </p>

                <p>
                    <label htmlFor="txtEmail">Email Address</label><br></br>
                    <input type="text" id="txtFullName" placeholder="email@domain.com" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setEmail(_.currentTarget.value)
                    }></input>
                </p>

                <p>
                    <p style={{margin: 0, padding: 0}}>How was your experience on our website?</p>
                    <p style={{margin: 0, padding: 0}}>(1 = lowest and 5 = highest)</p>

                    <input type="radio" name="radExperience" id="exp1" value="1" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="exp1">1</label>
                    
                    <input type="radio" name="radExperience" id="exp2" value="2" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="exp2">2</label>

                    <input type="radio" name="radExperience" id="exp3" value="3" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="exp3">3</label>

                    <input type="radio" name="radExperience" id="exp4" value="4" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="exp4">4</label>

                    <input type="radio" name="radExperience" id="exp5" value="5" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="exp5">5</label>
                </p>

                <p>
                    <p style={{margin: 0, padding: 0}}>How likely are you to recommend Dino Travel to someone you know?</p>
                    <p style={{margin: 0, padding: 0}}>(1 = not very likely and 5 = very likely)</p>

                    <input type="radio" name="radRecomend" id="rec1" value="1" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="rec1">1</label>
                    
                    <input type="radio" name="radRecomend" id="rec2" value="2" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="rec2">2</label>

                    <input type="radio" name="radRecomend" id="rec3" value="3" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="rec3">3</label>

                    <input type="radio" name="radRecomend" id="rec4" value="4" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="rec4">4</label>

                    <input type="radio" name="radRecomend" id="rec5" value="5" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    }></input>
                    <label htmlFor="rec5">5</label>
                </p>

                <p>
                    <label htmlFor="txtarReview">Is there anything we can do to improve?</label><br></br>
                    <textarea id="txtarReview" placeholder="Type Here" onChange={
                        (_ : React.ChangeEvent<HTMLTextAreaElement>) => setReview(_.currentTarget.value)
                    }></textarea>
                </p>

                <p>
                    <label htmlFor="btnSubmit">We will use your email address to follow-up on account issues, and for no other purpose.</label><br></br>
                    <button id="btnSubmit" onClick={validateReview}>Submit</button>
                </p>
            </div>

            <ToastMessage toastType={toast.toastType} show={toast.show} message={toast.message} onToastClosed={onToastClosed}></ToastMessage>
        </>
    );
}

