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
                <DetailTitle options={{title : '나의 지시목록'}}/>
                <br/>
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
                                <TableCell align="center" style={tableCellStyle}>{row.instructionNo}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{row.instructionDate}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{row.expirationDate}</TableCell>
                                <TableCell align="center" style={{...tableCellStyle,width: '50px'}}>
                                    <div className={row.progressStatus}>
                                        {/*{row.progressStatus}*/}
                                        진행
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