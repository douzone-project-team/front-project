import {Box} from "@material-ui/core";
import React, {Component} from "react";
import ViewProductListTable from "../../components/Product/ViewProductListTable";
import ProductSearchBar from "../../components/Product/ProductSearchBar";

class ViewProducts extends Component {
  render() {
    return (
        <>
          <Box
              sx={{
                width: '125vh',
                height: '1.5vh',
                ml: '10vh', // 왼쪽 마진
                mt: '5vh', // 상단 마진
                pt: '1vh',
                p: '1.5vh',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>지시현황</span>
          </Box>
          <Box
              sx={{
                width: '125vh',
                ml: '10vh', // 왼쪽 마진
                p: '1.5vh',
                border: '1px solid #D3D3D3'
              }}
          >
          <ProductSearchBar/>
          {/*<ViewProductListTable/>*/}
          </Box>
        </>
    )
  }
}

export default ViewProducts;
