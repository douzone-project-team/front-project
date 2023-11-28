import {AuthState, Employee, UpdateAuthEmployee} from "../../../object/Auth/auth-object";
import {Component} from "react";
import {Box} from "@material-ui/core";
import "./../../../assets/css/Modal.css"
import {AuthContext} from "../../../store/Auth/auth-context";

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
    employee: Employee,
    updateEmployee: () => void
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

class EmployeeModifyModal extends Component<EmployeeModalProps, EmployeeModalState>{
    static contextType = AuthContext;

    componentDidMount() {
        const state = this.context as AuthState;
        state.getEmployee(this.props.employeeNo);
    }

    constructor(props: EmployeeModalProps) {
        super(props);
        this.state = {
            employee: {
                employeeNo: 0,
                id: '',
                password: '',
                name: '',
                role: '',
                tel: '',
                email: '',
            },

            updateEmployee: () => {
                const {onClose, updateEmployee} = this.props as EmployeeModalProps;
                const employee = this.state.employee;
                updateEmployee(
                    this.props.employeeNo,
                    modifyValue.id || employee.id,
                    modifyValue.password || employee.password,
                    modifyValue.name || employee.name,
                    modifyValue.role || 'ROLE_ADMIN', //나중에 변경해야함
                    modifyValue.tel1+"-"+modifyValue.tel2+"-"+modifyValue.tel3 || employee.tel,
                    modifyValue.email || employee.email,
                )

                console.log(updateEmployee);
                onClose();
            }
        }
    }

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

        return(
            <div className='modal'>
                {status ? (
                    <section className='modal-container'
                             style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'350px'}}>
                        <header>
                            <button className="close" onClick={onClose}>
                                &times;
                            </button>
                        </header>
                        <main style={{border: "none", display: 'grid', placeItems: 'center'}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <label className="form-label">
                                    사번 :
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        value={employee.employeeNo}
                                        disabled
                                    />
                                </label>
                                <label className="form-label">
                                    아이디
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        defaultValue={employee.id}
                                        onChange={event => {
                                            modifyValue.id = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    비밀번호
                                    <input
                                        type="password"
                                        placeholder=""
                                        className="form-input"
                                        defaultValue={employee.password}
                                        onChange={event => {
                                            modifyValue.password = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    이름
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        defaultValue={employee.name}
                                        onChange={event => {
                                            modifyValue.name = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    관리자 여부
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        defaultValue={employee.role}
                                        onChange={event => {
                                            modifyValue.role = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    연락처
                                    <input
                                        type="text"
                                        placeholder="010"
                                        className="form-input"
                                        style={{width:'45px', marginLeft:'7px'}}
                                        defaultValue={telArray[0]}
                                        onChange = {event => {
                                            modifyValue.tel1 = event.target.value;
                                        }}
                                    /> -
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        className="form-input"
                                        style={{width:'45px', marginLeft:'7px'}}
                                        defaultValue={telArray[1]}
                                        onChange={event => {
                                            modifyValue.tel2 = event.target.value;
                                        }}
                                    /> -
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        className="form-input"
                                        style={{width:'45px', marginLeft:'7px'}}
                                        defaultValue={telArray[2]}
                                        onChange={event => {
                                            modifyValue.tel3 = event.target.value;
                                        }}
                                    />
                                </label>
                                <label className="form-label">
                                    이메일
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        defaultValue={employee.email}
                                        onChange={event => {
                                            modifyValue.email = event.target.value;
                                        }}
                                    />
                                </label>
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