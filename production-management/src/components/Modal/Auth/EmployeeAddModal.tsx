import React, {ChangeEvent, Component} from "react";
import {AuthContext} from "../../../store/Auth/auth-context";
import {AuthState} from "../../../object/Auth/auth-object";
import {Box, Grid, Paper, TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
// @ts-ignore
import defaultImage from "../../../images/default-image.jpg";
import {EmployeeState} from "../../../object/Employee/employee-object";

import './EmployeeAddModal.css';

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
    isIdValid: boolean;
    isEmployeeNoValid: boolean;
    isSubmitDisabled: boolean;
    idError: string;
    employeeNoError: string;
    pwError: string;
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
            isIdValid: false,
            isEmployeeNoValid: false,
            isSubmitDisabled: false,
            idError: '',
            employeeNoError: '',
            pwError: '',
        };
    }

    // admin 여부
    handleAdminSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({isAdmin: event.target.checked});
    };

    // 중복 검사
    checkIdDuplicate = async () => {
        const state = this.context as AuthState;
        const enteredId = this.idInputRef.current?.value;

        if (enteredId) {
            await state.idCheck(enteredId);

            this.setState({
                isIdValid: true
            });
        }
    };

    checkEmployeeNoDuplicate = async () => {
        const state = this.context as AuthState;

        const enteredEmployeeNo = this.employeeNoInputRef.current?.value;
        const etEmployeeNo = Number(enteredEmployeeNo);
        if (enteredEmployeeNo) {
            await state.employeeNoCheck(etEmployeeNo);

            this.setState({
                isEmployeeNoValid: true,
            });

        }
    };

    /* Validate 검사 */

    validateId = (id: string) => {
        const idPattern = /^[a-zA-Z0-9]{4,}$/;
        if (!idPattern.test(id)) {
            this.setState({
                idError: '아이디는 최소 4자리 문자 또는 숫자여야 합니다.',
            });
        } else {
            this.setState({
                idError: '',
            });
        }
    };

    validateEmployeeNo = (no: number) => {
        const employeeNoPattern = /^[0-9]{6}$/;
        if (!employeeNoPattern.test(String(no))) {
            this.setState({
                employeeNoError: '사번은 입사연도(2) + 무작위 4자리여야 합니다.  ex)230001',
            });
        } else {
            this.setState({
                employeeNoError: '',
            });
        }
    };

    validatePassword = (password: string) => {
        const passwordPattern = /^[a-zA-Z0-9]{6,}$/;
        if (!passwordPattern.test(String(password))) {
            this.setState({
                pwError: '비밀번호는 6자리 이상이여야 합니다.',
            });
        } else {
            this.setState({
                pwError: '',
            });
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

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const state = this.context as AuthState;
        e.preventDefault();

        const {
            idError,
            employeeNoError,
            pwError,
            isIdValid,
            isEmployeeNoValid,
        } = this.state;

        if (
            !this.nameInputRef.current?.value ||
            !this.passwordInputRef.current?.value ||
            idError ||
            employeeNoError ||
            pwError ||
            !isIdValid ||
            !isEmployeeNoValid
        ) {
            if (idError || employeeNoError || pwError) {
                alert('올바르지 않은 입력값이 존재하거나 중복 확인이 필요합니다!');
            }
            return;
        }

        try {
            const tel1 = this.tel1InputRef.current?.value || '';
            const tel2 = this.tel2InputRef.current?.value || '';
            const tel3 = this.tel3InputRef.current?.value || '';

            const email1 = this.email1InputRef.current?.value || '';
            const email2 = this.email2InputRef.current?.value || '';

            const userData = {
                name: this.nameInputRef.current?.value || '',
                employeeNo: Number(this.employeeNoInputRef.current?.value) || 0,
                id: this.idInputRef.current?.value || '',
                password: this.passwordInputRef.current?.value || '',
                tel: tel1 + tel2 + tel3,
                email: email1 + email2,
                role: this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_MEMBER',
            };

            if (this.state.selectedImage) {
                state.addImage(userData.employeeNo, this.state.selectedImage);
            }

            await state.addEmployee(userData);

            // 등록 성공 후 각 TextField의 값 초기화
            this.nameInputRef.current!.value = '';
            this.employeeNoInputRef.current!.value = '';
            this.idInputRef.current!.value = '';
            this.passwordInputRef.current!.value = '';
            this.tel1InputRef.current!.value = '';
            this.tel2InputRef.current!.value = '';
            this.tel3InputRef.current!.value = '';
            this.email1InputRef.current!.value = '';
            this.email2InputRef.current!.value = '';


        } catch (error) {
            console.log("Error: " + error);
        }
    }

    render() {
        const {onClose} = this.props as EmployeeAddModalProps;
        const state = this.context as EmployeeState;

        const {
            isAdmin,
            selectedImage,
            idError,
            employeeNoError,
            pwError,
        } = this.state;

        return (
            <div className="modal">
                <section className='modal-container'
                         style={{
                             display: 'grid', gridTemplateRows: 'auto 1fr auto',
                             width: '800px', height: '650px'
                         }}>
                    <header>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </header>
                    <main style={{border: "none", display: 'grid', placeItems: 'center'}}>
                        <Box width='90%' display='flex' ml='auto' mr="auto">
                            <Grid
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '50px'
                                }}>
                                <Box>
                                    <img
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
                                        alt=''
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <button style={{
                                    backgroundColor: '#546ae8',
                                    width: '60px',
                                    height: '30px',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}>
                                    업로드
                                    <input type='file' accept='image/*' style={{display: 'none'}}
                                           onChange={this.handleImageChange}/>
                                </button>
                            </Grid>
                            <form onSubmit={this.handleSubmit}>
                                <Grid className="box">
                                    <TextField className="box-input"
                                               fullWidth size="small"
                                               variant='outlined'
                                               name='employeeNo'
                                               type='number'
                                               InputLabelProps={{
                                                   shrink: true,
                                                   classes: {
                                                       asterisk: 'redAsterisk',
                                                   },
                                               }}
                                               label={<span className="customLabel">사번 <span
                                                   style={{color: 'red'}}>&nbsp;*</span></span>}
                                               inputRef={this.employeeNoInputRef}
                                               onChange={(e) => this.validateEmployeeNo(Number(e.target.value))}
                                               error={Boolean(employeeNoError)}
                                               helperText={employeeNoError}
                                    />
                                    <button onClick={this.checkEmployeeNoDuplicate}>
                                        중복 확인
                                    </button>
                                </Grid>
                                <Grid className="box">
                                    <TextField className="box-input"
                                               fullWidth size="small"
                                               variant='outlined'
                                               name='id'
                                               type='text'
                                               InputLabelProps={{
                                                   shrink: true,
                                                   classes: {
                                                       asterisk: 'redAsterisk',
                                                   },
                                               }}
                                               label={<span className="customLabel">아이디 <span
                                                   style={{color: 'red'}}>&nbsp;*</span></span>}
                                               inputRef={this.idInputRef}
                                               onChange={(e) => this.validateId(e.target.value)}
                                               error={Boolean(idError)}
                                               helperText={idError}
                                    />
                                    <button onClick={this.checkIdDuplicate}>
                                        중복 확인
                                    </button>
                                </Grid>
                                <TextField className="box"
                                           fullWidth size="small"
                                           variant='outlined'
                                           name='password'
                                           type='password'
                                           InputLabelProps={{
                                               shrink: true,
                                               classes: {
                                                   asterisk: 'redAsterisk',
                                               },
                                           }}
                                           label={<span className="customLabel">비밀번호 <span
                                               style={{color: 'red'}}>&nbsp;*</span></span>}
                                           inputRef={this.passwordInputRef}
                                           onChange={(e) => this.validatePassword(e.target.value)}
                                           error={Boolean(pwError)}
                                           helperText={pwError}
                                />
                                <TextField className="box"
                                           fullWidth size="small"
                                           variant='outlined'
                                           name='name'
                                           type='text'
                                           InputLabelProps={{
                                               shrink: true,
                                               classes: {
                                                   asterisk: 'redAsterisk',
                                               },
                                           }}
                                           label={<span className="customLabel">이름 <span
                                               style={{color: 'red'}}>&nbsp;*</span></span>}
                                           inputRef={this.nameInputRef}
                                />
                                <Box style={{display: 'flex',}}>
                                    <TextField className="box"
                                               size="small"
                                               variant='outlined'
                                               name='tel1'
                                               type='number'
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               label='연락처'
                                               inputRef={this.tel1InputRef}
                                               style={{width: '30%', marginRight: '5px'}}
                                    />
                                    <span style={{marginTop: '10px'}}>-</span>
                                    <TextField className="box"
                                               size="small"
                                               variant='outlined'
                                               name='tel2'
                                               type='number'
                                               inputRef={this.tel2InputRef}
                                               style={{width: '35%', marginLeft: '5px', marginRight: '5px'}}
                                    />
                                    <span style={{marginTop: '10px'}}>-</span>
                                    <TextField className="box"
                                               fullWidth size="small"
                                               variant='outlined'
                                               name='tel3'
                                               type='number'
                                               inputRef={this.tel3InputRef}
                                               style={{width: '35%', marginLeft: '5px'}}
                                    />
                                </Box>
                                <Box style={{display: 'flex'}}>
                                    <TextField className="box"
                                               fullWidth size="small"
                                               variant='outlined'
                                               name='email1'
                                               type='text'
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               label='이메일'
                                               inputRef={this.email1InputRef}
                                               style={{width: '35%', marginRight: '6px'}}
                                    />
                                    <span style={{marginTop: '10px'}}>@</span>
                                    <TextField className="box"
                                               fullWidth size="small"
                                               variant='outlined'
                                               name='email1'
                                               type='text'
                                               inputRef={this.email2InputRef}
                                               style={{width: '60%', marginLeft: '7px'}}
                                    />
                                </Box>
                                <Box
                                    display="flex" alignItems="center" justifyContent="space-between"
                                    style={{marginBottom: '10px'}}
                                >
                                    <span style={{color: '#646464'}}>권한 <span style={{color: 'red'}}>*</span></span>
                                    <Box className="admin">
                                        <label style={{
                                            background: isAdmin ? '#5f8cff' : '#fff',
                                            border: isAdmin ? '2px solid #5f8cff' : '2px solid #5f8cff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '5px',
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={isAdmin}
                                                onChange={this.handleAdminSwitchChange}
                                                style={{display: 'none'}}
                                            />
                                            <span style={{
                                                left: isAdmin ? '45px' : '3px',
                                                background: isAdmin ? '#FFF' : '#5f8cff',
                                                boxShadow: isAdmin ? '1px 2px 3px #00000020' : 'none',
                                                color: isAdmin ? 'black' : 'white',
                                            }}>{isAdmin ? '관리자' : '사원'}</span>
                                        </label>
                                    </Box>
                                </Box>

                                <Divider></Divider>

                                <Box display='flex' justifyContent='center' alignItems='center'
                                     style={{marginTop: '20px'}}>
                                    <button type='submit' style={{
                                        width: '12%',
                                        height: '40px',
                                        backgroundColor: '#546ae8',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontSize: '14px'
                                    }}
                                    >
                                        등록
                                    </button>
                                </Box>
                            </form>
                        </Box>
                    </main>
                </section>
            </div>
        );
    }
}

export default EmployeeAddModal;