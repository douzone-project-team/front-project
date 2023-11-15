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
              width: '770x',
              height: '40px',
              border: '1.4px solid #D3D3D3',
              marginBottom: '10px',
            }}
        >
          <label>
              <span style={{
                marginLeft: '50px',
                marginRight: '5px',
                fontSize: '15px',
                fontWeight: 'bold'
              }}>상품 코드</span>
            <input type="text" placeholder="상품 코드"
                   style={{height: '20px', marginTop: '6px'}}
                   onChange={(e) => {
                     this.setState({productCode: e.target.value})
                   }}
            />
          </label>
          <label>
              <span style={{
                marginLeft: '50px',
                marginRight: '5px',
                fontSize: '15px',
                fontWeight: 'bold'
              }}>상품 이름</span>
            <input type="text" placeholder="상품 이름"
                   style={{height: '20px', marginTop: '6px', marginRight: '100px'}}
                   onChange={(e) => {
                     this.setState({productName: e.target.value})
                   }}
            />
          </label>
          <button type="submit"
                  style={{height: '27px', marginTop: '6px'}}
                  onClick={this.handleSearchClick}>검색
          </button>
        </Box>
    )
  };
}

export default ProductSearchBar;
