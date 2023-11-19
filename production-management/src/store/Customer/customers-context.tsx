import React, {Component} from 'react';
import CustomerAction from "./customers-action";
import {CustomersState, InsertCustomer, UpdateCustomer} from "../../object/Customer/customer-object";
import {
    initialCustomer,
    initialCustomerPageState,
    initialInsertCustomerState,
    initialSearchState, initialUpdateCustomerState
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
    updateCustomer : initialUpdateCustomerState,
    setSearch() : void{
    },
    setInsertCustomer() : void{
    },
    setUpdateCustomer() : void{
    },
    getCustomer(): void {
    },
    getCustomerList(): void {
    },
    setPage(): void {
    },
    deleteCustomer() : void{
    }
});

export class CustomerContextProvider extends Component<Props, CustomersState>{
    state : CustomersState = {
        search: initialSearchState,
        insertCustomer: initialInsertCustomerState,
        customerPage: initialCustomerPageState,
        customer: initialCustomer,
        updateCustomer : initialUpdateCustomerState,
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
        setInsertCustomer: (insertCustomer: InsertCustomer) => {
            this.setState(() =>({
                insertCustomer: insertCustomer
            }), () => {
                this.insertCustomer();
            }
            );
        },
        setUpdateCustomer: (customerNo: number, updateCustomer: UpdateCustomer) => {
            this.setState(() =>({
                updateCustomer: updateCustomer
            }), () => {
                this.updateCustomer(customerNo);
            });
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
        },
        deleteCustomer: (customerNo: number) => {
            customerAction.deleteCustomer(customerNo)
                .then(result => {
                    alert("삭제하였습니다.");
                    this.getCustomerList();
                    this.setState({customer: initialCustomer});
                })
                .catch(reason => {
                    alert(reason);
                })
        }
    }

    insertCustomer = () => {
        customerAction.regiCustomers(this.state.insertCustomer)
            .then(result => {
                alert("등록을 성공하였습니다.")
                this.getCustomerList();
            })
            .catch(reason => {
                alert(reason);
            });
    }

    updateCustomer = (customerNo: number) => {
        customerAction.updateCustomer(customerNo, this.state.updateCustomer)
            .then(() => {
                alert("수정을 성공하였습니다.");
                this.state.getCustomer(customerNo);
                this.getCustomerList();
            })
            .catch(error => {
                // alert(reason);
            });
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