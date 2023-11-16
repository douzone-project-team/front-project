import React, {Component} from "react";
import ProductAction from "./products-action"
import {ProductsState} from "../../object/Product/product-object";
import {
  initialProduct,
  initialProductPageState,
  initialSearchState
} from "../../state/productStateManagement";

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
  },
  regiProducts(productCode: string, productName: string, standard: string, unit: string): void {
  },
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
    getProduct: async (productNo: number) => {
      try {
        const response = await productAction.getProduct(productNo);
        const data = response?.data;

        if (data) {
          this.setState((prevState) => ({
            product: {
              ...prevState.product,
              productNo: data.productNo,
              productCode: data.productCode,
              productName: data.productName,
              standard: data.standard,
              unit: data.unit,
            },
          }));
        }
      } catch (error) {
        console.error('프로덕트 로딩 에러:', error);
      }
    },
    regiProducts: () => {
      // productAction을 이용하여 제품 등록 요청을 보냅니다.
      productAction.regiProducts(this.state.product.productName,
          this.state.product.productCode, this.state.product.standard, this.state.product.unit)
      .then((result) => {
        // 성공적으로 제품 등록이 완료되면 새로운 제품 목록을 가져와서 상태를 업데이트합니다.
        alert('등록되었습니다');
      })
      .catch((error) => {
        // 제품 등록 중 오류가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        console.error("Error registering product:", error);
      });
    },

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