import {AuthState, Employee} from "../../../object/Auth/auth-object";
import React, {ChangeEvent, Component} from "react";
import {Box} from "@material-ui/core";
import {AuthContext} from "../../../store/Auth/auth-context";
// @ts-ignore
import defaultImage from '../../../images/default-image.jpg';
import PersonIcon from '@material-ui/icons/Person';

import './EmployeeModal.css';
import Swal from "sweetalert2";

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
    email1: '',
    email2: '',
}

export class EmployeeModifyModal extends Component<EmployeeModalProps, EmployeeModalState> {
    static contextType = AuthContext;

    componentDidMount() {
        const state = this.context as AuthState;
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
                const state = this.context as AuthState;
                const employee = state.employee;

                const idPattern = /^[a-zA-Z0-9]{4,}$/;
                const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
                const telPattern = /^[0-9]{11}$/;

                if(modifyValue.name.length === 0 || modifyValue.id.length === 0 || modifyValue.password.length === 0){
                    this.alertMessage('warning', '', '필수입력칸에 빈칸이 존재합니다.');
                    return;
                }

                if(!idPattern.test(modifyValue.id) && modifyValue.id){
                    this.alertMessage('warning', '', '아이디는 최소 4자 이상이어야 합니다.');
                    return;
                }

                if(!passwordPattern.test(modifyValue.password && modifyValue.password)){
                    this.alertMessage('warning', '', '비밀번호는 최소 6자 이상이어야 합니다.');
                    return;
                }

                const tel= modifyValue.tel1 + modifyValue.tel2 + modifyValue.tel3;
                if(!telPattern.test(tel) && modifyValue.tel1 && modifyValue.tel2 && modifyValue.tel3){
                    this.alertMessage('warning', '', '연락처의 형식이 잘못되었습니다. (예: 010-1234-5678');
                    return;
                }

                if(employee.id !== modifyValue.id && !state.idDuplicate.availability){
                    this.alertMessage('warning', '', '아이디의 중복 체크가 필요합니다.');
                    return;
                }

                updateEmployee(
                    this.props.employeeNo,
                    modifyValue.id,
                    modifyValue.password,
                    modifyValue.name,
                    this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_MEMBER',
                    modifyValue.tel1 + modifyValue.tel2 + modifyValue.tel3,
                    modifyValue.email1 && modifyValue.email2 ? modifyValue.email1 + '@' + modifyValue.email2 : '',
                );
                console.log(this.state.employee.id);
                console.log(modifyValue.id);
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
        const idPattern = /^[a-zA-Z0-9]{4,}$/;
        const enteredId = modifyValue.id;

        if (enteredId && enteredId.length > 0) {
            if(!idPattern.test(enteredId) || enteredId.length === 0 ) {
                this.alertMessage('warning', '', '아이디는 최소 4자 이상이어야 합니다.');
                return;
            }
            await state.idCheck(enteredId);
            modifyValue.id = enteredId;
        }
    };

    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    }

    handleAdminSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({isAdmin: event.target.checked});
    };

    render() {
        const state = this.context as AuthState;
        const {onClose, status} = this.props as EmployeeModalProps;

        const employee = state.employee;
        const tel = employee.tel;
        const telArray = tel.split("-");

        const email = employee.email;
        const emailArray = email.split("@")

        modifyValue.id = employee.id
        modifyValue.password = employee.password;
        modifyValue.name = employee.name;
        modifyValue.tel1 = telArray[0];
        modifyValue.tel2 = telArray[1];
        modifyValue.tel3 = telArray[2];
        modifyValue.email1 = emailArray[0];
        modifyValue.email2 = emailArray[1];
        modifyValue.role = employee.role;

        return (
            <div className="modal">
                <section className='modal-container' style={{
                    display: 'grid', gridTemplateRows: 'auto 1fr auto',
                    width: '650px', height: '620px'
                }}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><PersonIcon/>&nbsp;사원 정보수정</div>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <main style={{border: "none", display: 'grid', placeItems: 'center'}}>
                        <Box style={{display: 'flex'}}>
                            <Box sx={{marginLeft: '1%', marginRight: '10%'}}>
                                <label className="form-label">
                                    사진
                                </label>
                                <Box style={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
                                    {this.state.selectedImage ? (
                                        <img
                                            src={URL.createObjectURL(this.state.selectedImage)}
                                            alt="새 이미지"
                                            style={{
                                                width: '200px',
                                                height: '250px',
                                                objectFit: 'cover',
                                                marginTop: '10px',
                                                marginBottom: '8px',
                                                border: '1.5px solid #D3D3D3',
                                                borderRadius: '4px'
                                            }}/>
                                    ) : employee.employeeNo !== 0 ? (
                                        <img src={('http://localhost:8080/employees/' + employee.employeeNo + '/image')}
                                             style={{
                                                 width: '200px',
                                                 height: '250px',
                                                 objectFit: 'cover',
                                                 marginTop: '10px',
                                                 marginBottom: '8px',
                                                 border: '1.5px solid #D3D3D3',
                                                 borderRadius: '4px'
                                             }}
                                            onError={(e) => {
                                                e.currentTarget.src = defaultImage;
                                            }}
                                        />
                                    ) : (
                                        <img src={defaultImage} />
                                    )}
                                    <button onClick={() => document.getElementById('fileInput')?.click()}
                                            className="image-button"
                                    >
                                        선택
                                        <input id='fileInput' type='file' accept='image/*' style={{display: 'none'}}
                                               onChange={this.handleImageChange}/>
                                    </button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '95%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '8px',
                                }}
                            >

                                <div style={{display: 'flex'}}>
                                    <label className="form-label" style={{width: '50%'}}>
                                        이름 <span style={{color: 'red'}}>*</span>
                                    </label>
                                    <label className="form-label">
                                        권한 <span style={{color: 'red'}}>*</span>
                                    </label>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{width: '45%', marginRight: '5%'}}
                                        defaultValue={employee.name}
                                        onChange={event => {
                                            modifyValue.name = event.target.value;
                                        }}
                                    />
                                    <label className="admin" style={{
                                        background: this.state.isAdmin ? '#D3D3D3' : '#fff',
                                        border: this.state.isAdmin ? '1px solid #D3D3D3' : '1px solid #D3D3D3',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '5px',
                                        width: '45%', height: '30px'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={this.state.isAdmin}
                                            onChange={this.handleAdminSwitchChange}
                                            className="admin"
                                            style={{display: 'none'}}
                                        />
                                        <span style={{
                                            left: this.state.isAdmin ? '65%' : '0%',
                                            background: this.state.isAdmin ? '#FFF' : '#D3D3D3',
                                            boxShadow: this.state.isAdmin ? '1px 2px 3px #00000020' : 'none',
                                        }}>{this.state.isAdmin ? '관리자' : '사원'}</span>
                                    </label>
                                </div>
                                <label className="form-label">
                                    사번 <span style={{color: 'red'}}>*</span>
                                </label>
                                <input
                                        type="text"
                                        className="form-input"
                                        defaultValue={employee.employeeNo}
                                        disabled
                                />
                                <label className="form-label">
                                    아이디 <span style={{color: 'red'}}>*</span>
                                </label>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{width: '60%', marginBottom: '4px'}}
                                        defaultValue={employee.id}
                                        onChange={event => {
                                            modifyValue.id = event.target.value;
                                        }}
                                    />
                                    <button className="form-duplicate-button"
                                            onClick={this.checkIdDuplicate}>중복 체크
                                    </button>
                                </div>
                                {state.idDuplicate.availability ?
                                    <span className="duplicate-span" style={{color: 'green'}}>
                                            사용 가능한 아이디입니다.</span>
                                    : <span className="duplicate-span" style={{color: 'red'}}>
                                            아이디 변경은 중복 확인이 필요합니다.</span>}
                                <label className="form-label">
                                    비밀번호 <span style={{color: 'red'}}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="ex) 6자 이상"
                                    className="form-input"
                                    defaultValue={employee.password}
                                    onChange={event => {
                                        modifyValue.password = event.target.value;
                                    }}
                                />
                                <label className="form-label">
                                    연락처
                                </label>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        placeholder="010"
                                        className="form-input"
                                        style={{width: '30%'}}
                                        defaultValue={telArray[0]}
                                        onChange={event => {
                                            modifyValue.tel1 = event.target.value;
                                        }}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>-</span>
                                    <input
                                        type="text"
                                        placeholder="1234"
                                        className="form-input"
                                        style={{width: '30%'}}
                                        defaultValue={telArray[1]}
                                        onChange={event => {
                                            modifyValue.tel2 = event.target.value;
                                        }}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>-</span>
                                    <input
                                        type="text"
                                        placeholder="5678"
                                        className="form-input"
                                        style={{width: '30%'}}
                                        defaultValue={telArray[2]}
                                        onChange={event => {
                                            modifyValue.tel3 = event.target.value;
                                        }}
                                    />
                                </div>
                                <label className="form-label">
                                    이메일
                                </label>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        placeholder="test"
                                        className="form-input"
                                        style={{width: '35%'}}
                                        defaultValue={emailArray[0]}
                                        onChange={event => {
                                            modifyValue.email1 = event.target.value;
                                        }}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>@</span>
                                    <input
                                        type="text"
                                        placeholder="test.com"
                                        className="form-input"
                                        style={{width: '60%'}}
                                        defaultValue={emailArray[1]}
                                        onChange={event => {
                                            modifyValue.email2 = event.target.value;
                                        }}
                                    />
                                </div>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '95%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '8px',
                            }}
                        >
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button className="form-cancel-button" style={{border: '1px solid lightgray'}}
                                        onClick={onClose}>
                                    취소
                                </button>
                                &nbsp;
                                <button className="form-button" onClick={this.state.updateEmployee}>
                                    수정
                                </button>
                            </div>
                        </Box>
                    </main>
                </section>
            </div>
        )
    }
}

export default EmployeeModifyModal;