import {EmployeeContext} from "../../store/Employee/employee-context";
import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const cellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}

const myMap: Map<string, string> = new Map<string, string>([

    ['INCOMPLETE', '미완료'],
    ['COMPLETED', '완료'],
]);


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
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
                    <span style={{fontWeight: 'bold'}}>&nbsp; 나의 최근 출고</span>
                </div>
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
                                    <TableCell align="center" style={cellStyle}>{row.deliveryNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.deliveryDate}</TableCell>
                                    <TableCell align="center" style={{width: '50px', fontFamily: 'S-CoreDream-3Light'}}>
                                        <div className={row.progressStatus}>
                                            {myMap.get(row.progressStatus.toUpperCase())}
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