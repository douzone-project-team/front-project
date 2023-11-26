import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {AuthState, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import EmployeeModifyModal from "../Modal/Employee/EmployeeModifyModal";
import {EmployeeContext} from "../../store/Employee/employee-context";

type State = {
    employeeModifyModalOpen: boolean
}

type Props = {

}

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

class ViewEmployeeTable extends Component<Props, State> {
    static contextType = EmployeeContext;

    handleDeleteClick = (employeeNo: number) => {
        const authState = this.context as AuthState;
        authState.deleteEmployee(employeeNo);
    }

    constructor(Props: Props) {
        super(Props);
        this.state = {
            employeeModifyModalOpen: false
        } as State;
    }

    updateEmployee = (employeeNo: number, id: string, password: string, name: string,
                      role: string, tel: string, email: string) => {
        const authState = this.context as AuthState;
        const updateAuthEmployee: UpdateAuthEmployee = {
            employeeNo: employeeNo,
            id: id,
            password: password,
            name: name,
            role: role,
            tel: tel,
            email: email
        }
        authState.updateEmployee(employeeNo, updateAuthEmployee);
    }

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        return(
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
                    <span className='table-header' style={{marginTop:'10px'}}>사원 상세 :
                        {state.employee.employeeNo !== 0 &&
                            <span style={{color: '#0C70F2'}}>{state.employee.employeeNo}</span>}
                    </span>
                    <div style={{ marginLeft: 'auto' }}>
                        {state.employee.employeeNo !== 0 &&
                            <button className='employeeBtn'
                                    style={{ marginRight: '10px', marginTop: '5px'}}
                                    onClick={() => this.setState({employeeModifyModalOpen: true})}>
                            수정
                        </button>}
                        <React.Fragment>
                            {this.state.employeeModifyModalOpen && state.employee.employeeNo !== 0 ? (
                                <EmployeeModifyModal onClose={() => this.setState({employeeModifyModalOpen: false})}
                                                     status={this.state.employeeModifyModalOpen}
                                                     updateEmployee = {this.updateEmployee}
                                                     employeeNo = {state.employee.employeeNo}/>
                            ) : null}
                        </React.Fragment>

                        {state.employee.employeeNo !== 0 &&
                            <button className='employeeBtn'
                                    type="submit"
                                    style={{ marginRight: '3px' }}
                                    onClick={()=>this.handleDeleteClick(state.employee.employeeNo)}
                        >
                            삭제
                        </button>}
                    </div>
                </Box>
                <TableContainer className='table-container' style={{height:'74px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>사번</TableCell>
                                <TableCell align="center" style={boldCellStyle}>아이디</TableCell>
                                <TableCell align="center" style={boldCellStyle}>비밀번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이메일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.employee.employeeNo !== 0 && <TableRow>
                                <TableCell align="center" style={cellStyle}>{employee.employeeNo}</TableCell>
                                <TableCell align="center" style={cellStyle}>{employee.id}</TableCell>
                                <TableCell align="center" style={cellStyle}>{employee.password}</TableCell>
                                <TableCell align="center" style={cellStyle}>{employee.name}</TableCell>
                                <TableCell align="center" style={cellStyle}>{employee.tel}</TableCell>
                                <TableCell align="center" style={cellStyle}>{employee.email}</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

}

export default ViewEmployeeTable;