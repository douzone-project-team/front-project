import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {ProductsContextProvider} from "./store/Product/products-context";
import {InstrcutionsContextProvider} from "./store/Instruction/Instructions-context";

ReactDOM.render(
    <ProductsContextProvider>
      <InstrcutionsContextProvider>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
      </InstrcutionsContextProvider>
    </ProductsContextProvider>
    ,
    document.querySelector('#root')
);