import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";

import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

export const IDE = (self: any, mount: any) => {
    const root = ReactDOM.createRoot(mount);

    return {
        root: root,
        app: <HashRouter><App component={self} /></HashRouter>
    };
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
