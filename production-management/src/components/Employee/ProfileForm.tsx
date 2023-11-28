import React, { ChangeEvent, Component } from 'react';
import { Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { EmployeeContext } from '../../store/Employee/employee-context';
import { EmployeeState, UpdateEmployee } from '../../object/Employee/employee-object';

interface ProfileFormProps {

}

interface ProfileFormState {
    updateEmployeeObj: UpdateEmployee;
}

class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
    static contextType = EmployeeContext;

    componentDidMount() {
        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};

        const state = this.context as EmployeeState;
        state.getEmployee(employeeData.employeeNo);
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
        const { employee } = this.context as EmployeeState;
        const updatedValue = event.target.value;

        this.setState((prevState) => ({
            updateEmployeeObj: {
                ...prevState.updateEmployeeObj,
                [key]: updatedValue,
            },
        }));

        console.log(this.state.updateEmployeeObj);
    };

    handleUpdateClick = () => {
        const { employee } = this.context as EmployeeState;
        const { updateEmployeeObj } = this.state;


        const { updateEmployee } = this.context as EmployeeState;
        updateEmployee(employee.employeeNo, updateEmployeeObj);
    };

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        return (
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>사번</TableCell>
                        {employee.employeeNo !== 0 ? <TableCell>{employee.employeeNo}</TableCell> : null}
                    </TableRow>
                    <TableRow>
                        <TableCell>아이디</TableCell>
                        <TableCell>{employee.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>
                            <input
                                type="text"
                                placeholder="이름"
                                defaultValue={employee.name}
                                onChange={(e) => this.handleInputChange(e, 'name')}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>비밀번호</TableCell>
                        <TableCell>
                            <div>
                                <label>
                                    현재 비밀번호
                                    <input
                                        type="password"
                                        placeholder="현재 비밀번호"
                                        onChange={(e) => this.handleInputChange(e, 'oldPassword')}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    새 비밀번호
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호"
                                        onChange={(e) => this.handleInputChange(e, 'password')}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    새 비밀번호 확인
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호 다시입력"
                                        onChange={(e) => this.handleInputChange(e, 'passwordConfirm')}
                                    />
                                </label>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>
                            <input
                                type="text"
                                placeholder="010"
                                defaultValue={employee.tel}
                                onChange={(e) => this.handleInputChange(e, 'tel')}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>이메일</TableCell>
                        <TableCell>
                            <input
                                type="text"
                                placeholder="이메일"
                                defaultValue={employee.email}
                                onChange={(e) => this.handleInputChange(e, 'email')}
                            />
                        </TableCell>
                    </TableRow>
                </Table>
                <button onClick={this.handleUpdateClick}>수정</button>
            </TableContainer>
        );
    }
}

export default ProfileForm;
