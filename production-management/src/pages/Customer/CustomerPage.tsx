import React, {Component} from 'react';
import CustomerInputBar from '../../components/Customer/CustomerInputBar';
import ViewCustomerListTable from "../../components/Customer/ViewCustomerListTable";
import ViewCustomerTable from "../../components/Customer/ViewCustomerTable";
import {SearchBox} from '../../core/box/SearchBox';

import Layout from '../../common/Layout';
import {Title} from '../../core/Title';
import {Body} from '../../core/Body';
import { TableBox } from '../../core/box/TableBox';
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState} from "../../object/Customer/customer-object";


class CustomerPage extends Component {
    static contextType = CustomersContext;
    componentDidMount = async () => {
        const state = this.context as CustomersState;
        await state.cleanCustomer();
        state.getInitCustomer();
    }

    render() {
    return (
        <Layout>
          <Title title='거래처 현황'/>
          <Body>
            <SearchBox minWidth='1100px'>
              <CustomerInputBar/>
            </SearchBox>
            <TableBox minWidth='1100px' minHeight='650px'>
              <ViewCustomerListTable/>
              <ViewCustomerTable/>
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default CustomerPage;
