import {EmployeeContext} from "../../store/Employee/employee-context";
import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {DetailTitle} from "../../core/DetailTitle";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}

class MyDelivery extends Component {
    static contextType = EmployeeContext;

    componentDidMount() {
        const state = this.context as EmployeeState;
        state.myDelivery();
    }

    render() {
        const state = this.context as EmployeeState;
        const list = state.deliveryList.list || [];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                <DetailTitle options={{title : '나의 출고목록'}}/>
                <br/>
                <TableContainer style={{border: '1px solid #ccc', borderRadius: '10px'}}>
                    <Table size='small' style={{backgroundColor: '#FDFDFD'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>출고 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>출고일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>진행 상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 && list.map((row) => (
                                <TableRow key={row.deliveryNo}>
                                    <TableCell align="center" style={tableCellStyle}>{row.deliveryNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.deliveryDate}</TableCell>
                                    <TableCell align="center" style={{...tableCellStyle,width: '50px'}}>
                                        <div className={row.progressStatus}>
                                            {row.progressStatus}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default MyDelivery;