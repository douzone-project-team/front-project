import React, {Component} from "react";
import DeliveriesAction from "./deliveries-action";
import DeliveryInstructionAction from "../DeliveryInstruction/delivery-instruction-action";
import {
    initialAddDeliveryObj,
    initialDelivery,
    initialDeliveryPageState,
    initialDeliverySearchState,
    initialInstructions
} from "../../state/deliveryStateManagement";
import {AddDeliveryObj, DeliveriesState} from "../../object/Delivery/delivery-object";
import {DeleteDeliveryInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object";

const deliveryAction = new DeliveriesAction;
const deliverInstructionAction = new DeliveryInstructionAction;

export type Props = {
  children?: React.ReactNode;
}

export const DeliveriesContext = React.createContext<DeliveriesState>({
    search: initialDeliverySearchState,
    deliveryPage: initialDeliveryPageState,
    delivery: {
        ...initialDelivery,
        // employeeName: getEmployeeNameFromToken(),
    },
    instructions: initialInstructions,
    addDeliveryObj: initialAddDeliveryObj,
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
    deleteDeliveryInstruction(deleteDeliveryInstruction: DeleteDeliveryInstruction): void {

    }
})

    export class DeliveriesContextProvider extends Component<Props, DeliveriesState> {
    state: DeliveriesState = {
        search: initialDeliverySearchState,
        deliveryPage: initialDeliveryPageState,
        delivery: initialDelivery,
        instructions: initialInstructions,
        addDeliveryObj: initialAddDeliveryObj,
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
                console.log(this.state.search);
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
                    console.log(data);
                    this.setState({delivery: data});
                })
        },
        /* Delivery 껍데기 추가 메서드 */
        addDelivery: (addDeliveryObj: AddDeliveryObj) => {
            deliveryAction.addDelivery(addDeliveryObj)
                .then((result) => {
                    this.setState((prevState) => ({
                        delivery: {
                            ...prevState.delivery,
                            deliveryNo: result?.data.deliveryNo,
                            deliveryDate: addDeliveryObj.deliveryDate,
                            employeeName: '',
                            deliveryStatus: 'INCOMPLETE',
                            instructions: [],
                        }
                    }));
                });
        },
        deleteDeliveryInstruction: (deleteDeliveryInstructionObj: DeleteDeliveryInstruction) => {
            deliverInstructionAction.deleteDeliveryInstruction(deleteDeliveryInstructionObj)
               .then((result) => {
                    deliveryAction.getDelivery(this.state.delivery.deliveryNo)
                        .then((result) => {
                            this.setState({delivery: result?.data})
                        })
                });
        }
    }

    getDeliveryList = () => {
        deliveryAction.getDeliveryList(this.state.search)
          .then((result) => {
                let data = result?.data;
                console.log(data);
                this.setState({deliveryPage: data});
            })
    }

    getDelivery = (deliveryNo: string) => {
        deliveryAction.getDelivery(deliveryNo)
           .then((result) => {
                let data = result?.data;
                console.log(data);
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