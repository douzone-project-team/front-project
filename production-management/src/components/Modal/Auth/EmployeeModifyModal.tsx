import {AuthState, Employee, UpdateAuthEmployee} from "../../../object/Auth/auth-object";
import React, {ChangeEvent, Component} from "react";
import {EmployeeState} from "../../../object/Employee/employee-object";
import {Box} from "@material-ui/core";
import {AuthContext} from "../../../store/Auth/auth-context";

import '../../../assets/css/EmployeeModifyModal.css?v=2';

type EmployeeModalProps = {
    onClose: () => void,
    status: boolean,
    updateEmployee: (
        employeeNo: number,
        id: string,
        password: string,
        name: string,
        role: string,
        tel: string,
        email: string,
    ) => void
    employeeNo: number
}

type EmployeeModalState = {
    employee: Employee;
    setEmployee: (employee: Employee) => void;
    updateEmployee: () => void;
    selectedImage: File | null;
    isIdValid: boolean;
    isAdmin: boolean;
}

let modifyValue = {
    id: '',
    password: '',
    name: '',
    role: '',
    tel1: '',
    tel2: '',
    tel3: '',
    email: '',
}

export class EmployeeModifyModal extends Component<EmployeeModalProps, EmployeeModalState> {
    static contextType = AuthContext;

    componentDidMount() {
        const state = this.context as EmployeeState;
        state.getEmployee(this.props.employeeNo);

        if (state.employee.role === 'ROLE_ADMIN') {
            this.setState({isAdmin: true});
        }
    }

    constructor(props: EmployeeModalProps) {
        super(props);
        this.state = {
            employee: {
                employeeNo: 0,
                id: '',
                password: '',
                name: '',
                tel: '',
                email: '',
                role: '',
            },
            selectedImage: null,
            isIdValid: false,
            isAdmin: false,

            setEmployee: (employee: Employee) => {
                this.setState({employee: employee});
            },

            updateEmployee: () => {
                const {onClose, updateEmployee} = this.props as EmployeeModalProps;
                updateEmployee(
                    this.props.employeeNo,
                    modifyValue.id,
                    modifyValue.password,
                    modifyValue.name,
                    this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_MEMBER',
                    modifyValue.tel1 + "-" + modifyValue.tel2 + "-" + modifyValue.tel3,
                    modifyValue.email,
                );
                onClose();
            }
        }
    }

    handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const state = this.context as AuthState;
        const employee = this.state.employee;

        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            this.setState({selectedImage: imageFile});

