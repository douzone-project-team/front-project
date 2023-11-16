import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {ProductsContextProvider} from "./store/Product/products-context";
import {InstrcutionsContextProvider} from "./store/Instruction/Instructions-context";
import DeliveryInstructionContextProvider
  from './store/DeliveryInstruction/delivery-instruction-context';
import {DeliveriesContextProvider} from './store/Delivery/deliveries-context';
import {CustomerContextProvider} from './store/Customer/customers-context';
import {EmployeeContextProvider} from './store/Employee/employee-context';
import {AuthContextProvider} from './store/Auth/auth-context';
import ProductInstructionProvider from './store/ProductInstruction/product-instruction-context';

ReactDOM.render(
    <AuthContextProvider>
      <EmployeeContextProvider>
        <ProductsContextProvider>
          <InstrcutionsContextProvider>
            <ProductInstructionProvider>
              <DeliveriesContextProvider>
                <DeliveryInstructionContextProvider>
                  <CustomerContextProvider>
                    <React.StrictMode>
                      <App/>
                    </React.StrictMode>
                  </CustomerContextProvider>
                </DeliveryInstructionContextProvider>
              </DeliveriesContextProvider>
            </ProductInstructionProvider>
          </InstrcutionsContextProvider>
        </ProductsContextProvider>
      </EmployeeContextProvider>
    </AuthContextProvider>,
    document.querySelector('#root')
);