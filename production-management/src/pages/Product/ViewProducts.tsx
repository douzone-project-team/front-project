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
                width: '1250px',
                height: '15px',
                ml: '100px', // 왼쪽 마진
                mt: '50px', // 상단 마진
                pt: '10px',
                p: '15px',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>지시현황</span>
          </Box>
          <Box
              sx={{
                width: '1250px',
                ml: '100px', // 왼쪽 마진
                p: '15px',
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
