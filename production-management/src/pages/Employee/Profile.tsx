import {Component} from "react";
import ProfileForm from "../../components/Employee/ProfileForm";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";

class Profile extends Component {

    render() {
        return (
            <Layout>
                <Box style={{ marginTop: '110px'}}>
                    <ProfileForm />
                </Box>
            </Layout>
        )
    }
}

export default Profile;