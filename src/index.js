// import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import './styles/index.css';
import dotenv from 'dotenv';
dotenv.config();

// const DOMAIN = process.env.REACT_APP_DOMAIN;
// const CID = process.env.REACT_APP_CLIENT_ID;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
