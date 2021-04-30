import React, { useEffect } from 'react';
// import Header from './Header';
import '../Assets/main.css';
import { Switch, Route } from "react-router-dom";
// import Product from './Product';
// import HomePage from './HomePage';
// import Footer from './Footer';
// import { withRouter } from "react-router";
// import Login from './Login';
// import Registration from './Registration';
import Home from './Home';


const App = (props) => {
    console.log(props, "app")
    return (
        <>
            {/* <Header {...props} />
            <Switch>
                <Route path="/" exact component={HomePage} {...props} />
                <Route path="/products" component={Product} {...props} />
                <Route path="/login" component={Login} {...props} />
                <Route path="/registration" component={Registration} {...props} />
            </Switch >
            <Footer /> */}
            <Switch>
                <Route
                    path="/"
                    render={props =>
                        navigator.onLine ? <Home {...props} /> : "No internet connection"
                    }
                />
            </Switch>
        </>
    );
}

export default App;