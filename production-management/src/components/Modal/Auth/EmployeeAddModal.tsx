import React, {ChangeEvent, Component} from "react";
import {AuthContext} from "../../../store/Auth/auth-context";
import {AuthState} from "../../../object/Auth/auth-object";
import {Box} from "@material-ui/core";
// @ts-ignore
import defaultImage from "../../../images/default-image.jpg";

import './EmployeeModal.css';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Swal from "sweetalert2";


type EmployeeAddModalProps = {
    onClose: () => void,
    addEmployee: (
        name: string,
        employeeNo: number,
        id: string,
        password: string,
        role: string,
        tel: string,
        email: string,
    ) => void,
}

type EmployeeAddModalState = {
    isAdmin: boolean;
    selectedImage: File | null;
    employeeNo: number;
    id: string;
}

class EmployeeAddModal extends Component<EmployeeAddModalProps, EmployeeAddModalState> {
    static contextType = AuthContext;

    private nameInputRef = React.createRef<HTMLInputElement>();
    private employeeNoInputRef = React.createRef<HTMLInputElement>();
    private idInputRef = React.createRef<HTMLInputElement>();
    private passwordInputRef = React.createRef<HTMLInputElement>();
    private tel1InputRef = React.createRef<HTMLInputElement>();
    private tel2InputRef = React.createRef<HTMLInputElement>();
    private tel3InputRef = React.createRef<HTMLInputElement>();
    private email1InputRef = React.createRef<HTMLInputElement>();
    private email2InputRef = React.createRef<HTMLInputElement>();

    constructor(props: EmployeeAddModalProps) {
        super(props);

        this.state = {
            isAdmin: false,
            selectedImage: null,
            employeeNo: 0,
            id: '',
        };
    }