            await state.updateImage(employee.employeeNo, imageFile);
        }
    }

    checkIdDuplicate = async () => {
        const state = this.context as AuthState;
        const enteredId = modifyValue.id;

        if (enteredId) {
            await state.idCheck(enteredId);

            this.setState({
                isIdValid: true
            });
        }
    };

    handleAdminSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({isAdmin: event.target.checked});
    };

    render() {
        const state = this.context as AuthState;
        const {onClose, status} = this.props as EmployeeModalProps;

        const employee = state.employee;
        const tel = employee.tel;
        const telArray = tel.split("-");

        modifyValue.id = employee.id
        modifyValue.password = employee.password;
        modifyValue.name = employee.name;
        modifyValue.tel1 = telArray[0];
        modifyValue.tel2 = telArray[1];
        modifyValue.tel3 = telArray[2];
        modifyValue.email = employee.email;
        modifyValue.role = employee.role;

        return (
            <div className='modal'>
                {status ? (
                    <section className='modal-container'
                             style={{display: 'grid', gridTemplateRows: 'auto 1fr auto', width: '100%'}}>
                        <header>
                            <button className="close" onClick={onClose}>
                                &times;
                            </button>
                        </header>
                        <main style={{border: "none", display: 'flex', placeItems: 'center'}}>
                            <Box style={{marginLeft: '30px', marginRight: '30px'}}>
                                {this.state.selectedImage ? (
                                    <img
                                        src={URL.createObjectURL(this.state.selectedImage)}
                                        alt="새 이미지"
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '250px',
                                            marginTop: '10px',
                                            marginBottom: "10px",
                                            borderRadius: '20%'
                                        }}/>
                                ) : employee.employeeNo !== 0 ? (
                                    <img src={('http://localhost:8080/employees/' + employee.employeeNo + '/image')}
                                         style={{
                                             maxWidth: '200px',
                                             maxHeight: '250px',
                                             marginTop: '10px',
                                             marginBottom: "10px",
                                             borderRadius: '20%'
                                         }}/>
                                ) : (
                                    <div> 이미지 없음 </div>
                                )}

                                <button onClick={() => document.getElementById('fileInput')?.click()}
                                        style={{
                                            backgroundColor: '#546ae8',
                                            width: '50px',
                                            height: '30px',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px'
                                        }}
                                >
                                    선택
                                    <input id='fileInput' type='file' accept='image/*' style={{display: 'none'}}
                                           onChange={this.handleImageChange}/>
                                </button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                }}
                            >
                                <label className="form-label">
                                    사번 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={employee.employeeNo}
                                        disabled
                                    />
                                </label>
                                <div style={{marginBottom: '10px'}}>
                                    <label className="form-label">
                                        아이디 &nbsp;&nbsp;
                                        <input
                                            type="text"
                                            className="form-input"
                                            defaultValue={employee.id}
                                            onChange={event => {
                                                modifyValue.id = event.target.value;
                                            }}
                                        />
                                    </label>
                                    <button
                                        onClick={this.checkIdDuplicate}
                                        style={{height: '30px', marginLeft: '5px'}}
                                    >중복 확인
                                    </button>
                                </div>
                                <label className="form-label">
                                    비밀번호
                                    <input
                                        type="text"
                                        className="form-input"
                                        defaultValue={employee.password}
                                        onChange={event => {
                                            modifyValue.password = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    이름 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                        type="text"
                                        className="form-input"
                                        defaultValue={employee.name}
                                        onChange={event => {
                                            modifyValue.name = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    연락처 &nbsp;&nbsp;
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{width: '47px', marginLeft: '7px'}}
                                        defaultValue={telArray[0]}
                                        onChange={event => {
                                            modifyValue.tel1 = event.target.value;
                                        }}
                                    /> -
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{width: '49px', marginLeft: '7px'}}
                                        defaultValue={telArray[1]}
                                        onChange={event => {
                                            modifyValue.tel2 = event.target.value;
                                        }}
                                    /> -
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{width: '49px', marginLeft: '7px'}}
                                        defaultValue={telArray[2]}
                                        onChange={event => {
                                            modifyValue.tel3 = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    이메일 &nbsp;&nbsp;
                                    <input
                                        type="text"
                                        className="form-input"
                                        defaultValue={employee.email}
                                        onChange={event => {
                                            modifyValue.email = event.target.value;
                                        }}
                                    />
                                </label>
                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                    <label className="form-label"
                                           style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                        권한
                                        <Box className="admin" style={{marginLeft: '120px'}}>
                                            <label style={{
                                                background: this.state.isAdmin ? '#F0F0F0' : '#fff',
                                                border: this.state.isAdmin ? '2px solid #F0F0F0' : '2px solid #F0F0F0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '5px',
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.state.isAdmin}
                                                    onChange={this.handleAdminSwitchChange}
                                                    style={{display: 'none'}}
                                                />
                                                <span style={{
                                                    left: this.state.isAdmin ? '45px' : '3px',
                                                    background: this.state.isAdmin ? '#FFF' : '#F0F0F0',
                                                    boxShadow: this.state.isAdmin ? '1px 2px 3px #00000020' : 'none',
                                                }}>{this.state.isAdmin ? '관리자' : '사원'}</span>
                                            </label>
                                        </Box>
                                    </label>
                                </Box>
                                <button className="form-button" onClick={this.state.updateEmployee}>
                                    수정
                                </button>
                            </Box>
                        </main>
                        <footer style={{padding: '30px'}}>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    }
}

export default EmployeeModifyModal;