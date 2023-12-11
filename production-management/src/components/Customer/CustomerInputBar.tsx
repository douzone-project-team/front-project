import React, {Component} from 'react';
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, InsertCustomer} from "../../object/Customer/customer-object";
import CustomerAddModal from "../Modal/Customer/CustomerAddModal";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {SearchButton} from '../../core/button/SearchButton';
import { TextInput } from '../../core/input/TextInput';
import { AddItemButton } from '../../core/button/AddItemButton';

type Props = {}

interface SearchState {
  customerCode: string;
  customerName: string;
  sector: string;
  customerAddModalOpen?: boolean;
}

class CustomerInputBar extends Component<Props, SearchState> {
  static contextType = CustomersContext;

  constructor(Props: Props) {
    super(Props);
    this.state = {
      customerAddModalOpen: false,
      customerCode: '',
      customerName: '',
      sector: ''
    };

  }

  insertCustomer = (customerCode: string, customerName: string, customerTel: string, ceo: string, sector: string) => {
    const state = this.context as CustomersState;
    const insertCustomer: InsertCustomer = {
      customerCode,
      customerName,
      customerTel,
      ceo,
      sector
    }
    state.setInsertCustomer(insertCustomer);
  }

  handleSearchClick = () => {
    const state = this.context as CustomersState;
    state.search.page = 1;
    state.setSearch(this.state.customerCode, this.state.customerName, this.state.sector);
  }

  render() {
    return (
        <>
          <BarBox>
            <BarLeftBox width='90%' minWidth='900px'>
              <TextInput title='거래처 코드' onBlur={(e) => {
                this.setState({customerCode : e.target.value});
              }} input={{
                width: '150px'
              }}/>
              <TextInput title='거래처 명칭' onBlur={(e) => {
                this.setState({customerName : e.target.value});
              }} input={{
                width: '150px'
              }}/>
              <TextInput title='업종' onBlur={(e) => {
                this.setState({sector : e.target.value});
              }} input={{
                width: '150px'
              }}/>
            </BarLeftBox>
            <BarRightBox minWidth='50px'>
              <SearchButton
                  size={35} onClick={this.handleSearchClick}
              />
              &nbsp;&nbsp;
              <AddItemButton
                  size={35}
                  onClick={() => this.setState((prevState) => ({customerAddModalOpen: !prevState.customerAddModalOpen}))}
              />
            </BarRightBox>
          </BarBox>
          <React.Fragment>
            {this.state.customerAddModalOpen ? (
                <CustomerAddModal onClose={() => this.setState({customerAddModalOpen: false})}
                                  insertCustomer={this.insertCustomer}
                />
            ) : null}
          </React.Fragment>
        </>
    );
  }
}

export default CustomerInputBar;