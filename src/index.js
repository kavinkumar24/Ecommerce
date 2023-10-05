import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import Client from './apolloClient';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <ApolloProvider client={Client}>
  <App />
  </ApolloProvider>
  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
