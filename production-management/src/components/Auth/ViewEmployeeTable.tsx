import React, {Component} from "react";
import {AuthState, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import EmployeeModifyModal from "../Modal/Auth/EmployeeModifyModal";
import {AuthContext} from "../../store/Auth/auth-context";
import {DetailTitle} from "../../core/DetailTitle";
import {EditButton} from "../../core/button/EditButton";
import {DeleteButton} from "../../core/button/DeleteButton";
import {NullText} from "../../core/NullText";

type State = {
    employeeModifyModalOpen: boolean
}

type Props = {

}

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '16px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '16px'
}

const myMap: Map<string, string> = new Map<string, string>([
    ['ROLE_ADMIN', '관리자'],
    ['ROLE_MEMBER', '사원'],
]);

class ViewEmployeeTable extends Component<Props, State> {
    static contextType = AuthContext;

    constructor(Props: Props) {
        super(Props);
        this.state = {
            employeeModifyModalOpen: false
        } as State;
    }

    componentDidMount() {
        const state = this.context as AuthState;
        state.getEmployeeList();
        const list = state.employeePage?.list;
        const firstEmployee = list && list.length > 0 ? list[0] : null;
        if(firstEmployee){
            state.getEmployee(firstEmployee?.employeeNo);
        }
    }

    handleDeleteClick = (employeeNo: number) => {
        const state = this.context as AuthState;
        state.deleteEmployee(employeeNo);
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
                                <TableCell align="center" style={boldCellStyle}>이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이메일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>권한</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.employee.employeeNo !== 0 ? <TableRow>
                                <TableCell align="center" style={tableCellStyle}>{employee.employeeNo}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{employee.id}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{employee.name}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{employee.tel === '--' ? '' : employee.tel}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>{employee.email}</TableCell>
                                <TableCell align="center" style={tableCellStyle}>
                                    <div className={employee.role}>
                                        {myMap.get(employee.role)}
                                    </div>
                                </TableCell>
                            </TableRow> :
                            <TableRow>
                                <TableCell colSpan={6} style={{border: '0'}}>
                                    <NullText mt={'0px'}/>
                                </TableCell>
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