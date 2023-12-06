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

class ViewEmployees extends Component {

    render() {
        return(
            <Layout>
                <Title title='사원 등록'/>
                <Body>
                    <SearchBox>
                        <SearchEmployeeBar/>
                    </SearchBox>
                    <TableBox>
                        <ViewEmployeeListTable/>
                        <ViewEmployeeTable/>
                    </TableBox>
                </Body>
            </Layout>
        );
    }
}

export default ViewEmployees;