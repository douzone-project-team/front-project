import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Layout from "../../common/Layout";
// import SemiBox from "../../components/CurrentSituation/SemiBox"; // 경로를 정확하게 수정

class CurrentSituationPage extends Component {
    render() {
        return (
            <Layout>
                <Box
                    sx={{
                        width: '100%%',
                        height: '90%',
                        ml: '40px',
                        mt:'5.2%',
/*                        border: '1px solid #D3D3D3',*/
                        bgcolor: '#FAF9F7'
                    }}
                >
                    {/*<SemiBox />*/}
                </Box>
            </Layout>
        );
    }
}

export default CurrentSituationPage;
