import {Component} from "react";
import ProfileForm from "../../components/Employee/ProfileForm";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";
import ProfileImage from "../../components/Employee/ProfileImage";

class Mypage extends Component {

    render() {
        return (
            <Layout>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '110px',
                    }}
                >
                    <ProfileImage />
                    <ProfileForm />
                </Box>
            </Layout>
        )
    }
}

export default Mypage;