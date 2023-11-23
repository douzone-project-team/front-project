import {Box} from "@material-ui/core";
import React, {Component} from "react";
import DetailView from "../../components/Product/DetailView";
import ProductSearchBar from "../../components/Product/ProductSearchBar";
import Layout from "../../common/Layout";
import ViewTable from "../../components/Product/ViewTable";

class ViewProducts extends Component {
  render() {
    return (
        <Layout>
          <Box
              sx={{
                width: '95%',
                height: '5vh',
                ml: '50px',
                mt: '10vh',
                pt: '1vh',
                pl: '15px',
                pb: '30px',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>상품현황</span>
          </Box>
          <Box
              sx={{
                width: '95%',
                height: '78vh',
                ml: '50px',
                p: '15px',
                border: '1px solid #D3D3D3'
              }}
          >
          <ProductSearchBar/>
          <ViewTable/>
          <DetailView/>
          </Box>
        </Layout>
    )
  }
}

export default ViewProducts;
