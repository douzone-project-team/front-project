import {EmployeeContext} from "../../store/Employee/employee-context";
import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5'
};

class MyDelivery extends Component {
    static contextType = EmployeeContext;

    render() {
        const state = this.context as EmployeeState;
        const list = state.deliveryList.list || [];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
                    <span>&nbsp; 나의 출고목록</span>
                </div>
                <TableContainer style={{border: '1px solid #ccc', borderRadius: '10px'}}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>출고 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>출고일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>진행 상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">MW2311000001</TableCell>
                                <TableCell align="center">2023-11-29</TableCell>
                                <TableCell align="center">미완료</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">MW2311000001</TableCell>
                                <TableCell align="center">2023-11-29</TableCell>
                                <TableCell align="center">미완료</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">MW2311000001</TableCell>
                                <TableCell align="center">2023-11-29</TableCell>
                                <TableCell align="center">미완료</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">MW2311000001</TableCell>
                                <TableCell align="center">2023-11-29</TableCell>
                                <TableCell align="center">미완료</TableCell>
                            </TableRow>

                            {list && list.length > 0 && list.map((row) => (
                                <TableRow key={row.deliveryNo}>
                                    <TableCell align="center">{row.deliveryNo}</TableCell>
                                    <TableCell align="center">{row.deliveryDate}</TableCell>
                                    <TableCell align="center">{row.progressStatus}</TableCell>
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