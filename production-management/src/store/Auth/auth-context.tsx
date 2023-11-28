import React, {Component, useContext} from 'react';
import AuthAction from './auth-action'
import {AuthState, Employee, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {initialSearch,
        initialEmployee,
        initialEmployeePage,
        initialUpdateAuthEmployee} from "../../state/authStateManagement";
import EmployeeAction from "../Employee/employee-action";

const authAction = new AuthAction;
const employeeAction = new EmployeeAction();

export type Props = {
    children?: React.ReactNode;
}

export const AuthContext = React.createContext<AuthState>({
    search: initialSearch,
    employeePage: initialEmployeePage,
    employee: initialEmployee,
    updateAuthEmployee: initialUpdateAuthEmployee,
    addEmployee(employee: Employee): void {},
    deleteEmployee(employeeNo: number): void {},
    updateEmployee(updateAuthEmployee1: UpdateAuthEmployee): void {},
    employeeNoCheck(employeeNo: number): void {},
    idCheck(id: string): void {},
    cleanEmployee(): void{},
    setSearch(employeeNo: number, name: string): void {},
    setSearchRole(role: string): void {},
    setPage(page: number): void {},
    getEmployeeList(): void {},
    getEmployee(employeeNo: number): void {},

});

export class AuthContextProvider extends Component<Props, AuthState> {

    state: AuthState = {
        search: initialSearch,
        employeePage: initialEmployeePage,
        employee: initialEmployee,
        updateAuthEmployee: initialUpdateAuthEmployee,

        addEmployee: (object: Employee) => {
            authAction.regiEmployee(object)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                })
        },

        deleteEmployee: (employeeNo: number) => {
            authAction.deleteEmployee(employeeNo)
                .then(result => {
                    alert("삭제하였습니다.")
                    this.getEmployeeList();
                    this.setState({employee: initialEmployee});
                })
        },

        updateEmployee: (updateAuthEmployee: UpdateAuthEmployee) => {
            authAction.updateEmployee(updateAuthEmployee)
                .then(result => {
                    alert("수정을 성공하였습니다.")
                    this.state.getEmployee(updateAuthEmployee.employeeNo);
                    this.getEmployeeList();
                })
        },

        employeeNoCheck: (employeeNo: number) => {
            authAction.employeeNoCheck(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                })
        },

        idCheck: (id: string) => {
            authAction.idCheck(id)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                })
        },

        cleanEmployee: () => {
            this.setState({employee: initialEmployee });
        },

        setSearch: (employeeNo: number, name: string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    employeeNo: employeeNo,
                    name: name,
                },
            }), () => {
                console.log("검색 조건 : " + this.state.search.employeeNo, this.state.search.name);
                this.getEmployeeList();
            });
        },

        setSearchRole: (role: string) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    role: role,
                },
            }), () => {
                this.getEmployeeList();
            });
        },

        setPage: (page: number) => {
            this.setState((prevState) => ({
                search: {
                    ...prevState.search,
                    page: page,
                },
            }), () => {
                this.getEmployeeList();
            })
        },

        getEmployeeList: () => {
            this.getEmployeeList();
        },

        getEmployee: (employeeNo: number) => {
            authAction.getEmployee(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                })
        },
    }

    getEmployeeList = () => {
        authAction.getEmployeeList(this.state.search)
            .then((result) => {
                let data = result?.data;
                this.setState({employeePage: data});
            })
    };

    render() {
        return(
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
