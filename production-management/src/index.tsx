import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {ProductsContextProvider} from "./store/Product/products-context";

ReactDOM.render(
    <ProductsContextProvider>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </ProductsContextProvider>
    ,
    document.querySelector('#root')
);