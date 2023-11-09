// ProductSearchBar.tsx
import React, {Component} from "react";
import {Box, Button, Grid, Paper, TextField} from "@material-ui/core";
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
        <Box component={Paper} //elevation={3}
             sx={{
               width: '125vh',
               height: '13vh',
               ml: '10vh',
               mt: '5vh',
               p: 0.5,
               border: '1px solid #2b60de',
               color: '#FFFFFF',
             }}
        >
          <Box sx={{
            pl: '15vh',
            pt: '3vh'
          }}
          >
            <Grid container>
              <TextField
                  id="productCode"
                  label="상품 코드"
                  defaultValue={state.search.productCode}
                  onBlur={(e) => this.setState({productCode: e.target.value})}
              />

              <TextField
                  // sx={{ml: '15vh'}}
                  id="productName"
                  label="상품 이름"
                  defaultValue={state.search.productName}
                  onBlur={(e) => this.setState({productName: e.target.value})}
              />
              <Button variant="outlined" color="primary"
                      // sx={{
                      //   mt: '1vh',
                      //   ml: '15vh',
                      //   color: "#2b60de"
                      // }}
                      onClick={this.handleSearchClick}
              >
                검색
              </Button>
            </Grid>
          </Box>
        </Box>
    )
  };
}

export default ProductSearchBar;
