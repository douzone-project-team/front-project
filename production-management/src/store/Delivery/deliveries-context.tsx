import React, {Component} from "react";
import DeliveriesAction from "./deliveries-action";
import DeliveryInstructionAction from "../DeliveryInstruction/delivery-instruction-action";
import {
    initialAddDeliveryObj,
    initialDelivery,
    initialDeliveryPageState,
    initialDeliverySearchState,
    initialInstructions,
    initialNewDelivery, initialRemainAmount,
} from "../../state/deliveryStateManagement";
import {AddDeliveryObj, DeliveriesState, UpdateDelivery} from "../../object/Delivery/delivery-object";
import {
    AddDeliveryInstruction,
    DeleteDeliveryInstruction, UpdateDeliveryInstruction,
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import Swal from "sweetalert2";

const deliveryAction = new DeliveriesAction;
const deliveryInstructionAction = new DeliveryInstructionAction;

export type Props = {
    children?: React.ReactNode;
}

export const DeliveriesContext = React.createContext<DeliveriesState>({
    search: initialDeliverySearchState,
    deliveryPage: initialDeliveryPageState,
    delivery: initialDelivery,
    newDelivery: initialNewDelivery,
    instructions: initialInstructions,
    remainAmount: initialRemainAmount,
    addDeliveryObj: initialAddDeliveryObj,
    cleanDelivery(): void {
    },
    setSearch(employeeName: string, startDate: string, endDate: string): void {
    },
    setSearchProgressStatus(progressStatus: string): void {
    },
    setPage(page: number): void {
    },
    getDeliveryList(): void {
    },
    getDelivery(deliveryNo: string): void {
    },
    getRemainAmount(instructionNo: string, productNo: number) {
    },
    addDelivery(addDeliveryObj: AddDeliveryObj): void {
    },
    addDeliveryInstruction(deliveryNo: string, addDeliveryInstruction: AddDeliveryInstruction): void {
    },
    deleteDeliveryInstruction(deleteDeliveryInstruction: DeleteDeliveryInstruction): void {
    },
    deleteDelivery(deliveryNo: string): void {
    },
    updateDelivery(updateDelivery: UpdateDelivery): void {
    },
    updateDeliveryStatus(deliveryNo: string): void {
    },
    updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction): void {
    },
    getInitDelivery(): void {
    }
})

