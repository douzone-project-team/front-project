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
    oldPassword: string
    password: string,
    passwordConfirm: string,
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
            oldPassword: '',
            password: '',
            passwordConfirm: '',
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

        if(!this.validateEmail(modifyValue.email)){
            alert('올바른 이메일을 입력해주세요.');
            return;
        }

        if(this.state.password && this.state.password.length < 6){
            alert('비밀번호는 6글자 이상이어야 합니다.');
            this.setState(prevState => ({
                oldPassword: '',
                password: '',
                passwordConfirm: '',
            }));
            return;
        }

        if (this.state.password !== this.state.passwordConfirm) {
            alert('새 비밀번호와 재입력한 새 비밀번호가 같지 않습니다. 다시 확인해주세요.');
            this.setState(prevState => ({
                oldPassword: '',
                password: '',
                passwordConfirm: '',
            }));
            return;
        }

        const updateEmployeeObj: UpdateEmployee = {
            oldPassword: modifyValue.oldPassword,
            password: modifyValue.password,
            name: modifyValue.name,
            tel: modifyValue.tel,
            email: modifyValue.email
        };

        state.updateEmployee(employee.employeeNo, updateEmployeeObj);
    };

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        if (!employee || !employee.tel || !employee.email) {
            return null;
        }

        const [tel1, tel2, tel3] = employee.tel.split('-');
        const [email1, email2] = employee.email.split('@');

        modifyValue.name = employee.name;
        modifyValue.tel = tel1 + tel2 + tel3;
        modifyValue.email = email1 + email2;

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
                                    value={this.state.oldPassword}
                                    onChange={event => {
                                        this.setState({oldPassword: event.target.value})
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
                                    value={this.state.password}
                                    onChange={event => {
                                        this.setState({password: event.target.value})
                                    }}
                                    style={{ width: '200px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>새 비밀번호 재입력</TableCell>
                            <TableCell>
                                <input
                                    type="password"
                                    placeholder="새 비밀번호 재입력"
                                    value={this.state.passwordConfirm}
                                    onChange={event => {
                                        this.setState({passwordConfirm: event.target.value})
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
                                    defaultValue={tel1}
                                    onChange={event => {
                                        modifyValue.tel = `${event.target.value}${tel2}${tel3}`;
                                    }}
                                    style={{ width: '59px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginRight: '3px'
                                    }}
                                />
                                -
                                <input
                                    type="text"
                                    defaultValue={tel2}
                                    onChange={event => {
                                        modifyValue.tel = `${tel1}${event.target.value}${tel3}`;
                                    }}
                                    style={{ width: '59px', height: '25px', fontFamily: 'S-CoreDream-3Light'
                                        , marginLeft: '3px', marginRight: '3px'}}
                                />
                                -
                                <input
                                    type="text"
                                    defaultValue={tel3}
                                    onChange={event => {
                                        modifyValue.tel = `${tel1}${tel2}${event.target.value}`;
                                    }}
                                    style={{ width: '59px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginLeft: '3px'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>이메일</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    defaultValue={email1}
                                    onChange={event => {
                                        modifyValue.email = event.target.value;
                                    }}
                                    style={{ width: '60px', height: '25px', fontFamily: 'S-CoreDream-3Light', marginRight: '5px'}}
                                />
                                @
                                <input
                                    type="text"
                                    defaultValue={email2}
                                    onChange={event => {
                                        modifyValue.email = event.target.value;
                                    }}
                                    style={{ width: '115px', height: '25px', fontFamily: 'S-CoreDream-3Light', marginLeft: '5px'}}
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