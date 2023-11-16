import React, {Component} from 'react';
import CustomerInputBar from '../../components/Customer/CustomerInputBar';
import {Box} from "@material-ui/core";
import ViewCustomerListTable from "../../components/Customer/ViewCustomerListTable";
import ViewCustomerTable from "../../components/Customer/ViewCustomerTable";

class CustomerPage extends Component {
    render () {
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
                    <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>거래처현황</span>
                </Box>
                <Box
                    sx={{
                        width: '125vh',
                        ml: '10vh', // 왼쪽 마진
                        p: '1.5vh',
                        border: '1px solid #D3D3D3'
                    }}
                >
                <CustomerInputBar/>
                <ViewCustomerListTable/>
                <ViewCustomerTable/>
                </Box>
            </>
        )
    }
}

export default CustomerPage;
