import React, {ChangeEvent, Component} from 'react';
import {Box, Table, TableCell, TableContainer, TableRow} from '@material-ui/core';
import {EmployeeContext} from '../../store/Employee/employee-context';
import {EmployeeState, UpdateEmployee} from '../../object/Employee/employee-object';
import {initialUpdateEmployee} from "../../state/employeeStateMangement";
import ProfileImage from "./ProfileImage";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}

type ProfileFormProps = {}

type ProfileFormState = {
    updateEmployeeObj: UpdateEmployee;
    selectedImage: File | null;
}

let modifyValue = {
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    name: '',
    tel: '',
    email: '',
}

class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
    static contextType = EmployeeContext;

    constructor(props: ProfileFormProps) {
        super(props);

        this.state = {
            updateEmployeeObj: initialUpdateEmployee,
            selectedImage: null,
        }
    }

    componentDidMount() {
        // localStorage의 employeeNo 가져와서 유저 데이터 불러오기
        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};

        const state = this.context as EmployeeState;
        state.getEmployee(employeeData.employeeNo);
    }

    validateName = (name: string) => {
        return name.length >= 2;
    }

    validateTel = (tel: string) => {
        return /^\d{11}$/.test(tel);
    }

    validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    handleUpdateClick = () => {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        if(!this.validateName(modifyValue.name)){
            alert('2글자 이상의 이름을 입력해주세요.');
            return;
        }

        if(!this.validateTel(modifyValue.tel)){
            alert('11자리 숫자로 연락처를 입력해주세요.')
            return;
        }

        if(!this.validateEmail(modifyValue.email)){
            alert('올바른 이메일을 입력해주세요.');
            return;
        }

        if (modifyValue.password !== modifyValue.passwordConfirm) {
            alert('새 비밀번호와 재입력한 새 비밀번호가 같지 않습니다. 다시 확인해주세요.');
            return;
        }
        const telWithoutHyphen = modifyValue.tel.replace(/-/g, '');

        const updateEmployeeObj: UpdateEmployee = {
            oldPassword: modifyValue.oldPassword,
            password: modifyValue.password,
            name: modifyValue.name,
            tel: telWithoutHyphen,
            email: modifyValue.email
        };

        state.updateEmployee(employee.employeeNo, updateEmployeeObj);
    };

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        modifyValue.name = employee.name;
        modifyValue.tel = employee.tel;
        modifyValue.email = employee.email;

        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '60%'}}>
                <TableContainer className='table-container'>
                    <Table size='small' className='table' style={{backgroundColor: '#FDFDFD'}}>
                        <TableRow>
                            <TableCell style={boldCellStyle}>사번</TableCell>
                            {employee.employeeNo !== 0 ?
                                <TableCell style={tableCellStyle}>{employee.employeeNo}</TableCell>
                                : null}
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>아이디</TableCell>
                            <TableCell style={tableCellStyle}>{employee.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>이름</TableCell>
                            <TableCell >
                                <input
                                    type="text"
                                    placeholder="이름"
                                    defaultValue={employee.name}
                                    onChange={event => {
                                        modifyValue.name = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>현재 비밀번호</TableCell>
                            <TableCell>
                                <input
                                    type="password"
                                    placeholder="현재 비밀번호"
                                    onChange={event => {
                                        modifyValue.oldPassword = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>새 비밀번호</TableCell>
                            <TableCell>
                                <input
                                    type="password"
                                    placeholder="새 비밀번호"
                                    onChange={event => {
                                        modifyValue.password = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>새 비밀번호</TableCell>
                            <TableCell>
                                <input
                                    type="password"
                                    placeholder="새 비밀번호 다시입력"
                                    onChange={event => {
                                        modifyValue.passwordConfirm = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>연락처</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="'-'제외 11자리 입력"
                                    defaultValue={employee.tel}
                                    onChange={event => {
                                        modifyValue.tel = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>이메일</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="이메일"
                                    defaultValue={employee.email}
                                    onChange={event => {
                                        modifyValue.email = event.target.value;
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
                <button onClick={this.handleUpdateClick}
                        style={{
                            backgroundColor: '#546ae8',
                            width: '50px',
                            height: '30px',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            marginTop: '5px'
                        }}
                >
                    수정
                </button>
            </div>
        );
    }
}

export default ProfileForm;
