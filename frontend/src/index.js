import React from 'react';
import ReactDom from 'react-dom';
import App from './Components/App'
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


ReactDom.render(
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>,
    document.querySelector('#root')
)
