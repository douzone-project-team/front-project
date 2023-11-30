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
                    <span style={{fontSize: '17px', fontWeight: 'bold'}}>사원 조회</span>
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
                    <EmployeeSearchBar />
                </Box>
                <Box
                    sx={{
                        width: '95%',
                        height: '65%',
                        p: '15px',
                        ml: '50px',
                        bgcolor: 'white',
                        boxShadow: '0px 0px 5px 1px #DDDDDD',
                        borderRadius: '10px'
                    }}
                >
                    <ViewEmployeeListTable />
                    <ViewEmployeeTable />
                </Box>
            </Layout>
        );
    }
}

export default ViewEmployees;