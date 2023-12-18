import React, {Component} from "react";
import Layout from "../../common/Layout";
import {Box} from "@material-ui/core";
import SearchEmployeeBar from "../../components/Auth/SearchEmployeeBar";
import ViewEmployeeListTable from "../../components/Auth/ViewEmployeeListTable";
import ViewEmployeeTable from "../../components/Auth/ViewEmployeeTable";
import {Title} from "../../core/Title";
import {Body} from "../../core/Body";
import {SearchBox} from "../../core/box/SearchBox";
import {TableBox} from "../../core/box/TableBox";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";

class ViewEmployees extends Component {
    static contextType = AuthContext

    componentDidMount() {
        const state = this.context as AuthState;
        state.cleanEmployee();
        state.getInitEmployee();
    }

    render() {
        return(
            <Layout>
                <Title title='사원 조회'/>
                <Body>
                    <SearchBox minWidth='1100px'>
                        <SearchEmployeeBar/>
                    </SearchBox>
                    <TableBox minWidth='1100px' minHeight='650px'>
                        <ViewEmployeeListTable/>
                        <ViewEmployeeTable/>
                    </TableBox>
                </Body>
            </Layout>
        );
    }
}

export default ViewEmployees;