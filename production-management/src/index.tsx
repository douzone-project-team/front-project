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
import {MainContextProvider} from './store/Main/main-context';
import {TodoContextProvider} from "./store/Todo/todo-context";
ReactDOM.render(
    <MainContextProvider>
    <AuthContextProvider>
      <TodoContextProvider>
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
      </TodoContextProvider>
    </AuthContextProvider>
    </MainContextProvider>,
    document.querySelector('#root')
);