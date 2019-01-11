import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

const env = process.env.NODE_ENV;
const entry = env === 'development'
  ? ReactDOM.render
  : ReactDOM.hydrate || ReactDOM.render;

const structure = (
  <BrowserRouter>
    <App data={window.__INITIAL_DATA__} />
  </BrowserRouter>
);

entry(structure, document.getElementById('root'));
