import React, {Component} from 'react';
import CustomerAction from "./customers-action";
import {CustomersState} from "../../object/Customer/customer-object";
import {
    initialCustomer,
    initialCustomerPageState,
    initialInsertCustomerState,
    initialSearchState, insertBarState
} from "../../state/customerStateManagement";

const customerAction = new CustomerAction();

export type Props = {
    children?: React.ReactNode;
}

export const CustomersContext = React.createContext<CustomersState>({
    search : initialSearchState,
    insertCustomer : initialInsertCustomerState,
    customerPage : initialCustomerPageState,
    customer : initialCustomer,
    insertBar : insertBarState,
    setInsertBar() : void{
    },
    setSearch() : void{
    },
    setInsertCustomer() : void{
    },
    getCustomer(): void {
    },
    getCustomerList(): void {
    },
    setPage(): void {
    }
});

export class CustomerContextProvider extends Component<Props, CustomersState>{
    state : CustomersState = {
        search: initialSearchState,
        insertCustomer: initialInsertCustomerState,
        customerPage: initialCustomerPageState,
        customer: initialCustomer,
        insertBar : insertBarState,
        setInsertBar:(insertBar: boolean) => {
            this.setState((prevState) => ({
                insertBar: {
                    ...prevState.insertBar,
                    insertBar: insertBar
                }
            }), () => {
                this.getCustomerList();
            }
            );
        },
        setSearch: (customerCode: string, customerName : string, sector : string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    customerCode: customerCode,
                    customerName: customerName,
                    sector: sector
                }
            }), () => {
                this.getCustomerList();
            }
            );
        },
        setInsertCustomer: (customerCode: string, customerName : string, customerTel: string, ceo: string, sector : string) => {
            this.setState((prevState) =>({
                insertCustomer: {
                    ...prevState.insertCustomer,
                    customerCode: customerCode,
                    customerName: customerName,
                    customerTel: customerTel,
                    ceo: ceo,
                    sector: sector
                }
            }), () => {
                this.insertCustomer();
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
                    this.setState({customer: data});
                })
        }

    }

    insertCustomer = () => {
        try {
            customerAction.regiCustomers(this.state.insertCustomer)
                .then(result => {
                    alert("등록을 성공하였습니다.")
                });
        } catch ({message}){
            alert(message);
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