import React from 'react';
import { Switch, Route } from "react-router-dom";
import Product from './Product';
import HomePage from './HomePage';
import Footer from './Footer';
import { withRouter } from "react-router";
import Login from './Login';
import Registration from './Registration';
import Header from './Header';

const Home = (props) => {
    console.log(props);
    return (
        <>
            <Header {...props} />
            <Switch>
                <Route path="/" exact component={HomePage} {...props} />
                <Route path="/products" component={Product} {...props} />
                <Route path="/login" component={Login} {...props} />
                <Route path="/registration" component={Registration} {...props} />
            </Switch >
            <Footer />
        </>
    );
}

export default Home;