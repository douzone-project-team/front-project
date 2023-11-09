import React, {Component} from "react";
import ProductAction from "./products-action"
import {ProductsState} from "../../object/Product/product-object";
import {initialProduct, initialProductPageState, initialSearchState} from "../../state/productStateManagement";

const productAction = new ProductAction;

export type Props = {
  children?: React.ReactNode;
}

export const ProductsContext = React.createContext<ProductsState>({
  search: initialSearchState,
  productPage: initialProductPageState,
  product: initialProduct,
  setProductCodeAndName(): void {
  },
  setPage(page: number): void {
  },
  getProductList(): void {
  },
  getProduct(productNo: number): void {
  }
});


export class ProductsContextProvider extends Component<Props, ProductsState> {
  state: ProductsState = {
    search: initialSearchState,
    productPage: initialProductPageState,
    product: initialProduct,
    setProductCodeAndName: (productCode: string, productName: string) => {
      this.setState((prevState) => ({
            search: {
              ...prevState.search,
              productCode: productCode,
              productName: productName,
            },
          }), () => {
            this.getProductList();
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
            this.getProductList();
          }
      );
    },
    getProductList: () => {
      this.getProductList();
    },
    getProduct: (productNo: number) => {
      productAction.getProduct(productNo)
      .then(result => {
        let data = result?.data;
        console.log(data);
      })
    }
  }

  // getProduct = (productNo: number) => {
  //   productAction.getProduct(productNo)
  //   .then(result => {
  //     let data = result?.data;
  //     console.log(data);
  //   })
  // };

  getProductList = () => {
    productAction.getProductList(this.state.search)
    .then((result) => {
      let data = result?.data;
      this.setState({productPage: data});
    })
  };

  render() {
    return (
        <ProductsContext.Provider value={this.state}>
          {this.props.children}
        </ProductsContext.Provider>
    );
  }
}