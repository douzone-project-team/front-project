import React, {Component} from 'react';
import Swal from 'sweetalert2'
import CustomerAction from "./customers-action";
import {CustomersState, InsertCustomer, UpdateCustomer} from "../../object/Customer/customer-object";
import {
    initialCheckCustomerCode,
    initialCustomer,
    initialCustomerPageState, initialDuplicateCustomerCodeResult,
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
    duplicateCustomerCodeResult : initialDuplicateCustomerCodeResult,
    checkCustomerCode : initialCheckCustomerCode,
    setSearch() : void{
    },
    setCheckCustomerCode() : void{
    },
    setCheckCustomerCodeDefault() : void{
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
    },
    cleanCustomer(): void{
    },
    getInitCustomer ():  void{
    }
});

export class CustomerContextProvider extends Component<Props, CustomersState>{
    state : CustomersState = {
        search: initialSearchState,
        insertCustomer: initialInsertCustomerState,
        customerPage: initialCustomerPageState,
        customer: initialCustomer,
        updateCustomer : initialUpdateCustomerState,
        duplicateCustomerCodeResult : initialDuplicateCustomerCodeResult,
        checkCustomerCode : initialCheckCustomerCode,
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

        setCheckCustomerCodeDefault: () => {
            this.setState(() => ({
                duplicateCustomerCodeResult: initialDuplicateCustomerCodeResult
            }), () => {

            });
        },

        setCheckCustomerCode: (customerCode:string) => {
            this.setState((prevState) =>({
                checkCustomerCode: {
                    ...prevState.checkCustomerCode,
                    customerCode: customerCode
                }
            }), () => {
                    this.duplicateCheck()
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
                }).catch(error => {
                this.printErrorAlert(error);
            });
        },
        deleteCustomer: (customerNo: number) => {
            customerAction.deleteCustomer(customerNo)
                .then(result => {
                    Swal.fire({
                        icon: "success",
                        title: "거래처 삭제",
                        text: "거래처 삭제를 완료하였습니다!"
                    });
                    this.getCustomerList();
                    this.setState({customer: initialCustomer});
                })
                .catch(error => {
                    this.printErrorAlert(error);
                });
        },
        cleanCustomer: () => {
            this.setState({customer: initialCustomer, search: initialSearchState});
        },
        getInitCustomer: () => {
            customerAction.getCustomerList(this.state.search)
                .then((result) => {
                    this.setState({customerPage: result?.data}, () => {
                        if(this.state.customerPage.list.length){
                            this.state.getCustomer(this.state.customerPage.list[0].customerNo);
                        }
                    })
                }).catch(error => {
                this.printErrorAlert(error);
            });
        }
    }

    duplicateCheck = () => {
        customerAction.duplicateCustomerCodeCheck(this.state.checkCustomerCode)
            .then((result) => {
                let data = result?.data;
                this.setState({duplicateCustomerCodeResult: data},
                    () => {
                    if(data.duplicateResult){
                        // alert("사용 가능한 거래처 코드입니다.")
                        Swal.fire({
                            icon: "success",
                            text: "사용 가능한 거래처 코드입니다."
                        });

                    }else{
                        // alert("사용 불가능한 거래처 코드입니다.")
                        Swal.fire({
                            icon: "error",
                            text: "사용이 불가능한 거래처 코드입니다."
                        });
                    }
                    });
            }).catch(error => {
            this.printErrorAlert(error);
        });
    }

    insertCustomer = () => {
        customerAction.regiCustomers(this.state.insertCustomer)
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "거래처 등록",
                    text: "거래처 등록을 완료하였습니다!"
                });
                this.getCustomerList();
            })
            .catch(error => {
                this.printErrorAlert(error);
            });
    }

    updateCustomer = (customerNo: number) => {
        customerAction.updateCustomer(customerNo, this.state.updateCustomer)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "거래처 수정",
                    text: "거래처 수정을 완료하였습니다!"
                });
                this.state.getCustomer(customerNo);
                this.getCustomerList();
            })
            .catch(error => {
                this.printErrorAlert(error);
            });
    }

    getCustomerList = () => {
        customerAction.getCustomerList(this.state.search)
            .then((result) => {
                let data = result?.data;
                this.setState({customerPage: data});
            }).catch(error => {
            this.printErrorAlert(error);
        });
    };

    printErrorAlert = (message : string) => {
        Swal.fire({
            icon: "warning",
            text: message
        });
    }

    render() {
        return (
            <CustomersContext.Provider value={this.state}>
                {this.props.children}
            </CustomersContext.Provider>
        );
    }
}