import React, {Component} from "react";
import {AuthState, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import EmployeeModifyModal from "../Modal/Employee/EmployeeModifyModal";
import {AuthContext} from "../../store/Auth/auth-context";
import {DetailTitle} from "../../core/DetailTitle";
import {EditButton} from "../../core/button/EditButton";
import {DeleteButton} from "../../core/button/DeleteButton";

type State = {
    employeeModifyModalOpen: boolean
}

type Props = {

}

const boldCellStyle = {
    backgroundColor: '#f1f3f5',
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
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
                    display: 'flex',
                    height: '20px',
                    marginTop: '20px'
                }}>
                    <DetailTitle options={{
                        targetName: (state.employee.employeeNo === 0 ? '' : state.employee.employeeNo) as unknown as string,
                        title: '사원 상세'
                    }}/>
                    <div style={{ marginLeft: 'auto' }}>
                        {state.employee.employeeNo !== 0 &&
                            <div>
                                <EditButton size={20}
                                            onClick={() => this.setState({employeeModifyModalOpen: true})} />
                                &nbsp;&nbsp;
                                <DeleteButton size={20}  onClick={() => this.handleDeleteClick(state.employee.employeeNo)}/>
                            </div>}
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
                <React.Fragment>
                    {this.state.employeeModifyModalOpen && state.employee.employeeNo !== 0 ? (
                        <EmployeeModifyModal onClose={() => this.setState({employeeModifyModalOpen: false})}
                                             status={this.state.employeeModifyModalOpen}
                                             updateEmployee = {this.updateEmployee}
                                             employeeNo = {state.employee.employeeNo}/>
                    ) : null}
                </React.Fragment>
            </>
        );
    }

}

export default ViewEmployeeTable;