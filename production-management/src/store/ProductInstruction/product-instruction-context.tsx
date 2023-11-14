import React, {Component} from "react";
import {ProductInstructionState} from "../../object/ProductInstruction/product-instruction-object";

export type Props = {
  children?: React.ReactNode;
}

export const ProductInstructionContext = React.createContext<ProductInstructionState>({})

class ProductInstructionProvider extends Component<Props, ProductInstructionState> {

  render() {
    return (
        <ProductInstructionContext.Provider value={this.state}>
          {this.props.children}
        </ProductInstructionContext.Provider>
    )
  }
}

export default ProductInstructionProvider;