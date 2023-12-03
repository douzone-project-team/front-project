import React, {Component} from 'react';
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, InsertCustomer} from "../../object/Customer/customer-object";
import CustomerAddModal from "../Modal/Customer/CustomerAddModal";
import {BarBox} from '../../core/BarBox';
import {SearchButton} from '../../core/button/SearchButton';
import {AddButton} from '../../core/button/AddButton';
import { TextInput } from '../../core/input/TextInput';

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
    state.setSearch(inputValue.customerCode, inputValue.customerName, inputValue.sector);
  }

  render() {
    return (
        <>
          <BarBox>
            <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
              <TextInput title='거래처 코드' onBlur={(e) => {
                inputValue.customerCode = e.target.value
              }} input={{width:'100px'}}/>
              <TextInput title='거래처 명칭' onBlur={(e) => {
                inputValue.customerName = e.target.value
              }}/>
              <TextInput title='업종' onBlur={(e) => {
                inputValue.sector = e.target.value
              }}/>
            </div>
            <div style={{marginTop: '6px', marginRight: '7px'}}>
              <SearchButton
                  size={30} onClick={this.handleSearchClick}
              />
              &nbsp;&nbsp;
              <AddButton
                  size={30}
                  onClick={() => this.setState((prevState) => ({customerAddModalOpen: !prevState.customerAddModalOpen}))}
              />
            </div>
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