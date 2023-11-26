import React, {Component} from "react";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";
import EmployeeSearchBar from "../../components/Auth/EmployeeSearchBar";
import ViewEmployeeListTable from "../../components/Auth/ViewEmployeeListTable";
import ViewEmployeeTable from "../../components/Auth/ViewEmployeeTable";

class ViewEmployees extends Component {

    render() {
        return(
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
                    <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>사원 조회</span>
                </Box>
                <Box
                    sx={{
                        width: '95%',
                        p: '15px',
                        ml: '50px',
                        border: '1px solid #D3D3D3'
                    }}
                >
                    <EmployeeSearchBar />
                    <ViewEmployeeListTable />
                </Box>
            </Layout>
        );
    }
}

export default ViewEmployees;