    componentDidMount() {
        const state = this.context as AuthState;
        state.cleanEmployee();
    }

    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    }

    // admin 여부
    handleAdminSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({isAdmin: event.target.checked});
    };

    handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = this.context as AuthState;
        state.cleanAvailabilites();

        this.setState({id: e.target.value});
    };

    handleEmployeeNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = this.context as AuthState;
        state.cleanAvailabilites();

        this.setState({employeeNo: Number(e.target.value)});
    };

    // 중복 검사
    checkIdDuplicate = async (id: string) => {
        const state = this.context as AuthState;
        const idPattern = /^[a-zA-Z0-9]{4,}$/;

        if (id) {
            if(!idPattern.test(id) || id.length === 0 ) {
                this.alertMessage('warning', '', '아이디는 최소 4자 이상이어야 합니다.');
                return;
            }
            await state.idCheck(id);
        }
    };

    checkEmployeeNoDuplicate = async (employeeNo: number) => {
        const state = this.context as AuthState;
        const employeeNoPattern = /^[0-9]{6}$/;

        if(employeeNo){
            if(!employeeNoPattern.test(String(employeeNo)) || String(employeeNo).length === 0 ) {
                this.alertMessage('warning', '', '사번의 형식이 잘못되었습니다. (예: 230001)');
                return;
            }
            await state.employeeNoCheck(employeeNo);
        }
    };

    // 이미지
    handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            this.setState({
                selectedImage: imageFile,
            });
        }
    };

    handleSubmit = async () => {
        const state = this.context as AuthState;

        try {
            const tel1 = this.tel1InputRef.current?.value || '';
            const tel2 = this.tel2InputRef.current?.value || '';
            const tel3 = this.tel3InputRef.current?.value || '';

            const email1 = this.email1InputRef.current?.value || '';
            const email2 = this.email2InputRef.current?.value || '';
            const email = email1 && email2 ? email1 + '@'+  email2 : '';

            const userData = {
                name: this.nameInputRef.current?.value || '',
                employeeNo: Number(this.employeeNoInputRef.current?.value) || 0,
                id: this.idInputRef.current?.value || '',
                password: this.passwordInputRef.current?.value || '',
                tel: tel1 + tel2 + tel3,
                email: email,
                role: this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_MEMBER',
            };

            /*
            *  유효성 검사
            *  */
            const idPattern = /^[a-zA-Z0-9]{4,}$/;
            const employeeNoPattern = /^[0-9]{6}$/;
            const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
            const telPattern = /^[0-9]{11}$/;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if(userData.name.length === 0 || String(userData.employeeNo).length === 0 || userData.id.length === 0 ||
                userData.password.length === 0){
                this.alertMessage('warning', '', '필수입력칸에 빈칸이 존재합니다.');
                return;
            }

            if(!idPattern.test(userData.id)){
                this.alertMessage('warning', '', '아이디는 최소 4자 이상이어야 합니다.');
                return;
            }

            if(!passwordPattern.test(userData.password)){
                this.alertMessage('warning', '', '비밀번호는 최소 6자 이상이어야 합니다.');
                return;
            }

            if(!telPattern.test(userData.tel) && userData.tel){
                this.alertMessage('warning', '', '연락처의 형식이 잘못되었습니다. (예: 010-1234-5678');
                return;
            }

            if(!emailPattern.test(userData.email) && userData.email){
                this.alertMessage('warning', '', '이메일의 형식이 잘못되었습니다.');
                return;
            }

            if(!employeeNoPattern.test(String(userData.employeeNo))){
                this.alertMessage('warning', '', '사번의 형식이 잘못되었습니다. (예: 230001)');
                return;
            }

            /*중복 체크 여부*/
            if(!state.idDuplicate.availability && !state.employeeNoDuplicate.availability){
                this.alertMessage('warning', '', '사번과 아이디의 중복 체크가 필요합니다.');
                return;
            }

            /*8
                회원 가입
             */
            if (this.state.selectedImage) {
                state.addImage(userData.employeeNo, this.state.selectedImage);
            }
            await state.addEmployee(userData);
            this.props.onClose();

        } catch (error) {

        }
    }

    render() {
        const {onClose} = this.props as EmployeeAddModalProps;
        const state = this.context as AuthState;

        const {
            isAdmin,
            selectedImage,
        } = this.state;

        return (
            <div className="modal">
                <section className='modal-container' style={{
                    display: 'grid', gridTemplateRows: 'auto 1fr auto',
                    width: '650px', height: '620px'
                }}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><PersonAddIcon/>&nbsp;사원 등록</div>
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
                                    <img
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
                                        alt=''
                                        style={{
                                            width: '200px',
                                            height: '250px',
                                            objectFit: 'cover',
                                            marginTop: '10px',
                                            marginBottom: '8px',
                                            border: '1.5px solid #D3D3D3',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <label className="image-button">
                                        사진 선택
                                        <input type='file' accept='image/*' style={{display: 'none'}}
                                               onChange={this.handleImageChange}/>
                                    </label>
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
                                        placeholder="ex) 홍길동"
                                        style={{width: '45%', marginRight: '5%'}}
                                        onChange={this.handleIdChange}
                                    />
                                    <label className="admin" style={{
                                        background: isAdmin ? '#F0F0F0' : '#fff',
                                        border: '1px solid #F0F0F0',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '5px',
                                        width: '45%', height: '30px'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={isAdmin}
                                            onChange={this.handleAdminSwitchChange}
                                            className="admin"
                                            style={{display: 'none'}}
                                        />
                                        <span style={{
                                            left: isAdmin ? '65%' : '0%',
                                            background: isAdmin ? '#FFF' : '#F0F0F0',
                                            boxShadow: isAdmin ? '1px 2px 3px #00000020' : 'none',
                                        }}>{isAdmin ? '관리자' : '사원'}</span>
                                    </label>
                                </div>
                                <label className="form-label">
                                    사번 <span style={{color: 'red'}}>*</span>
                                </label>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        placeholder="ex) 입사년도2+무작위 숫자4"
                                        className="form-input"
                                        style={{width: '63%', marginBottom: '4px'}}
                                        onChange={this.handleEmployeeNoChange}
                                    />
                                    <button className="form-duplicate-button"
                                            onClick={() => this.checkEmployeeNoDuplicate(this.state.employeeNo)}>중복 체크
                                    </button>
                                </div>
                                {state.employeeNoDuplicate.availability ?
                                    <span className="duplicate-span" style={{color: 'green'}}>
                                            사용 가능한 사번입니다.</span>
                                    : <span className="duplicate-span" style={{color: 'red'}}>
                                            사번은 중복 확인이 필수입니다.</span>}
                                <label className="form-label">
                                    아이디 <span style={{color: 'red'}}>*</span>
                                </label>
                                <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        placeholder="ex) 4자 이상"
                                        className="form-input"
                                        style={{width: '60%', marginBottom: '4px'}}
                                        ref={this.idInputRef}
                                    />
                                    <button className="form-duplicate-button"
                                            onClick={() => this.checkIdDuplicate(this.state.id)}>중복 체크
                                    </button>
                                </div>
                                {state.idDuplicate.availability ?
                                    <span className="duplicate-span" style={{color: 'green'}}>
                                            사용 가능한 아이디입니다.</span>
                                    : <span className="duplicate-span" style={{color: 'red'}}>
                                            아이디는 중복 확인이 필수입니다.</span>}
                                <label className="form-label">
                                    비밀번호 <span style={{color: 'red'}}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="ex) 6자 이상"
                                    className="form-input"
                                    ref={this.passwordInputRef}
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
                                        ref={this.tel1InputRef}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>-</span>
                                    <input
                                        type="text"
                                        placeholder="1234"
                                        className="form-input"
                                        style={{width: '30%'}}
                                        ref={this.tel2InputRef}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>-</span>
                                    <input
                                        type="text"
                                        placeholder="5678"
                                        className="form-input"
                                        style={{width: '30%'}}
                                        ref={this.tel3InputRef}
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
                                        ref={this.email1InputRef}
                                    />
                                    <span style={{marginRight: '2%', marginLeft: '2%', marginTop: '1%'}}>@</span>
                                    <input
                                        type="text"
                                        placeholder="test.com"
                                        className="form-input"
                                        style={{width: '60%'}}
                                        ref={this.email2InputRef}
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
                                <button className="form-button" onClick={this.handleSubmit}>
                                    등록
                                </button>
                            </div>
                        </Box>
                    </main>
                </section>
            </div>
        );
    }
}

export default EmployeeAddModal;