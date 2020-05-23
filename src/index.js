import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import RoutingPage from './routingPage';

ReactDOM.render(
    <BrowserRouter>
        <RoutingPage />
    </BrowserRouter>, 
    document.querySelector('#root')
);
