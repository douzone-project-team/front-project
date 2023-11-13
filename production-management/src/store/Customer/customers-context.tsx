import React, {Component} from 'react';
import CustomerAction from "./customers-action";
import {CustomersState} from "../../object/Customer/customer-object";
import {initialCustomer, initialCustomerPageState, initialSearchState} from "../../state/customerStateManagement";

const customerAction = new CustomerAction();

export type Props = {
    children?: React.ReactNode;
}

export const CustomersContext = React.createContext<CustomersState>({
    search : initialSearchState,
    customerPage : initialCustomerPageState,
    customer : initialCustomer,
    setCustomerName() : void{
    },
    getCustomer(customerNo: number): void {
    },
    getCustomerList(): void {
    },
    setPage(page: number): void {
    }
});

export class CustomerContextProvider extends Component<Props, CustomersState>{
    state : CustomersState = {
        search: initialSearchState,
        customerPage: initialCustomerPageState,
        customer: initialCustomer,
        setCustomerName: (customerName : string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    customerName: customerName
                }
            }), () => {
                this.getCustomerList();
            }
            );
        },
        setPage: (page: number) => {
            this.setState((prevState) => ({
                    search: {
                        ...prevState.search,
                        page: page,
                    },
                }), () => {
                    this.getCustomerList();
                }
            );
        },
        getCustomerList: () => {
            this.getCustomerList();
        },
        getCustomer: (customerNo: number) => {
            customerAction.getCustomer(customerNo)
                .then(result => {
                    let data = result?.data;
                    console.log(data);
                })
        }

    }

    getCustomerList = () => {
        customerAction.getCustomerList(this.state.search)
            .then((result) => {
                let data = result?.data;
                this.setState({customerPage: data});
            })
    };

    render() {
        return (
            <CustomersContext.Provider value={this.state}>
                {this.props.children}
            </CustomersContext.Provider>
        );
    }
}