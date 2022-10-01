import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'

import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/900.css"

import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />  
    </Provider>
);

