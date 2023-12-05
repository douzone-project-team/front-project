import React, {Component} from "react";
import AddEmployee from "../../components/Auth/AddEmployee";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";

class AddEmployees extends Component {

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
                    <span style={{fontSize: '17px', fontWeight: 'bold'}}>사원 등록</span>
                </Box>
                <Box style={{marginTop: '50px'}}>
                    <AddEmployee />
                </Box>
            </Layout>
        )
    }
}

export default AddEmployees;