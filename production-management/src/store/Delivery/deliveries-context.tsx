import React, {Component} from "react";
import DeliveriesAction from "./deliveries-action";
import DeliveryInstructionAction from "../DeliveryInstruction/delivery-instruction-action";
import {
    initialAddDeliveryObj,
    initialDelivery,
    initialDeliveryPageState,
    initialDeliverySearchState,
    initialInstructions,
    initialNewDelivery
} from "../../state/deliveryStateManagement";
import {AddDeliveryObj, DeliveriesState, UpdateDelivery} from "../../object/Delivery/delivery-object";
import {
    AddDeliveryInstruction,
    DeleteDeliveryInstruction, UpdateDeliveryInstruction,
} from "../../object/DeliveryInstruction/delivery-instruction-object";

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
    addDeliveryObj: initialAddDeliveryObj,
    cleanDelivery(): void{
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
    addDelivery(addDeliveryObj: AddDeliveryObj): void {
    },
    addDeliveryInstruction(deliveryNo: string, addDeliveryInstruction: AddDeliveryInstruction): void {
    },
    deleteDeliveryInstruction(deleteDeliveryInstruction: DeleteDeliveryInstruction): void {
    },
    deleteDelivery(deliveryNo: string): void{
    },
    updateDelivery(updateDelivery: UpdateDelivery): void {
    },
    updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction): void {
    },
})

    export class DeliveriesContextProvider extends Component<Props, DeliveriesState> {
    state: DeliveriesState = {
        search: initialDeliverySearchState,
        deliveryPage: initialDeliveryPageState,
        delivery: initialDelivery,
        instructions: initialInstructions,
        addDeliveryObj: initialAddDeliveryObj,
        newDelivery: initialNewDelivery,
        cleanDelivery: () => {
            this.setState({delivery: initialDelivery})
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
                console.log("검색 조건 : " + this.state.search.startDate);
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
                console.log(this.state.search);
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
                console.log(this.state.search);
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
                    console.log('getDelivery: ' + data);
                    this.setState({delivery: data});
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
                    }));
                });
        },

        updateDelivery: (updateDelivery: UpdateDelivery) => {
            deliveryAction.updateDelivery(updateDelivery).then((result) => {
                this.getDelivery(updateDelivery.deliveryNo);
            })
        },

        // 출고 껍데기에 지시 먼저 등록하기
        addDeliveryInstruction: (deliveryNo, addDeliveryInstruction: AddDeliveryInstruction)=> {
            deliveryInstructionAction.addDeliveryInstruction(deliveryNo, addDeliveryInstruction)
                .then((result) => {
                    const { instructionNo } = addDeliveryInstruction;

                    this.setState((prevState) => ({
                        newDelivery: {
                            ...prevState.newDelivery,
                            instructionNo: instructionNo,
                        },
                    }));
                });
        },

        deleteDeliveryInstruction: (deleteDeliveryInstructionObj: DeleteDeliveryInstruction) => {
            deliveryInstructionAction.deleteDeliveryInstruction(deleteDeliveryInstructionObj)
               .then((result) => {
                    deliveryAction.getDelivery(this.state.delivery.deliveryNo)
                        .then((result) => {
                            this.setState({delivery: result?.data})
                        })
                });
        },

        deleteDelivery: (deliveryNo: string) => {
            deliveryAction.deleteDelivery(deliveryNo)
                .then((result) => {
                    this.getDeliveryList();
                    this.setState({delivery: initialDelivery})
                })
        },

        updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction) {
            deliveryInstructionAction.updateDeliveryInstruction(updateDeliveryInstruction)
                .then(() => {
                    this.getDelivery(updateDeliveryInstruction.deliveryNo);
                })
        }
    }

    getDeliveryList = () => {
        deliveryAction.getDeliveryList(this.state.search)
          .then((result) => {
                let data = result?.data;
                console.log(data);
                this.setState({deliveryPage: data});
            })
    };

    getDelivery = (deliveryNo: string) => {
        deliveryAction.getDelivery(deliveryNo)
            .then((result) => {
                let data = result?.data;
                this.setState({delivery: data});
            })
    }

    render(){
        return(
            <DeliveriesContext.Provider value={this.state}>
                {this.props.children}
            </DeliveriesContext.Provider>
        )
    }
}