import {EmployeeContext} from "../../store/Employee/employee-context";
import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5'
};

class MyInstruction extends Component {
    static contextType = EmployeeContext;

    render() {
        const state = this.context as EmployeeState;
        const list = state.instructionList.list || [];

        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', width: '40%', marginRight: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
                    <span>&nbsp; 나의 지시목록</span>
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
                        <TableRow>
                            <TableCell align="center">WO2311000001</TableCell>
                            <TableCell align="center">2023-10-22</TableCell>
                            <TableCell align="center">2023-11-21</TableCell>
                            <TableCell align="center" style={{width: '50px'}}>
                                <div className='PROGRESS'>
                                    PROGRESS
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">WO2311000001</TableCell>
                            <TableCell align="center">2023-10-22</TableCell>
                            <TableCell align="center">2023-11-21</TableCell>
                            <TableCell align="center" style={{width: '50px'}}>
                                <div className='STANDBY'>
                                    STANDBY
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">WO2311000001</TableCell>
                            <TableCell align="center">2023-10-22</TableCell>
                            <TableCell align="center">2023-11-21</TableCell>
                            <TableCell align="center" style={{width: '50px'}}>
                                <div className='COMPLETED'>
                                    COMPLETED
                                </div>
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell align="center">WO2311000001</TableCell>
                            <TableCell align="center">2023-10-22</TableCell>
                            <TableCell align="center">2023-11-21</TableCell>
                            <TableCell align="center" style={{width: '50px'}}>
                                <div className='PROGRESS'>
                                    PROGRESS
                                </div>
                            </TableCell>
                        </TableRow>

                        {list && list.length > 0 && list.map((row) => (
                            <TableRow key={row.instructionNo}>
                                <TableCell align="center">{row.instructionNo}</TableCell>
                                <TableCell align="center">{row.instructionDate}</TableCell>
                                <TableCell align="center">{row.expirationDate}</TableCell>
                                <TableCell align="center" style={{width: '50px'}}>
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