import React, { useState } from 'react';
import axios from 'axios';

function Registration(props) {

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')


    const registrationChangeHandler = ({ currentTarget }) => {
        let payloadObj = JSON.parse(JSON.stringify(payload));
        if (currentTarget.id !== "confirmPassword") {
            payloadObj[currentTarget.id] = currentTarget.value;
            confirmPassValidation(payloadObj.password, confirmPassword)
            setPayload(payloadObj);
        }
        else {
            confirmPassValidation(payload.password, currentTarget.value);
            setConfirmPassword(currentTarget.value);
        }
    }

    const confirmPassValidation = (pass, confirmPass) => {
        if (pass && confirmPass) {
            if (pass !== confirmPass) {
                setErrorMessage('Password not match with confirm password')
            } else {
                setErrorMessage(undefined)
            }
        }
    }

    const registrationSubmitHandler = (event) => {
        event.preventDefault();

        if (payload.password !== confirmPassword) {
            return setErrorMessage('Password not match with confirm password')
        }
        else {
            axios.post('http://localhost:3001/registration', payload).then(res => {
                alert('You Will redirect to login page after 5 second')
                setTimeout(() => {
                    props.history.push('/login');
                }, 5000);
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
            <div class="col-lg-5 col-md-5 col-sm-5 col-5 pb-4">
                <h2>Login</h2>
                <p>Get Access to your orders, Wishlist and Recommendations</p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-5 col-5 pb-4">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={(e) => registrationSubmitHandler(e)}>
            <div class="form-group">
            <label for="firstName">First Name</label>
                <input value={payload.firstName} class="form-control" placeholder="First Name" onChange={registrationChangeHandler} id="firstName" />
                </div>
                <div class="form-group">
            <label for="lastName">Last Name</label>
                <input value={payload.lastName} class="form-control" placeholder="Last Name" onChange={registrationChangeHandler} id="lastName" />
                </div>
                <div class="form-group">
            <label for="email">Email</label>
                <input value={payload.email} class="form-control" placeholder="Email" onChange={registrationChangeHandler} id="email" />
                </div>
                <div class="form-group">
            <label for="password">Password</label>
                <input value={payload.password} type="password" class="form-control" placeholder="Password" onChange={registrationChangeHandler} id="password" />
                </div>
                <div class="form-group">
            <label for="confirmpassword">Confirm Password</label>
                <input value={confirmPassword} type="password" class="form-control" placeholder="Confirm Password" onChange={registrationChangeHandler} id="confirmPassword" />
               </div>
                <button type="submit" className="btn btn-style-1">Sign Up</button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default Registration;