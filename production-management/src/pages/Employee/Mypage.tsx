import React, {Component} from "react";
import ProfileForm from "../../components/Employee/ProfileForm";
import Layout from "../../common/Layout";
import {Box, Grid} from "@material-ui/core";
import ProfileImage from "../../components/Employee/ProfileImage";
import MyInstruction from "../../components/Employee/MyInstruction";
import MyDelivery from "../../components/Employee/MyDelivery";
import {Title} from "../../core/Title";

class Mypage extends Component {
  
  render() {
    return (
        <Layout>
          <Title title='마이 페이지'/>
          <Box>
            <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '40px',
                }}
            >
              <Grid style={{ marginRight: '40px' }}>
                <ProfileImage/>
              </Grid>
              <ProfileForm/>
            </Box>
            <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px'
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