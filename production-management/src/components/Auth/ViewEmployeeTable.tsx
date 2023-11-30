import React, {Component} from "react";
import {AuthState, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import EmployeeModifyModal from "../Modal/Employee/EmployeeModifyModal";
import {AuthContext} from "../../store/Auth/auth-context";

type State = {
    employeeModifyModalOpen: boolean
}

type Props = {

}

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5'
};


class ViewEmployeeTable extends Component<Props, State> {
    static contextType = AuthContext;

    handleDeleteClick = (employeeNo: number) => {
        const state = this.context as AuthState;
        state.deleteEmployee(employeeNo);
    }

    constructor(Props: Props) {
        super(Props);
        this.state = {
            employeeModifyModalOpen: false
        } as State;
    }

    updateEmployee = (employeeNo: number, id: string, password: string, name: string,
                      role: string, tel: string, email: string) => {
        const state = this.context as AuthState;

        const updateAuthEmployee = {
            employeeNo,
            id,
            password,
            name,
            role,
            tel,
            email
        } as UpdateAuthEmployee
        console.log('updateAuthEmployee : ' +  updateAuthEmployee);

        state.updateEmployee(updateAuthEmployee);
    }

    render() {
        const state = this.context as AuthState;
        const employee = state.employee;

        return(
            <>
                <div style={{
                    width: '100%',
                    height: '30px',
                    marginLeft: '2px',
                    display: 'flex',
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={require('./../../images/icon/detail.png')} style={{width: '20px'}}/>
                        <span className='table-header'
                              style={{fontWeight: 'bold', fontSize: '16px'}}> 사원 상세 : &nbsp;
                            {state.employee.employeeNo !== 0 &&
                                <span style={{color: '#0C70F2'}}>{state.employee.employeeNo}</span>}
                        </span>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        {state.employee.employeeNo !== 0 &&
                            <img src={require('../../images/button/modify-button.png')}
                                 style={{width : '20px', marginRight : '5px', marginTop: '3px'}}
                                 onClick={() => this.setState({employeeModifyModalOpen: true})}/>
                        }
                        <React.Fragment>
                            {this.state.employeeModifyModalOpen && state.employee.employeeNo !== 0 ? (
                                <EmployeeModifyModal onClose={() => this.setState({employeeModifyModalOpen: false})}
                                                     status={this.state.employeeModifyModalOpen}
                                                     updateEmployee = {this.updateEmployee}
                                                     employeeNo = {state.employee.employeeNo}/>
                            ) : null}
                        </React.Fragment>

                        {state.employee.employeeNo !== 0 &&
                            <img src={require('../../images/button/delete-button.png')}
                            style={{width : '20px', marginRight : '5px', marginTop: '3px'}}
                            onClick={()=>this.handleDeleteClick(state.employee.employeeNo)}
                            />}
                    </div>
                </div>
                <TableContainer className='table-container'>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>사번</TableCell>
                                <TableCell align="center" style={boldCellStyle}>아이디</TableCell>
                                <TableCell align="center" style={boldCellStyle}>비밀번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이메일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>역할</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.employee.employeeNo !== 0 && <TableRow>
                                <TableCell align="center">{employee.employeeNo}</TableCell>
                                <TableCell align="center">{employee.id}</TableCell>
                                <TableCell align="center">{employee.password}</TableCell>
                                <TableCell align="center">{employee.name}</TableCell>
                                <TableCell align="center">{employee.tel}</TableCell>
                                <TableCell align="center">{employee.email}</TableCell>
                                <TableCell align="center">
                                    {employee.role === 'ROLE_ADMIN' ? '관리자' : '사원'}</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

}

export default ViewEmployeeTable;