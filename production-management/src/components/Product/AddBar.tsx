import React, { Component, ChangeEvent } from 'react';
import { Box, Button, TextField, Grid } from '@material-ui/core';
import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";


interface AddInfoProps {
  productName: string;
  productCode: string;
}

interface AddInfoState {
  standard: string;
  unit: string;
}

class AddInfo extends Component<AddInfoProps, AddInfoState> {
  constructor(props: AddInfoProps) {
    super(props);
    this.state = {
      standard: '',
      unit: '',
    };
  }

  onChangeStandard = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ standard: e.target.value });
  };

  onChangeUnit = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ unit: e.target.value });
  };

  static contextType = ProductsContext;

  openRegi = () => {

    console.log('품명:', this.props.productName);
    console.log('제품 코드:', this.props.productCode);
    console.log('규격:', this.state.standard);
    console.log('단위:', this.state.unit);


    const state = this.context as ProductsState;
    state.regiProducts(this.props.productCode,this.props.productName,this.state.standard,this.state.unit);
  };

  render() {
    return (
        <Box border={1} borderRadius={1} style={{ width: '100vh', height: '4vh' }} padding={1} marginLeft={'15vh'} marginTop={1}>
          <Grid container>
            <p style={{ marginTop: '1vh', marginLeft: '8vh' }}>규격</p>
            <TextField
                label="Standard"
                value={this.state.standard}
                onChange={this.onChangeStandard}
                id="rbrur"
                size="small"
                variant="outlined"
                style={{ marginLeft: '1vh' }}
            />
            <p style={{ marginTop: '1vh', marginLeft: '8vh' }}>단위</p>
            <TextField
                label="Unit"
                value={this.state.unit}
                onChange={this.onChangeUnit}
                id="unit"
                size="small"
                variant="outlined"
                style={{ marginLeft: '1vh' }}
            />
            <Button type='button' style={{ backgroundColor: 'lightblue', height: '4vh', marginLeft: '1vh' }} onClick={this.openRegi}>
              제품 등록
            </Button>
          </Grid>
        </Box>
    );
  }
}

export default AddInfo;