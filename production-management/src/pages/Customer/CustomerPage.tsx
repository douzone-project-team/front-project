import React, {Component} from 'react';
import CustomerInputBar from '../../components/Customer/CustomerInputBar';
import {Box} from "@material-ui/core";
import ViewCustomerListTable from "../../components/Customer/ViewCustomerListTable";
import ViewCustomerTable from "../../components/Customer/ViewCustomerTable";
import {SearchBox} from '../../core/box/SearchBox';

import Layout from '../../common/Layout';
import {Title} from '../../core/Title';
import {Body} from '../../core/Body';
import { TableBox } from '../../core/box/TableBox';


class CustomerPage extends Component {

  render() {
    return (
        <Layout>
          <Title title='거래처 현황'/>
          <Body>
            <SearchBox>
              <CustomerInputBar/>
            </SearchBox>
            <TableBox>
              <ViewCustomerListTable/>
              <ViewCustomerTable/>
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default CustomerPage;
