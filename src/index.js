import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; //this does not seem particualrly helpful...
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  // <React.StrictMode> //not sure how important this is...
  //provider needed to provide acess to state in redux
 <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
