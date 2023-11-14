// ProductSearchBar.tsx
import React, {Component} from "react";
import {Box} from "@material-ui/core";
import {ProductsContext, Props} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";

interface SearchState {
  productCode: string;
  productName: string;
}

class ProductSearchBar extends Component<{}, SearchState> {
  static contextType = ProductsContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      productName: '',
      productCode: '',
    }
  }

  handleSearchClick = () => {
    const state = this.context as ProductsState;
    state.setProductCodeAndName(this.state.productCode, this.state.productName);
  };

  render() {
    const state = this.context as ProductsState;

    return (
        <Box
            sx={{
              width: '99%',
              height: '4vh',
              border: '1.4px solid #D3D3D3',
              marginBottom: '1vh',
              marginLeft: '0.5vh'
            }}
        >
          <label>
              <span style={{
                marginLeft: '5vh',
                marginRight: '0.5vh',
                fontSize: '1.5vh',
                fontWeight: 'bold'
              }}>상품 코드</span>
            <input type="text" placeholder="상품 코드"
                   style={{height: '2vh', marginTop: '0.6vh'}}
                   onChange={(e) => {
                     this.setState({productCode: e.target.value})
                   }}
            />
          </label>
          <label>
              <span style={{
                marginLeft: '5vh',
                marginRight: '0.5vh',
                fontSize: '1.5vh',
                fontWeight: 'bold'
              }}>상품 이름</span>
            <input type="text" placeholder="상품 이름"
                   style={{height: '2vh', marginTop: '0.6vh', marginRight: '10vh'}}
                   onChange={(e) => {
                     this.setState({productCode: e.target.value})
                   }}
            />
          </label>
          <button type="submit"
                  style={{height: '2.7vh', marginTop: '0.6vh'}}
                  onClick={this.handleSearchClick}>검색
          </button>
        </Box>
    )
  };
}

export default ProductSearchBar;
