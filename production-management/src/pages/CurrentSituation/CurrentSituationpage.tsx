import React, { Component } from "react";
import { Box } from "@material-ui/core";
import Layout from "../../common/Layout";
import SemiBox from "../../components/CurrentSituation/SemiBox"; // 경로를 정확하게 수정

class CurrentSituationPage extends Component {
    render() {
        return (
            <Layout>
                <Box
                    sx={{
                        width: '95%',
                        height: '5vh',
                        ml: '50px',
                        mt: '70px',
                        pt: '10px',
                        pl: '15px',
                        pb: '30px',
/*                        border: '1px solid #D3D3D3',
                        bgcolor:'#3C50C2',*/
                    }}
                >
                    <span style={{ fontSize: '17px', fontWeight: 'bold', color:'#FFFFFF' }}>MainPage</span>
                </Box>
                <Box
                    sx={{
                        width: '%',
                        height: '700px',
                        ml: '40px',
/*                        border: '1px solid #D3D3D3',*/
                        bgcolor: 'rgba(211, 211, 211,0.1)',
                    }}
                >
                    <SemiBox />
                </Box>
            </Layout>
        );
    }
}

export default CurrentSituationPage;
