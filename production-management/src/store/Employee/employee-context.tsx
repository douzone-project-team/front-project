import React, {Component} from 'react';
import EmployeeAction from "./employee-action";
import {EmployeeState, UpdateEmployee} from "../../object/Employee/employee-object";
import {
    initialSearch,
    initialEmployeePage,
    initialUpdateEmployee,
    initialImage,
    initialIsSuccess,
    initialEmployee,
} from "../../state/employeeStateMangement";
import CookieManager from "../../common/CookieManager";

const employeeAction = new EmployeeAction();
const cookieManager = new CookieManager();

export type Props = {
    children?: React.ReactNode;
}

export const EmployeeContext = React.createContext<EmployeeState>({
    isSuccess: initialIsSuccess,
    employee: initialEmployee,
    updateEmployeeObj: initialUpdateEmployee,
    image: initialImage,
    login(id: string, password: string): void {
    },
    logout(): void {
    },
    cleanEmployee(): void{
    },
    getMe(): void {
    },
    getEmployee(employeeNo: number): void {
    },
    updateEmployee(employeeNo: number, updateEmployee: UpdateEmployee): void {
    }, // 사원 스스로 업데이트
    addImage(employeeNo: number, image: File): void {
    },
    updateImage(employeeNo: number, image: File): void {
    },
    deleteImage(employeeNo: number): void {
    },
});

export class EmployeeContextProvider extends Component<Props, EmployeeState> {

    state: EmployeeState = {
        isSuccess: initialIsSuccess,
        employee: initialEmployee,
        updateEmployeeObj: initialUpdateEmployee,
        image: initialImage,

        login: (id: string, password: string) => {
            employeeAction.login(id, password)
                .then((result) => {
                    // 로그인 성공시 accessToken 은 로컬에 저장, refreshToken 은 cookie 로 저장
                    const data = result?.data;
                    const {accessToken, refreshToken} = data;
                    localStorage.setItem('accessToken', accessToken);
                    cookieManager.setCookie('refreshToken', refreshToken);

                    // 이후 employee /me 로 접근해서 정보를 얻어와 employee에 저장후 메인 페이지로 보냄
                    // TODO : localStorage employeeNo 저장 - 적용 O
                    // TODO : employee 조회 로직 - 적용 O
                    // TODO : F5 누를경우 사용자 정보는 어떤 방식으로 유지되도록 할 것인지. - 적용 X
                    // TODO : isSuccess 필요성 체크 이후 필요없으면 제거 - 적용 X

                    this.setState({employee: data}, () => {
                        this.getMe();
                        window.location.href = '/';
                    })
                })
        },

        logout: () => {
            employeeAction.logout();
            localStorage.removeItem('employee');
            localStorage.removeItem('accessToken');
        },

        cleanEmployee: () => {
            this.setState({employee: initialEmployee });
        },

        getMe: () => {
            this.getMe();
        },

        getEmployee: (employeeNo: number) => {
            employeeAction.getEmployee(employeeNo)
                .then(result => {
                    let data = result?.data;
                    console.log('getEmployee: ' + data);
                    this.setState({employee: data});
                })
        },

        updateEmployee: (employeeNo: number, updateEmployee: UpdateEmployee) => {
            employeeAction.updateEmployee(employeeNo, updateEmployee)
                .then(result => {
                    alert('수정을 완료하였습니다.');
                    let data = result?.data;
                    this.setState({employee: data});
                    this.getEmployee(employeeNo);
                });
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

    getMe = () => {
        employeeAction.getMe()
            .then(result => {
                let data = result?.data;
                const employeeData = {
                    employeeNo: data.employeeNo,
                    name: data.name,
                };
                this.setState({employee: data}, () => {
                    localStorage.setItem('employee', JSON.stringify(employeeData));
                    console.log(localStorage.getItem('employee'));
                })
            });
    }

    getEmployee =  (employeeNo: number) => {
        employeeAction.getEmployee(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }


    render() {
        return (
            <EmployeeContext.Provider value={this.state}>
                {this.props.children}
            </EmployeeContext.Provider>
        );
    }
}
