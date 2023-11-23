import React, {Component} from "react";
import {Box} from "@material-ui/core";
import {ProductsContext, Props} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";

interface SearchState {
  productCode: string;
  productName: string;
  isModalOpen?: boolean;
}

class ProductSearchBar extends Component<{}, SearchState> {
  static contextType = ProductsContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      productName: "",
      productCode: "",
    };
  }

  handleSearchClick = () => {
    const state = this.context as ProductsState;
    state.setProductCodeAndName(this.state.productCode, this.state.productName);
  };

  handleAddClick = () => {
    console.log(`모달 클릭됨`);
    this.setState({
      isModalOpen: true,
    });
  };

  render() {
    return (
        <Box
            sx={{
              width: '100%',
              height: '40px',
              border: '1.4px solid #D3D3D3',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
        >
          <div style={{width: '80%', marginBottom: '7px', marginTop: '7px'}}>
            <label>
              <span style={{
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>상품 코드</span>
              <input type="text" placeholder="상품 코드"
                     style={{height: '20px'}}
                     onChange={(e) => {
                       this.setState({productCode: e.target.value})
                     }}/>
            </label>
            <label>
              <span style={{
                marginLeft: '10px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>상품 이름</span>
              <input type="text" placeholder="상품 이름"
                     style={{height: '20px'}}
                     onChange={(e) => {
                       this.setState({productName: e.target.value})
                     }}
              />
            </label>

          </div>
          <div style={{width: '20%', marginTop: '7px', marginBottom: '7px'}}>
            <button type="submit"
                    style={{
                      height: '25px',
                      marginRight: '10px'
                    }}
                    onClick={this.handleSearchClick}>검색
            </button>
          </div>
        </Box>
    )
  };
}

export default ProductSearchBar;
