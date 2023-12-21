import React, {ChangeEvent, Component} from 'react';
import {Box, Table, TableCell, TableContainer, TableRow} from '@material-ui/core';
import {EmployeeContext} from '../../store/Employee/employee-context';
import {EmployeeState, UpdateEmployee} from '../../object/Employee/employee-object';
import {initialUpdateEmployee} from "../../state/employeeStateMangement";
import ProfileImage from "./ProfileImage";
import Swal from "sweetalert2";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '17px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '16px',
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
    tel1: '',
    tel2: '',
    tel3: '',
    email1: '',
    email2: '',
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

        const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
        const telPattern = /^[0-9]{11}$/;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(!passwordPattern.test(modifyValue.password) && modifyValue.password){
            this.alertMessage('warning', '', '비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        const tel= modifyValue.tel1 + modifyValue.tel2 + modifyValue.tel3;
        if(!telPattern.test(tel) && modifyValue.tel1 && modifyValue.tel2 && modifyValue.tel3){
            this.alertMessage('warning', '', '연락처의 형식이 잘못되었습니다. (예: 010-1234-5678');
            return;
        }

        const email= modifyValue.email1 + '@' + modifyValue.email2;
        if(!emailPattern.test(email) && modifyValue.email1 && modifyValue.email2 ){
            this.alertMessage('warning', '', '이메일의 형식이 잘못되었습니다.');
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
            tel: modifyValue.tel1 + modifyValue.tel2 + modifyValue.tel3,
            email: modifyValue.email1 && modifyValue.email2 ? modifyValue.email1 + '@' + modifyValue.email2 : '',
        };

        state.updateEmployee(employee.employeeNo, updateEmployeeObj);
    };

    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    };

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        const tel = employee.tel || '';
        const telArray = tel.split("-");

        const email = employee.email || '';
        const emailArray = email.split("@")

        modifyValue.name = employee.name;
        modifyValue.tel1 = telArray[0];
        modifyValue.tel2 = telArray[1];
        modifyValue.tel3 = telArray[2];
        modifyValue.email1 = emailArray[0];
        modifyValue.email2 = emailArray[1];

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
                                    style={{ width: '300px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
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
                                    style={{ width: '300px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
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
                                    style={{ width: '300px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
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
                                    style={{ width: '300px', height: '25px', fontFamily: 'S-CoreDream-3Light'}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>연락처</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    defaultValue={telArray[0]}
                                    onChange={event => {
                                        modifyValue.tel1 = event.target.value;
                                    }}
                                    style={{ width: '93px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginRight: '3px'
                                    }}
                                />
                                -
                                <input
                                    type="text"
                                    defaultValue={telArray[1]}
                                    onChange={event => {
                                        modifyValue.tel2 = event.target.value;
                                    }}
                                    style={{ width: '93px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginRight: '3px', marginLeft: '3px'
                                    }}
                                />
                                -
                                <input
                                    type="text"
                                    defaultValue={telArray[2]}
                                    onChange={event => {
                                        modifyValue.tel3 = event.target.value;
                                    }}
                                    style={{ width: '93px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginRight: '3px',  marginLeft: '3px'
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={boldCellStyle}>이메일</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    defaultValue={emailArray[0]}
                                    onChange={event => {
                                        modifyValue.email1 = event.target.value;
                                    }}
                                    style={{ width: '103px', height: '25px', fontFamily: 'S-CoreDream-3Light', marginRight: '5px'}}
                                />
                                @
                                <input
                                    type="text"
                                    defaultValue={emailArray[1]}
                                    onChange={event => {
                                        modifyValue.email2 = event.target.value;
                                    }}
                                    style={{ width: '175px', height: '25px', fontFamily: 'S-CoreDream-3Light',
                                        marginRight: '5px', marginLeft: '5px'}}
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