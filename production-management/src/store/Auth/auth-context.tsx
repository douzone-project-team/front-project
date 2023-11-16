import React, {Component, useContext} from 'react';
import AuthAction from './auth-action'
import {AuthState, Employee, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {initialEmployeeState, initialUpdateAuthEmployeeState} from "../../state/authStateManagement";
import CookieManager from "../../common/CookieManager";
import AxiosCookie from "../../common/AxiosCookie";

const authAction = new AuthAction;
const cookieManager = new CookieManager;

export type Props = {
    children?: React.ReactNode;
}

export const AuthContext = React.createContext<AuthState>({
    employee: initialEmployeeState,
    updateAuthEmployee: initialUpdateAuthEmployeeState,
    addEmployee(employee: Employee): void {},
    deleteEmployee(employeeNo: number): void {},
    updateEmployee(employeeNo: number, updateAuthEmployee1: UpdateAuthEmployee): void {},
    employeeNoCheck(employeeNo: number): void {},
    idCheck(id: string): void {},
});

export class AuthContextProvider extends Component<Props, AuthState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            employee: initialEmployeeState,
            updateAuthEmployee: initialUpdateAuthEmployeeState,
            addEmployee: this.addEmployee,
            deleteEmployee: this.deleteEmployee,
            updateEmployee: this.updateEmployee,
            employeeNoCheck: this.employeeNoCheck,
            idCheck: this.idCheck,
        };
    }

    addEmployee = (object: Employee) => {
        authAction.regiEmployee(object)
            .then(result => {
                let data = result?.data;

                this.setState({employee: data});
            })
    };

    deleteEmployee = (employeeNo: number) => {
        authAction.deleteEmployee(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }

    updateEmployee = (employeeNo: number, object: UpdateAuthEmployee) => {
        authAction.updateEmployee(employeeNo, object)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }

    employeeNoCheck = (employeeNo: number) => {
        authAction.employeeNoCheck(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }

    idCheck = (id: string) => {
        authAction.idCheck(id)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }

    render() {
        return(
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContext;