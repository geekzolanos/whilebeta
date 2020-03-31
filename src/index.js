import React from 'react';
import { render } from 'react-dom';
import App from './app';
import './assets/css/style.css';

const disableReactDevtools = () => {
    if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) return;

    for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = 
            typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] == 'function'
            ? Function.prototype
            : null;
    }
}

if (process.env.NODE_ENV === 'production')
    disableReactDevtools();
    
render(<App />, document.getElementById('root'));
