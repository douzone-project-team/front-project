import React, {Component} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import "./../../assets/css/Table.css";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, UpdateCustomer} from "../../object/Customer/customer-object";
import CustomerModifyModal from "../Modal/Customer/CustomerModifyModal";

type State = {
    customerModifyModalOpen: boolean
}

type Props = {

}

const boldCellStyle = {
    backgroundColor: '#f1f3f5',
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

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
        const updateCustomer : UpdateCustomer = {
            customerName,
            customerTel,
            ceo,
        }
        state.setUpdateCustomer(customerNo, updateCustomer);
    }

    handleDeleteClick = (customerNo:number) => {
        if(window.confirm("거래처를 삭제하시겠습니까?")){
            const state = this.context as CustomersState;
            state.deleteCustomer(customerNo);
        } else{
            return;
        }
    }

    render() {
        const state = this.context as CustomersState;
        const customer = state.customer;


        return (
            <>
                <Box
                    sx={{
                        width: '100%',
                        height: '30px',
                        marginBottom: '10px',
                        marginLeft: '2px',
                        display: 'flex',
                    }}
                >
                    <img src={require('./../../images/icon/detail.png')} style={{width: '20px', height: '20px', marginTop: '9px'}}/>
                  <span className='table-header' style={{marginTop:'10px', fontWeight: 'bold'}}>거래처 상세 :
                      {state.customer.customerNo !== 0 && <span style={{color: '#0C70F2'}}>{state.customer.customerNo}</span>}
                  </span>
                    <div style={{ marginLeft: 'auto' }}>
                        {state.customer.customerNo !== 0 &&
                        <img src={require('../../images/button/modify-button.png')}
                             style={{width : '25px', marginRight : '5px'}}
                             onClick={() => this.setState({customerModifyModalOpen: true})}
                        />}
                        <React.Fragment>
                            {this.state.customerModifyModalOpen && state.customer.customerNo !== 0 ? (
                                <CustomerModifyModal onClose={() => this.setState({customerModifyModalOpen: false})}
                                                  status={this.state.customerModifyModalOpen}
                                                  updateCustomer = {this.updateCustomer}
                                                  customerNo = {state.customer.customerNo}/>
                            ) : null}
                        </React.Fragment>

                        {state.customer.customerNo !== 0 &&
                        <img src={require('../../images/button/delete-button.png')}
                             style={{width : '25px', marginRight : '5px'}}
                             onClick={()=>this.handleDeleteClick(state.customer.customerNo)}
                        />}
                    </div>
                </Box>
                <TableContainer className='table-container' style={{height:'74px'}}>
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
                            {state.customer.customerNo !== 0 && <TableRow>
                                    <TableCell align="center" style={cellStyle}>{customer.customerNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.ceo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerTel}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.sector}</TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ViewCustomerTable;