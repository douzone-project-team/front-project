import React, {Component} from 'react';
import EmployeeAction from "./employee-action";
import {EmployeeState, Message, UpdateEmployee} from "../../object/Employee/employee-object";
import Swal from "sweetalert2";
import {
    initialSearch,
    initialEmployeePage,
    initialUpdateEmployee,
    initialImage,
    initialIsSuccess,
    initialInstruction,
    initialDelivery, initialInstructionList, initialDeliveryList,
    initialEmployee, initialMessage, initialMessages,
} from "../../state/employeeStateMangement";
import CookieManager from "../../common/CookieManager";
// @ts-ignore
import {EventSourcePolyfill, NativeEventSource} from "event-source-polyfill";

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
    instructionList: initialInstructionList,
    deliveryList: initialDeliveryList,
    instruction: initialInstruction,
    delivery: initialDelivery,
    messages: initialMessages,
    message: initialMessage,
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
    myInstruction(): void {
    },
    myDelivery(): void{
    },
    getMessages(): void {
    },
    sendMessage(sendId: number, targetId: number, message: string): void {
    },
    deleteMessage(messageNo: number): void {
    },
});

export class EmployeeContextProvider extends Component<Props, EmployeeState> {

    state: EmployeeState = {
        isSuccess: initialIsSuccess,
        employee: initialEmployee,
        updateEmployeeObj: initialUpdateEmployee,
        image: initialImage,
        instructionList: initialInstructionList,
        deliveryList: initialDeliveryList,
        instruction: initialInstruction,
        delivery: initialDelivery,
        messages: initialMessages,
        message: initialMessage,
        login: (id: string, password: string) => {
            employeeAction.login(id, password)
                .then((result) => {
                    // 로그인 성공시 accessToken 은 로컬에 저장, refreshToken 은 cookie 로 저장
                    const data = result?.data;
                    const {accessToken, refreshToken} = data;
                    localStorage.setItem('accessToken', accessToken);

                    let eventSource = null;
                    const EventSource = EventSourcePolyfill || NativeEventSource;
                    eventSource = new EventSource(
                        `/sse/getMessage`,
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                            },
                            withCredentials: true,
                        }
                    );

                    // @ts-ignore
                    eventSource.onmessage = (event) => {
                        const eventData = event.data;

                    };

                    this.setState({employee: data}, async () => {
                        await this.state.getMe();
                        window.location.href = '/main-page';
                    })
                }).catch((error) => {
                this.printErrorAlert(error);
            })
        },

        logout: () => {
            employeeAction.logout();
            localStorage.removeItem('employee');
            localStorage.removeItem('accessToken');
            Swal.fire({
                icon: "success",
                text: "로그아웃 되었습니다.",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href="/login";
            });
        },

        cleanEmployee: () => {
            this.setState({employee: initialEmployee});
        },

        getMe: async () => {
            await employeeAction.getMe()
                .then(result => {
                    let data = result?.data;
                    const employeeData = {
                        employeeNo: data.employeeNo,
                        name: data.name,
                        role: data.role
                    };
                    this.setState({employee: data}, () => {
                        localStorage.setItem('employee', JSON.stringify(employeeData));
                    })
                }).catch((error) => {
                    this.printErrorAlert(error);
                });
        },

        getEmployee: (employeeNo: number) => {
            employeeAction.getEmployee(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        updateEmployee: (employeeNo: number, updateEmployee: UpdateEmployee) => {
            employeeAction.updateEmployee(employeeNo, updateEmployee)
                .then(result => {
                    let data = result?.data;
                    this.setState({employee: data});
                    Swal.fire({
                        icon: "success",
                        text: `${data.name} 사원의 정보가 업데이트 되었습니다.`,
                    });
                    this.getEmployee(employeeNo);
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        addImage: (employeeNo: number, image: File) => {
            employeeAction.addImage(employeeNo, image)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        updateImage: (employeeNo: number, image: File) => {
            employeeAction.updateImage(employeeNo, image)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                    Swal.fire({
                        icon: "success",
                        text: "사진이 변경되었습니다.",
                    });
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        deleteImage: (employeeNo: number) => {
            employeeAction.deleteImage(employeeNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({image: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        myInstruction: () => {
            employeeAction.myInstruction()
                .then(result => {
                    let data = result?.data;
                    this.setState({instructionList: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        myDelivery: () => {
            employeeAction.myDelivery()
                .then(result => {
                    let data = result?.data;
                    this.setState({deliveryList: data});
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        getMessages :  () => {
             this.getMessages();
        },

        sendMessage: (sendId: number, targetId: number, message: string) => {
            employeeAction.sendMessage(sendId, targetId, message)
                .then(result => {
                    Swal.fire({
                        icon: "success",
                        text: "쪽지를 전송하였습니다!",
                    });
                    this.getMessages();
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        },

        deleteMessage: (messageNo: number) => {
            employeeAction.checkMessage(messageNo)
                .then(result => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "쪽지를 삭제하였습니다.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getMessages();
                }).catch((error) => {
                this.printErrorAlert(error);
            });
        }

    }

    getMessages = async () => {
        await employeeAction.getMessages()
            .then(result => {
                let data = result?.data;
                this.setState({ messages: data }, () => {
                });
            }).catch((error) => {
                this.printErrorAlert(error);
            });
    }

    getEmployee = (employeeNo: number) => {
        employeeAction.getEmployee(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            }).catch((error) => {
            this.printErrorAlert(error);
        });
    }

    printErrorAlert = (message: string) => {
        Swal.fire({
            icon: "warning",
            text: message
        });
    }

    render() {
        return (
            <EmployeeContext.Provider value={this.state}>
                {this.props.children}
            </EmployeeContext.Provider>
        );
    }
}
