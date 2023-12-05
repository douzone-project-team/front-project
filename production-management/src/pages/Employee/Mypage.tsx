import React, {Component} from "react";
import ProfileForm from "../../components/Employee/ProfileForm";
import Layout from "../../common/Layout";
import {Box, Grid} from "@material-ui/core";
import ProfileImage from "../../components/Employee/ProfileImage";
import MyInstruction from "../../components/Employee/MyInstruction";
import MyDelivery from "../../components/Employee/MyDelivery";
import Typography from "@material-ui/core/Typography";

class Mypage extends Component {

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
                    <span style={{fontSize: '17px', fontWeight: 'bold'}}>마이 페이지</span>
                </Box>
                <Box>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px',
                    }}
                >
                    <Grid style={{ marginRight: '20px' }}>
                        <ProfileImage/>
                    </Grid>
                    <ProfileForm/>
                </Box>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '30px'
                    }}
                >
                    <MyInstruction />
                    <MyDelivery/>
                </Box>
                </Box>
            </Layout>
        )
    }
}

export default Mypage;