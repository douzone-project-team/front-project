import React, {Component} from 'react';
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, InsertCustomer} from "../../object/Customer/customer-object";
import CustomerAddModal from "../Modal/Customer/CustomerAddModal";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {SearchButton} from '../../core/button/SearchButton';
import { TextInput } from '../../core/input/TextInput';
import { AddItemButton } from '../../core/button/AddItemButton';

type State = {
  customerAddModalOpen: boolean
}

type Props = {}

let inputValue = {
  customerCode: '',
  customerName: '',
  sector: ''
}

class CustomerInputBar extends Component<Props, State> {
  static contextType = CustomersContext;

  constructor(Props: Props) {
    super(Props);
    this.state = {
      customerAddModalOpen: false
    } as State;
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
    state.setSearch(inputValue.customerCode, inputValue.customerName, inputValue.sector);
  }

  render() {
    return (
        <>
          <BarBox>
            <BarLeftBox width='70vw'>
              <TextInput title='거래처 코드' onBlur={(e) => {
                inputValue.customerCode = e.target.value
              }} input={{width:'100px'}}/>
              <TextInput title='거래처 명칭' onBlur={(e) => {
                inputValue.customerName = e.target.value
              }}/>
              <TextInput title='업종' onBlur={(e) => {
                inputValue.sector = e.target.value
              }}/>
            </BarLeftBox>
            <BarRightBox>
              <SearchButton
                  size={30} onClick={this.handleSearchClick}
              />
              &nbsp;&nbsp;
              <AddItemButton
                  size={30}
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