import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import "./../../assets/css/Table.css";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, UpdateCustomer} from "../../object/Customer/customer-object";
import CustomerModifyModal from "../Modal/Customer/CustomerModifyModal";
import {DetailTitle} from "../../core/DetailTitle";
import {DeleteButton} from "../../core/button/DeleteButton";
import {EditButton} from "../../core/button/EditButton";
import Swal from 'sweetalert2';
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";

type State = {
  customerModifyModalOpen: boolean
}

type Props = {}

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light'
}


class ViewCustomerTable extends Component<Props, State> {
  static contextType = CustomersContext;

  constructor(Props: Props) {
    super(Props);
    this.state = {
      customerModifyModalOpen: false
    } as State;
  }

  updateCustomer = (customerNo: number, customerName: string, customerTel: string, ceo: string) => {
    const state = this.context as CustomersState;
    const updateCustomer: UpdateCustomer = {
      customerName,
      customerTel,
      ceo,
    }
    state.setUpdateCustomer(customerNo, updateCustomer);
  }

  handleDeleteClick = (customerNo: number) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 후 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
          const state = this.context as CustomersState;
          state.deleteCustomer(customerNo);
        }});
    };

  render() {
    const state = this.context as CustomersState;
    const customer = state.customer;

    return (
        <>
          <div style={{
            display: 'flex',
            height: '30px',
            marginTop: '20px'
          }}>
            <DetailTitle options={{
              targetName: state.customer.customerNo as unknown as string,
              title: '거래처 상세'
            }}/>
            <div style={{marginLeft: 'auto'}}>
              {state.customer.customerNo !== 0 &&
                  <div>
                    <EditButton size={20}  onClick={() => this.setState({customerModifyModalOpen: true})}/>
                    &nbsp;&nbsp;
                    <DeleteButton size={20}  onClick={() => this.handleDeleteClick(state.customer.customerNo)}/>
                  </div>}
            </div>
          </div>
          <TableContainer className='table-container' style={{height: '73px'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처 명칭</TableCell>
                  <TableCell align="center" style={boldCellStyle}>대표자</TableCell>
                  <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>업종</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.customer.customerNo !== 0? <TableRow>
                  <TableCell align="center" style={tableCellStyle}>{customer.customerNo}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>{customer.customerCode}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>{customer.customerName}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>{customer.ceo}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>{customer.customerTel}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>{customer.sector}</TableCell>
                </TableRow> :
                    <TableRow>
                      <TableCell colSpan={6} style={{border: '0'}}>
                        <NullText/>
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <React.Fragment>
            {this.state.customerModifyModalOpen && state.customer.customerNo !== 0 ? (
                <CustomerModifyModal onClose={() => this.setState({customerModifyModalOpen: false})}
                                     status={this.state.customerModifyModalOpen}
                                     updateCustomer={this.updateCustomer}
                                     customerNo={state.customer.customerNo}/>
            ) : null}
          </React.Fragment>
        </>
    );
  }
}

export default ViewCustomerTable;