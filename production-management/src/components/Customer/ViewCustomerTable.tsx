import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import "./../../assets/css/Table.css";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState} from "../../object/Customer/customer-object";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

class ViewCustomerTable extends Component {
    static contextType = CustomersContext;

    render() {
        const state = this.context as CustomersState;
        const customer = state.customer;

        return (
            <>
          <span className='table-header'>거래처 상세 :
            <span style={{color: '#0C70F2'}}>{state.customer.customerNo}</span>
          </span>
                <TableContainer className='table-container'>
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
                                <TableRow>
                                    <TableCell align="center" style={cellStyle}>{customer.customerNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.ceo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.customerTel}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{customer.sector}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ViewCustomerTable;