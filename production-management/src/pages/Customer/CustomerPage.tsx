import React, {Component} from 'react';
import CustomerInputBar from '../../components/Customer/CustomerInputBar';
import {Box} from "@material-ui/core";
import ViewCustomerListTable from "../../components/Customer/ViewCustomerListTable";
import ViewCustomerTable from "../../components/Customer/ViewCustomerTable";
import Layout from '../../common/Layout';



class CustomerPage extends Component {

    render () {
        return (
            <Layout>
                <Box
                    sx={{
                      width: '95%',
                      height: '15px',
                      mt: '100px',
                      ml: '50px',
                      pt: '10px',
                      pl: '15px',
                      pb: '30px',
                      border: '1px solid #D3D3D3',
                    }}
                >
                    <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>거래처현황</span>
                </Box>
                <Box
                    sx={{
                      width: '95%',
                      p: '15px',
                      ml: '50px',
                      border: '1px solid #D3D3D3'
                    }}
                >
                <CustomerInputBar/>
                <ViewCustomerListTable/>
                <ViewCustomerTable/>
                </Box>
            </Layout>
        )
    }
}

export default CustomerPage;
