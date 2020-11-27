import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Page from './Page';
import { AlitaProvider, setConfig } from 'redux-alita';
ReactDOM.render(
    <AlitaProvider>
        <Page />
    </AlitaProvider>, 
    document.getElementById('root'));
serviceWorker.unregister();
