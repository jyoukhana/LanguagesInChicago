import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import RoutingPage from './routingPage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RoutingPage />
        </BrowserRouter>
    </React.StrictMode>,
    document.querySelector('#root')
);