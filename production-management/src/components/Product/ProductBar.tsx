// ProductBar.tsx
import React, { Component, ChangeEvent } from 'react';
import { Box, Button, TextField, Container, Grid } from '@material-ui/core';
import AddInfo from './AddBar';  // AddInfo 파일의 경로에 맞게 수정
import ViewTable from './ViewTable';
import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";


interface ProductBarState {
  productCode: string;
  standard: string;
  unit: number;
  visible: boolean;
  productName: string;
}

class ProductBar extends Component<{}, ProductBarState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      productCode: '',
      standard: '',
      unit: 0,
      visible: false,
      productName: '',
    };
  }
  handleShow = () => {
    this.setState({ visible: !this.state.visible });
  };



  onChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ productName: e.target.value });
  };

  onChangeProductCode = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ productCode: e.target.value });
  };


  static contextType = ProductsContext;

  searchProducts= ()=>{

    const state = this.context as ProductsState;
    state.setProductCodeAndName(this.state.productCode,this.state.productName);
  }

  render() {
    return (
        <Container component="main" maxWidth="md" style={{ marginLeft: '3vh', marginTop: '10vh' }}>
          <Box border={1} style={{ width: '1000px', height: '40px' }} padding={1} marginLeft={'150px'}>
            <Grid>
              <Box width="100%" height="5vh">
                <Grid container>
                  <p style={{ marginTop: '10px', marginLeft: '8vh' }}>품명</p>
                  <input
                      value={this.state.productCode}
                      onChange={this.onChangeProductCode}
                      style={{ marginLeft: '10px',marginTop:'10px', width:'100px', height:'15px',borderRadius: '0', border:'1', borderBlockColor:'bluey' }}
                  />
                  <p style={{ marginTop: '1vh', marginLeft: '8vh' }}>제품 코드</p>
                  <input
                      value={this.state.productName}
                      onChange={this.onChangeProductName}
                      style={{ marginLeft: '1vh' }}
                  />
                  <Button style={{ backgroundColor: 'lightblue', height: '4vh', marginLeft: '1vh' }} onClick={this.searchProducts}>
                    검색
                  </Button>
                  <Button style={{ backgroundColor: 'lightblue', height: '4vh', marginLeft: '1vh' }} onClick={this.handleShow}>
                    {this.state.visible ? '취소' : '제품 등록'}
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Box>
          {this.state.visible && <AddInfo productName={this.state.productName} productCode={this.state.productCode} />
          }
        </Container>
    );
  }
}

export default ProductBar;