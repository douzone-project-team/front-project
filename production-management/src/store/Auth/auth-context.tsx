import React, {Component, useContext} from 'react';
import AuthAction from './auth-action'
import {AuthState, Employee, UpdateAuthEmployee} from "../../object/Auth/auth-object";
import {
    initialSearch,
    initialEmployee,
    initialEmployeePage,
    initialUpdateAuthEmployee, initialImage
} from "../../state/authStateManagement";
import EmployeeAction from "../Employee/employee-action";
import {Image} from "../../object/Employee/employee-object";

const authAction = new AuthAction;
const employeeAction = new EmployeeAction();

export type Props = {
    children?: React.ReactNode;
}

export const AuthContext = React.createContext<AuthState>({
    availability: false,
    search: initialSearch,
    employeePage: initialEmployeePage,
    employee: initialEmployee,
    updateAuthEmployee: initialUpdateAuthEmployee,
    image: initialImage,
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
    addImage(employeeNo: number, image: File): void {},
    updateImage(employeeNo: number, image: File): void {},
    deleteImage(employeeNo: number): void {},
});

export class AuthContextProvider extends Component<Props, AuthState> {

    state: AuthState = {
        availability: false,
        search: initialSearch,
        employeePage: initialEmployeePage,
        employee: initialEmployee,
        updateAuthEmployee: initialUpdateAuthEmployee,
        image: initialImage,

        addEmployee: (object: Employee) => {
            authAction.addEmployee(object)
                .then(result => {
                    alert('사원 등록이 완료되었습니다.');
                    let data = result?.data;
                    this.setState({employee: data});
                })
        },

        deleteEmployee: (employeeNo: number) => {
            authAction.deleteEmployee(employeeNo)
                .then(result => {
                    alert("사원을 삭제하였습니다.")
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

        employeeNoCheck: async (employeeNo: number) => {
            authAction.employeeNoCheck(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({availability : data},() => {
                        if(result?.data.availability){
                            alert('사용 가능한 사번입니다.');
                        }else{
                            alert('이미 사용 중인 번호입니다. 다른 번호를 선택해주세요.');
                        }
                    });
                })
        },

        idCheck: async (id: string) => {
            authAction.idCheck(id)
                .then(result => {
                    let data = result?.data;
                    this.setState({availability: data}, () => {
                        if (result?.data.availability) {
                            alert('사용 가능한 아이디입니다..');
                        } else {
                            alert('이미 사용 중인 아이디입니다. 다른 번호를 선택해주세요.');
                        }
                    });
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

        addImage: (employeeNo: number, image: File) => {
            employeeAction.addImage(employeeNo, image)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                });
        },

        updateImage: (employeeNo: number, image: File) => {
            employeeAction.updateImage(employeeNo, image)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                });
        },

        deleteImage: (employeeNo: number) => {
            employeeAction.deleteImage(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                });
        }
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
