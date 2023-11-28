import React, { ChangeEvent, Component } from 'react';
import { Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { EmployeeContext } from '../../store/Employee/employee-context';
import { EmployeeState, UpdateEmployee } from '../../object/Employee/employee-object';
import {initialUpdateEmployee} from "../../state/employeeStateMangement";

type ProfileFormProps = {

}

type ProfileFormState = {
    updateEmployeeObj: UpdateEmployee;
    selectedImage: File | null;
}

let modifyValue = {
    oldPassword: '',
    password : '',
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

    handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            const imageFile = e.target.files[0];
            this.setState({ selectedImage: imageFile});
        }
    }

    handleUpdateClick = () => {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        // 바꿀 이미지가 있을 경우 이미지 변경 요청
        if(this.state.selectedImage){
            state.updateImage(employee.employeeNo, this.state.selectedImage);
        }

        if(modifyValue.password !== modifyValue.passwordConfirm){
            alert('비밀번호를 다시 확인해주세요.');
            return;
        }
        const telWithoutHyphen = modifyValue.tel.replace(/-/g, '');

        const updateEmployeeObj : UpdateEmployee = {
            oldPassword: modifyValue.oldPassword,
            password: modifyValue.password,
            name: modifyValue.name,
            tel: telWithoutHyphen,
            email: modifyValue.email
        };

        alert(updateEmployeeObj.email);

        state.updateEmployee(employee.employeeNo, updateEmployeeObj);
    };

    render() {
        const state = this.context as EmployeeState;
        const employee = state.employee;

        modifyValue.name = employee.name;
        modifyValue.tel = employee.tel;
        modifyValue.email = employee.email;

        return (
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>사진</TableCell>
                        <TableCell>{ this.state.selectedImage ? (
                            <img
                                src={URL.createObjectURL(this.state.selectedImage)}
                                alt="새 이미지"
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '250px',
                                    marginTop: '10px',
                                }}
                            />
                        ) : employee.employeeNo !==0 ? (
                            <img
                                src={`http://localhost:8080/employees/${employee.employeeNo}/image`}
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '250px',
                                    marginTop: '10px',
                                }}
                            />
                        ) : (
                            <div> 이미지 없음 </div>
                        )}
                        <button onClick={() => document.getElementById('fileInput')?.click()}>
                            선택
                            <input id='fileInput' type='file' accept='image/*' style={{ display: 'none' }}
                                   onChange={this.handleImageChange} />
                        </button>
                        </TableCell>
                    </TableRow>
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
                                onChange={event => {
                                    modifyValue.name = event.target.value;
                                }}
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
                                        onChange={event => {
                                            modifyValue.oldPassword = event.target.value;
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    새 비밀번호
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호"
                                        onChange={event => {
                                            modifyValue.password = event.target.value;
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    새 비밀번호 확인
                                    <input
                                        type="password"
                                        placeholder="새 비밀번호 다시입력"
                                        onChange={event => {
                                            modifyValue.passwordConfirm = event.target.value;
                                        }}
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
                                onChange={event => {
                                    modifyValue.tel = event.target.value;
                                }}
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
                                onChange={event => {
                                    modifyValue.email = event.target.value;
                                }}
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
