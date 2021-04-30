import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Login(props) {
    const [loginPayload, setLoginPayload] = useState({
        email: "",
        password: ""
    });

    const [registrationData, setRegistrationData] = useState([]);

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/registration').then(res => {
            let registrationDataTemp = JSON.parse(JSON.stringify(registrationData));
            registrationDataTemp = res.data;
            setRegistrationData(registrationDataTemp);
        })
    }, [])

    const loginChangeHandler = ({ currentTarget }) => {
        let loginPayloadTemp = JSON.parse(JSON.stringify(loginPayload));
        loginPayloadTemp[currentTarget.id] = currentTarget.value;

        if (loginPayloadTemp.email && loginPayloadTemp.password) {
            setErrorMessage('')
        }

        setLoginPayload(loginPayloadTemp);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (loginPayload.email && loginPayload.password) {
            let findUserObj = registrationData.find(el => el.email === loginPayload.email)
            if (findUserObj) {
                if (findUserObj.email === loginPayload.email && findUserObj.password === loginPayload.password) {
                    localStorage.setItem('userId', findUserObj.id)
                    props.history.push('/');
                } else {
                    setErrorMessage('Invalid Username/Password')
                }
            } else {
                setErrorMessage('Invalid Username/Password')
            }
        } else {
            setErrorMessage('Please fill email and password')
        }
    }

    return (
        <div class="container">
            <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-5 col-5 pb-4">
                <h2>Login</h2>
                <p>Get Access to your orders, Wishlist and Recommendations</p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-5 col-5 pb-4">
                <form onSubmit={(e) => submitHandler(e)}>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                        <input onChange={loginChangeHandler} class="form-control" placeholder="Enter email" type="email" id="email" value={loginPayload.email} />
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword">Password</label>
                    <input onChange={loginChangeHandler} class="form-control" placeholder="Password" type="password" id="password" value={loginPayload.password} />
                    </div>
                    <button type="submit" className="btn btn-style-1">Sign In</button>
                </form>
            </div>
            </div>
        </div>

    );
}

export default Login;