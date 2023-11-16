import {Component} from "react";

import "../../assets/css/Table.css";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

class ViewDeliveryTable extends Component{
    static contextType = DeliveriesContext;

    render() {
        const state = this.context as DeliveriesState;
        const list = state.delivery.instructions;

        return (
            <>
          <span className='table-header'>출고 상세 :
            <span style={{color: '#0C70F2'}}>{state.delivery.deliveryNo}</span>
          </span>
                <TableContainer className='table-container'>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>담당자</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row) => (
                                <TableRow>
                                    <TableCell align="center" style={cellStyle}>{row.instructionNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.employeeName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.instructionDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.expirationDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryTable;