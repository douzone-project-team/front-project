import {Box} from "@material-ui/core";
import React, {Component} from "react";
import DetailView from "../../components/Product/DetailView";
import Layout from "../../common/Layout";
import ViewTable from "../../components/Product/ViewTable";
import ProductTopBar from "../../components/Product/ProductTopBar";

class ViewProducts extends Component {
  render() {
    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    mt: '60px',
                    mb: '20px',
                    pt: '20px',
                    pl: '15px',
                    pb: '15px',
                    bgcolor: '#3C50C2',
                    color: 'white'
                }}
            >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>품목현황</span>
          </Box>
            <Box
                sx={{
                    width: '95%',
                    pl: '15px',
                    pt: '15px',
                    pr: '15px',
                    pb: '1px',
                    ml: '50px',
                    bgcolor: 'white',
                    boxShadow: '0px 0px 5px 1px #DDDDDD',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}
            >
          <ProductTopBar/>
          </Box>
            <Box
                sx={{
                    width: '95%',
                    pl: '15px',
                    pt: '15px',
                    pr: '15px',
                    pb: '1px',
                    ml: '50px',
                    bgcolor: 'white',
                    boxShadow: '0px 0px 5px 1px #DDDDDD',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}
            >
          <ViewTable/>
          <DetailView/>
            </Box>
        </Layout>
    )
  }
}

export default ViewProducts;
