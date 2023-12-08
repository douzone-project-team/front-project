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

class MyInstruction extends Component {
    static contextType = EmployeeContext;

    componentDidMount() {
        const state = this.context as EmployeeState;
        state.myInstruction();
    }

    render() {
        const state = this.context as EmployeeState;
        const list = state.instructionList.list || [];

        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', width: '40%', marginRight: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
                    <span style={{fontWeight: 'bold'}}>&nbsp; 나의 최근 지시</span>
                </div>
                <TableContainer style={{border: '1px solid #ccc', borderRadius: '10px'}}>
                    <Table size='small' style={{backgroundColor: '#FDFDFD'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>진행 상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 && list.map((row) => (
                                <TableRow key={row.instructionNo}>
                                    <TableCell align="center" style={cellStyle}>{row.instructionNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.instructionDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.expirationDate}</TableCell>
                                    <TableCell align="center" style={{width: '50px', fontFamily: 'S-CoreDream-3Light'}}>
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

export default MyInstruction;