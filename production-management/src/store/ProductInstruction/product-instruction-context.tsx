import React, {Component} from "react";
import {
  GetProductInstruction,
  ProductInstructionState
} from "../../object/ProductInstruction/product-instruction-object";
import {initialProductInstruction} from "../../state/productStateManagement";
import ProductInstructionAction from "./product-instruction-action";

const productInstructionAction = new ProductInstructionAction;

export type Props = {
  children?: React.ReactNode;
}

export const ProductInstructionContext = React.createContext<ProductInstructionState>({
  productInstruction: initialProductInstruction,
  getProductInstruction(getProductInstruction: GetProductInstruction): void {
  },
})

class ProductInstructionProvider extends Component<Props, ProductInstructionState> {
  state: ProductInstructionState = {
    productInstruction: initialProductInstruction,
    getProductInstruction: (getProductInstruction: GetProductInstruction) => {
      productInstructionAction.getProductInstruction(getProductInstruction)
      .then((result) => {
        this.setState({productInstruction: result?.data})
      })
    }
  }

  render() {
    return (
        <ProductInstructionContext.Provider value={this.state}>
          {this.props.children}
        </ProductInstructionContext.Provider>
    )
  }
}

export default ProductInstructionProvider;