import React, {ChangeEvent, Component} from "react";
import {AuthContext} from "../../store/Auth/auth-context";
import {Box, Button, Grid, InputAdornment, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {
    Attachment,
    BusinessCenter,
    CloudUploadOutlined,
    Edit,
    Email, Fingerprint,
    Person,
    Phone,
    VerifiedUser
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Numbers from '@material-ui/icons/AllInclusive';
import Password from '@material-ui/icons/Lock';
import {Switch} from "react-router-dom";
import {EmployeeState} from "../../object/Employee/employee-object";
import {AuthState} from "../../object/Auth/auth-object";

interface AddEmployeeFormState {
    isAdmin: boolean;
    selectedImage: File | null;
    isIdValid: boolean;
    isEmployeeNoValid: boolean;
    isSubmitDisabled: boolean;
    showEditIcons: boolean[];
    idError: string;
    employeeNoError: string;
    pwError: string;
    telError: string;
    emailError: string;
}

class AddEmployee extends Component<{}, AddEmployeeFormState>{
    static contextType = AuthContext;

    private nameInputRef = React.createRef<HTMLInputElement>();
    private employeeNoInputRef = React.createRef<HTMLInputElement>();
    private idInputRef = React.createRef<HTMLInputElement>();
    private passwordInputRef = React.createRef<HTMLInputElement>();
    private telInputRef = React.createRef<HTMLInputElement>();
    private emailInputRef = React.createRef<HTMLInputElement>();

    constructor(props: {}) {
        super(props);

        this.state = {
            isAdmin: false,
            selectedImage: null,
            isIdValid: false,
            isEmployeeNoValid: false,
            isSubmitDisabled: true,
            showEditIcons: Array(7).fill(true),
            idError: '',
            employeeNoError: '',
            pwError: '',
            telError: '',
            emailError: '',
        };
    }

    // admin 여부
    handleAdminSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ isAdmin: event.target.checked });
    };

    // 입력시 펜아이콘 보이고 안보이고 설정
    handleInputClick = (index: number) => {
        const updatedIcons = [...this.state.showEditIcons];
        updatedIcons[index] = false;
        this.setState({
            showEditIcons: updatedIcons,
        });
    };

    handleInputBlur = (index: number) => {
        const updatedIcons = [...this.state.showEditIcons];
        updatedIcons[index] = true;
        this.setState({
            showEditIcons: updatedIcons,
        });
    };

    // 중복 검사
    checkDuplicate = async (fieldLabel: string) => {
        const state = this.context as AuthState;

        this.setState({
            isSubmitDisabled: false,
        });

        if(fieldLabel === '아이디'){
            const enteredId = this.idInputRef.current?.value;
            console.log(enteredId);
            if(enteredId){
                await state.idCheck(enteredId);
                this.setState({
                    isIdValid: true,
                    isSubmitDisabled: !(this.state.isSubmitDisabled && this.state.isAdmin),
                });
            }
        }else if(fieldLabel === '사번'){
            const enteredEmployeeNo = this.employeeNoInputRef.current?.value;
            const etEmployeeNo = Number(enteredEmployeeNo);
            if(enteredEmployeeNo){
                await state.employeeNoCheck(etEmployeeNo);
                this.setState({
                    isEmployeeNoValid: true,
                    isSubmitDisabled: !(this.state.isSubmitDisabled && this.state.isAdmin),
                });
            }
        }
    };

    /* Validate 검사 */

    validateId = (id: string) => {
        const idPattern = /^[a-zA-Z0-9]{4,}$/;
        if(!idPattern.test(id)){
            this.setState({
                idError: '아이디는 최소 4자리 문자 또는 숫자여야 합니다.',
            });
        }else {
            this.setState({
                idError: '',
            });
        }
    };

    validateEmployeeNo = (no: number) => {
        const employeeNoPattern = /^[0-9]{6}$/;
        if(!employeeNoPattern.test(String(no))){
            this.setState({
                employeeNoError: '사번은 입사연도(2) + 무작위 4자리여야 합니다.  ex)230001',
            });
        }else{
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

    validateTel = (tel: string) => {
        const telPattern = /^[0-9]{11}$/;
        if (!telPattern.test(tel)) {
            this.setState({
                telError: "'-'없이 숫자만 입력해주세요.",
            });
        } else {
            this.setState({
                telError: '',
            });
        }
    };

    validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailPattern.test(email)) {
            this.setState({
                emailError: '아이디@도메인 형식으로 입력해주세요.',
            });
        } else {
            this.setState({
                emailError: '',
            });
        }
    };


    // 이미지
    handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            this.setState({
                selectedImage: imageFile,
            });
        }
    };

    handleDropImage = (e: React.DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;

        if(droppedFiles && droppedFiles.length > 0) {
            const imageFile = droppedFiles[0];
            this.setState({
                selectedImage: imageFile,
            });
        }
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const state = this.context as AuthState;
        e.preventDefault();

        if(!this.state.isSubmitDisabled){
            alert('아이디와 사번 중복 확인을 진행해야 합니다.');
            return;
        }

        if(this.state.idError || this.state.employeeNoError || this.state.pwError || this.state.telError ||
            this.state.emailError){
            alert('올바르지 않은 입력값이 존재합니다!');
            return;
        }

        try{
            const userData = {
                name: this.nameInputRef.current?.value || '',
                employeeNo: Number(this.employeeNoInputRef.current?.value) || 0,
                id: this.idInputRef.current?.value || '',
                password: this.passwordInputRef.current?.value || '',
                tel: this.telInputRef.current?.value || '',
                email: this.emailInputRef.current?.value || '',
                role: this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_MEMBER',
            };

            if(this.state.selectedImage){
                state.addImage(userData.employeeNo, this.state.selectedImage);
            }

            await state.addEmployee(userData);

        }catch (error) {
            console.log("Error: " + error);
        }
    }

    render() {
        const {
            isAdmin,
            selectedImage,
            showEditIcons,
            isSubmitDisabled,
            idError,
            employeeNoError,
            pwError,
            telError,
            emailError
        } = this.state;

        return(
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                maxHeight='100vh'
                sx={{ mt: 13, mb: 5 }}
            >
                <Paper
                    elevation={1}
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        padding: '20px',
                    }}
                >
                    <Typography variant='h6' align='center' style={{ marginBottom: 2 }}>
                        사원 등록
                    </Typography>
                    <Divider></Divider>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={1} alignItems='center'
                              style={{ marginTop: 1, marginBottom: 2, width: '100%' }}>
                            <Grid item>
                                <Person />
                            </Grid>
                            <Grid item style={{marginLeft: 3, width: '93%' }}>
                                <TextField
                                    placeholder = '이름을 입력해주세요.'
                                    fullWidth
                                    variant = 'standard'
                                    name='name'
                                    type='text'
                                    InputProps={{
                                        endAdornment: showEditIcons[0] ? (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => this.handleInputClick(0)}>
                                                    <Edit />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                    InputLabelProps = {{
                                        shrink: true,
                                    }}
                                    label='이름'
                                    onFocus={() => this.handleInputClick(0)}
                                    onBlur={() => this.handleInputBlur(0)}
                                    inputRef={this.nameInputRef}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems='center' style={{marginTop: 1, marginBottom: 2, width: '100%'}}>
                            <Grid item>
                                <BusinessCenter />
                            </Grid>
                            <Grid item style={{marginLeft: 3, width: '93%'}}>
                                <TextField
                                    placeholder='사번을 입력해주세요.'
                                    fullWidth
                                    variant='standard'
                                    name='employeeNo'
                                    type='number'
                                    InputProps = {{
                                        endAdornment: showEditIcons[1] ? (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => this.handleInputClick(1)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => this.checkDuplicate('사번')}
                                                            style={{ padding: 1, fontSize: '0.75rem'}}>
                                                    중복 확인
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='사번'
                                    onFocus={() => this.handleInputClick(1)}
                                    onBlur={() => this.handleInputBlur(1)}
                                    inputRef={this.employeeNoInputRef}
                                    onChange={(e) => this.validateEmployeeNo(Number(e.target.value))}
                                    error={Boolean(employeeNoError)}
                                    helperText={employeeNoError}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems='center' style={{marginTop: 1, marginBottom: 2, width: '100%'}}>
                            <Grid item>
                                <Fingerprint />
                            </Grid>
                            <Grid item style={{ marginLeft: 3, width: '93%' }}>
                                <TextField
                                    placeholder='아이디를 입력해주세요.'
                                    fullWidth
                                    variant='standard'
                                    name='id'
                                    type='text'
                                    InputProps={{
                                        endAdornment: showEditIcons[2] ? (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => this.handleInputClick(2)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => this.checkDuplicate('아이디')}
                                                            style={{ padding: 1, fontSize: '0.75rem' }}>
                                                    중복 확인
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='아이디'
                                    onFocus={() => this.handleInputClick(2)}
                                    onBlur={() => this.handleInputBlur(2)}
                                    inputRef={this.idInputRef}
                                    onChange={(e) => this.validateId(e.target.value)}
                                    error={Boolean(idError)}
                                    helperText={idError}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems='center' style={{ marginTop: 1, marginBottom: 2, width: '100%' }}>
                            <Grid item>
                                <Password />
                            </Grid>
                            <Grid item style={{ marginLeft: 3, width: '93%' }}>
                                <TextField
                                    placeholder='비밀번호를 입력해주세요.'
                                    fullWidth
                                    variant='standard'
                                    name='password'
                                    type='password'
                                    InputProps={{
                                        endAdornment: showEditIcons[3] ? (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => this.handleInputClick(3)}>
                                                    <Edit />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='비밀번호'
                                    onFocus={() => this.handleInputClick(3)}
                                    onBlur={() => this.handleInputBlur(3)}
                                    inputRef={this.passwordInputRef}
                                    onChange={(e) => this.validatePassword(e.target.value)}
                                    error={Boolean(pwError)}
                                    helperText={pwError}
                                />
                            </Grid>
                        </Grid>
                    <Grid container spacing={1} alignItems='center' style={{ marginTop: 1, marginBottom: 2, width: '100%' }}>
                        <Grid item>
                            <Phone />
                        </Grid>
                        <Grid item style={{ marginLeft: 3, width: '93%' }}>
                            <TextField
                                placeholder='연락처를 입력해주세요.'
                                fullWidth
                                variant='standard'
                                name='tel'
                                type='text'
                                InputProps={{
                                    endAdornment: showEditIcons[4] ? (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => this.handleInputClick(4)}>
                                                <Edit />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label='연락처'
                                onFocus={() => this.handleInputClick(4)}
                                onBlur={() => this.handleInputBlur(4)}
                                inputRef={this.telInputRef}
                                onChange={(e) => this.validateTel(e.target.value)}
                                error={Boolean(telError)}
                                helperText={telError}
                                />
                        </Grid>
                    </Grid>
                        <Grid container spacing={1} alignItems='center' style={{ marginTop: 1, marginBottom: 2, width: '100%' }}>
                            <Grid item>
                                <Email />
                            </Grid>
                            <Grid item style={{ marginLeft: 3, width: '93%' }}>
                                <TextField
                                    placeholder='이메일을 입력해주세요.'
                                    fullWidth
                                    variant='standard'
                                    name='email'
                                    type='text'
                                    InputProps={{
                                        endAdornment: showEditIcons[5] ? (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => this.handleInputClick(5)}>
                                                    <Edit />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label='이메일'
                                    onFocus={() => this.handleInputClick(5)}
                                    onBlur={() => this.handleInputBlur(5)}
                                    inputRef={this.emailInputRef}
                                    onChange={(e) => this.validateEmail(e.target.value)}
                                    error={Boolean(emailError)}
                                    helperText={emailError}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems='center' style={{marginTop: 1, marginBottom: 2}}>
                            <Grid item>
                                <VerifiedUser />
                            </Grid>
                            <Grid item style={{ marginLeft: 3}}>
                                <Typography variant='body1'>Admin</Typography>
                            </Grid>
                            <Grid item style={{ marginLeft: 'auto' }}>
                                <div>
                                    <label style={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                        width: '58px',
                                        height: '28px',
                                        background: isAdmin ? '#aabadd' : '#fff',
                                        border: isAdmin ? '2px solid #aabadd' : '2px solid #aabadd',
                                        borderRadius: '20px',
                                        transition: '0.2s',
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={isAdmin}
                                            onChange={this.handleAdminSwitchChange}
                                            style={{
                                                position: 'absolute',
                                                appearance: 'none',
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'none',
                                            }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            left: isAdmin ? '34px' : '3px',
                                            display: 'inline-block',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '20px',
                                            background: isAdmin ? '#fff' : '#aabadd',
                                            transition: '0.2s',
                                            boxShadow: isAdmin ? '1px 2px 3px #00000020' : 'none',
                                        }}></span>
                                    </label>
                                </div>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                        <Grid container spacing={1} style={{ marginTop: 1, marginBottom: 5, width: '100%' }}>
                            <Grid item>
                                <Attachment />
                            </Grid>
                            <Grid item style={{ marginLeft: 3, width: '90%' }}>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'
                                    border='2px dashed #bdbdbd'
                                    borderRadius='4px'
                                    width='100%'
                                    padding='20px'
                                    onDrop={this.handleDropImage}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <img
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
                                        alt=''
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CloudUploadOutlined style={{ fontSize: 48 }} />
                                    <Typography variant='caption' align='center'>
                                        Drag the file here
                                    </Typography>
                                    <Button variant='contained' color='primary' component='label' style={{ cursor: 'pointer' }}>
                                        Click Here
                                        <input type='file' accept='image/*' style={{ display: 'none' }} onChange={this.handleImageChange} />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant='contained' color='secondary' style={{ width: '50' }}>
                                Cancel
                            </Button>
                            <Box sx={{ width: 5 }}></Box>
                            <Button type='submit' variant='contained' color='primary' style={{ width: '50' }}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        );
    }
}

export default AddEmployee;