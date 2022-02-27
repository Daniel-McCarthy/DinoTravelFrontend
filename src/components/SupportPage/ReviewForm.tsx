import React, { useState } from 'react';
import { ToastType } from '../../enums/ToastType';
import { ToastMessage } from '../ToastMessage';

import '../../styles/ReviewForm.css';
import {IReviewsData, makeReview} from "../../api/reviews";

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
    const [val, setVal] = useState<string>();

    const validateReview = async () => {
        if (name && email && experience && recommendation && review) {
            const newReview: IReviewsData = {
                fullName: name,
                email: email,
                experience_rating: experience,
                recommendation_rating: recommendation,
                review: review
            }
            const response: Response | Error = await makeReview(newReview);
            if (response instanceof Error) {
                console.log('Failed to send reservation submission to Dino Travel.');
            } else {
                setVal("");
                setToast({
                    message: "Your review has been received!",
                    toastType: ToastType.SuccessToast,
                    show: true
                });
                const experienceButtons = document.getElementsByName("radExperience") as NodeListOf<HTMLInputElement>;
                experienceButtons.forEach(element => (element.checked = false));

                const recommendButtons = document.getElementsByName("radRecommend") as NodeListOf<HTMLInputElement>;
                recommendButtons.forEach(element => (element.checked = false));
            }


        } else {
            setToast({
                message: "Please enter: " + (name ? "" : "(full name)") + "\t" + (email ? ""
                    : "(email)") + "\t" + (experience ? "\t" : "(experience)" + "\t" + (recommendation ? "\t" : "(recommendation)"
                    + "\t" + (review ? "\t" : "(review)"))),
                toastType: ToastType.ErrorToast,
                show: true
            })
        }
    }

    const isFormValid = () => {
        return name && email && review && experience && recommendation;
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
                    <label htmlFor="txtFullName">Full Name</label><br/>
                    <input type="text" id="txtFullName" placeholder="John Smith" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setName(_.currentTarget.value)
                    } value={val} required/>
                </p>

                <p>
                    <label htmlFor="txtEmail">Email Address</label><br/>
                    <input type="text" id="txtFullName" placeholder="email@domain.com" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setEmail(_.currentTarget.value)
                    } value={val} required/>
                </p>


                <p>
                    <p style={{margin: 0, padding: 0}}>How was your experience on our website?</p>
                    <p style={{margin: 0, padding: 0}}>(1 = lowest and 5 = highest)</p>

                    <input type="radio" name="radExperience" id="exp1" value="1" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="exp1">1</label>
                    
                    <input type="radio" name="radExperience" id="exp2" value="2" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="exp2">2</label>

                    <input type="radio" name="radExperience" id="exp3" value="3" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="exp3">3</label>

                    <input type="radio" name="radExperience" id="exp4" value="4" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="exp4">4</label>

                    <input type="radio" name="radExperience" id="exp5" value="5" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setExperience(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="exp5">5</label>
                </p>

                <p>
                    <p style={{margin: 0, padding: 0}}>How likely are you to recommend Dino Travel to someone you know?</p>
                    <p style={{margin: 0, padding: 0}}>(1 = not very likely and 5 = very likely)</p>

                    <input type="radio" name="radRecommend" id="rec1" value="1" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="rec1">1</label>
                    
                    <input type="radio" name="radRecommend" id="rec2" value="2" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="rec2">2</label>

                    <input type="radio" name="radRecommend" id="rec3" value="3" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="rec3">3</label>

                    <input type="radio" name="radRecommend" id="rec4" value="4" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="rec4">4</label>

                    <input type="radio" name="radRecommend" id="rec5" value="5" onChange={
                        (_ : React.ChangeEvent<HTMLInputElement>) => setRecommendation(parseInt(_.currentTarget.value))
                    } required/>
                    <label htmlFor="rec5">5</label>
                </p>

                <p>
                    <label htmlFor="txtarReview">Please leave a review for us.</label><br/>
                    <textarea id="txtarReview" placeholder="Type Here" onChange={
                        (_ : React.ChangeEvent<HTMLTextAreaElement>) => setReview(_.currentTarget.value)
                    } value={val} required/>
                </p>

                <p>
                    <label htmlFor="btnSubmit">We will only use your email address to follow-up on account issues, and for no other purpose.</label><br/>
                    <button id="btnSubmit" onClick={validateReview} disabled={!isFormValid()}>Submit</button>
                </p>
            </div>

            <ToastMessage toastType={toast.toastType} show={toast.show} message={toast.message} onToastClosed={onToastClosed}/>
        </>
    );
}

