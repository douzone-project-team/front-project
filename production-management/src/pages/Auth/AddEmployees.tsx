import React, {Component} from "react";
import AddEmployee from "../../components/Auth/AddEmployee";
import Layout from "../../common/Layout";

class AddEmployees extends Component {

    render() {
        return (
            <Layout>
                <AddEmployee />
            </Layout>
        )
    }
}

export default AddEmployees;