import React, {Component} from "react";
import {DeliveryInstructionState} from "../../object/DeliveryInstruction/delivery-instruction-object";

export type Props = {
    children?: React.ReactNode;
}

export const DeliveryInstructionContext = React.createContext<DeliveryInstructionState>({})

class DeliveryInstructionContextProvider extends Component<Props, DeliveryInstructionState> {

    render(){
        return (
            <DeliveryInstructionContext.Provider value={this.state}>
                {this.props.children}
            </DeliveryInstructionContext.Provider>
        )
    }

}

export default DeliveryInstructionContextProvider;
