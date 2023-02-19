import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider  }  from 'react-redux';
import { store } from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'

import Router from './routes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router />
    </Provider>
    
);


