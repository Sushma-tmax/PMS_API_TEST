import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult } from '@azure/msal-browser';

import config from './config';

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
    }
});

// Check if there are already accounts in the browser session
// If so, set the first account as the active account
const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        // Set the active account - this simplifies token acquisition
        const authResult = event.payload as AuthenticationResult;
        msalInstance.setActiveAccount(authResult.account);
    }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
        <App pca = { msalInstance }/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