export class DeliveriesContextProvider extends Component<Props, DeliveriesState> {
    state: DeliveriesState = {
        search: initialDeliverySearchState,
        deliveryPage: initialDeliveryPageState,
        delivery: initialDelivery,
        instructions: initialInstructions,
        remainAmount: initialRemainAmount,
        addDeliveryObj: initialAddDeliveryObj,
        newDelivery: initialNewDelivery,

        cleanDelivery: () => {
            this.setState({
                delivery: initialDelivery, newDelivery: initialNewDelivery,
                deliveryPage: initialDeliveryPageState
            })
        },

        /* Delivery 조회 메서드  */
        setSearch: (employeeName: string, startDate: string, endDate: string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    employeeName: employeeName,
                    startDate: startDate,
                    endDate: endDate,
                },
            }), () => {
                this.getDeliveryList();
            })
        },

        setSearchProgressStatus: (progressStatus: string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    progressStatus: progressStatus,
                },
            }), () => {
                this.getDeliveryList();
            })
        },

        setPage: (page: number) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    page: page,
                },
            }), () => {
                this.getDeliveryList();
            })
        },

        getDeliveryList: () => {
            this.getDeliveryList();
        },

        getDelivery: (deliveryNo: string) => {
            deliveryAction.getDelivery(deliveryNo)
                .then((result) => {
                    let data = result?.data;
                    this.setState({delivery: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        getRemainAmount: (instructionNo: string, productNo: number) => {
            deliveryAction.getRemainAmount(instructionNo, productNo)
                .then((result) => {
                    let data = result?.data;
                    this.setState({remainAmount: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        /* Delivery 껍데기 추가 메서드 */
        addDelivery: (addDeliveryObj: AddDeliveryObj) => {
            deliveryAction.addDelivery(addDeliveryObj)
                .then((result) => {
                    this.setState((prevState) => ({
                        newDelivery: {
                            ...prevState.newDelivery,
                            deliveryNo: result?.data.deliveryNo,
                            deliveryDate: addDeliveryObj.deliveryDate
                        }
                    }), () => {
                        Swal.fire({
                            icon: "success",
                            text: "출고를 추가하였습니다.",
                        });
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        updateDelivery: (updateDelivery: UpdateDelivery) => {
            deliveryAction.updateDelivery(updateDelivery)
                .then((result) => {
                    this.setState((prevState) => ({
                        newDelivery: {
                            ...prevState.newDelivery,
                            deliveryDate: '',
                        }
                    }), () => {
                        this.getDelivery(updateDelivery.deliveryNo);
                        this.getDeliveryList();
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        updateDeliveryStatus: (deliveryNo: string) => {
            deliveryAction.updateDeliveryStatus(deliveryNo)
                .then((result) => {
                    this.setState((prevState) => ({
                        delivery: {
                            ...prevState.delivery,
                            deliveryStatus: 'COMPLETED',
                        },
                    }), () => {
                        this.getDelivery(deliveryNo);
                        this.getDeliveryList();
                        Swal.fire({
                            icon: "success",
                            text: "출고의 상태가 완료 처리 되었습니다.",
                            showConfirmButton: false,
                            timer: 1000
                        })
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        // 출고 껍데기에 지시 먼저 등록하기
        addDeliveryInstruction: (deliveryNo, addDeliveryInstruction: AddDeliveryInstruction) => {
            const isDuplicate = this.state.delivery.instructions.some(existingInstruction => {
                return existingInstruction.instructionNo === addDeliveryInstruction.instructionNo &&
                    existingInstruction.productNo === addDeliveryInstruction.products[0].productNo;
            });

            if (isDuplicate) {
                Swal.fire({
                    icon: 'warning',
                    text: "이미 존재하는 상품입니다.",
                });
                return;
            }

            deliveryInstructionAction.addDeliveryInstruction(deliveryNo, addDeliveryInstruction)
                .then((result) => {
                    const {instructionNo} = addDeliveryInstruction;
                    this.setState((prevState) => ({
                        newDelivery: {
                            ...prevState.newDelivery,
                            instructionNo: instructionNo,
                        },
                    }), () => {
                        this.getDelivery(deliveryNo);
                        this.getDeliveryList();
                        Swal.fire({
                            icon: "success",
                            text: "출고에 새로운 품목이 추가되었습니다.",
                            showConfirmButton: false,
                            timer: 1000
                        })
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        deleteDeliveryInstruction: (deleteDeliveryInstructionObj: DeleteDeliveryInstruction) => {
            deliveryInstructionAction.deleteDeliveryInstruction(deleteDeliveryInstructionObj)
                .then((result) => {
                    deliveryAction.getDelivery(this.state.delivery.deliveryNo)
                        .then((result) => {
                            this.setState({delivery: result?.data}, () => {
                                this.getDeliveryList();
                            })
                        })
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        deleteDelivery: (deliveryNo: string) => {
            deliveryAction.deleteDelivery(deliveryNo)
                .then((result) => {
                    this.setState({delivery: initialDelivery}, () => {
                        Swal.fire({
                            icon: "success",
                            text: "출고가 삭제되었습니다.",
                        });
                    })
                    this.getDeliveryList();
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction) {
            deliveryInstructionAction.updateDeliveryInstruction(updateDeliveryInstruction)
                .then(() => {
                    this.getDelivery(updateDeliveryInstruction.deliveryNo);
                    this.getRemainAmount(updateDeliveryInstruction.instructionNo, updateDeliveryInstruction.productNo);
                }).catch((error) => {
                Swal.fire({
                    icon: "warning",
                    text: error
                });
            })
        },

        getInitDelivery: async () => {
            deliveryAction.getDeliveryList(this.state.search)
                .then((result) => {
                    this.setState({deliveryPage: result?.data}, () => {
                        if(this.state.deliveryPage.list.length) {
                            this.getDelivery(this.state.deliveryPage.list[0].deliveryNo);
                        }
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        }
    }

    getDeliveryList = () => {
        deliveryAction.getDeliveryList(this.state.search)
            .then((result) => {
                this.setState({deliveryPage: result?.data});
            }).catch((error) => {
            this.printErrorAlert(error);
        })
    };

    getDelivery = (deliveryNo: string) => {
        deliveryAction.getDelivery(deliveryNo)
            .then((result) => {
                this.setState({delivery: result?.data});
            }).catch((error) => {
            this.printErrorAlert(error);
        })
    };

    printErrorAlert = (message: string) => {
        Swal.fire({
            icon: "warning",
            text: message
        });
    }

    render() {
        return (
            <DeliveriesContext.Provider value={this.state}>
                {this.props.children}
            </DeliveriesContext.Provider>
        )
    }
}