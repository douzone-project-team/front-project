import React, {Component} from 'react';
import EmployeeAction from "./employee-action";
import {EmployeeState, UpdateEmployee} from "../../object/Employee/employee-object";
import {
    initialEmployeeSearchState,
    initialEmployeePageState,
    initialEmployeeState,
    initialUpdateEmployeeState,
    initialImageState,
} from "../../state/employeeStateMangement";

const employeeAction = new EmployeeAction;

export type Props = {
    children?: React.ReactNode;
}

export const EmployeeContext = React.createContext<EmployeeState>({
    employeeSearch: initialEmployeeSearchState,
    employeePage: initialEmployeePageState,
    employee: initialEmployeeState,
    updateEmployeeObj: initialUpdateEmployeeState,
    image: initialImageState,
    login(id: string, password: string): void {
    },
    logout(): void {
    },
    getMe(token: string): void {
    },
    getEmployee(employeeNo: number): void {
    },
    setEmployeeNoAndNameAndRole(): void {
    },
    setPage(page: number): void {
    },
    getEmployeeList(): void {
    },
    updateEmployee(employeeNo: number, updateEmployee: UpdateEmployee): void {
    },
    addImage(employeeNo: number, image: File): void {
    },
    updateImage(employeeNo: number, image: File): void {
    },
    deleteImage(employeeNo: number): void {
    }
});

export class EmployeeContextProvider extends Component<Props, EmployeeState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            employeeSearch: initialEmployeeSearchState,
            employeePage: initialEmployeePageState,
            employee: initialEmployeeState,
            updateEmployeeObj: initialUpdateEmployeeState,
            image: initialImageState,
            login: this.login,
            logout: this.logout,
            getMe: this.getMe,
            getEmployee: this.getEmployee,
            setEmployeeNoAndNameAndRole: this.setEmployeeNoAndNameAndRole,
            setPage: this.setPage,
            getEmployeeList: this.getEmployeeList,
            updateEmployee: this.updateEmployee,
            addImage: this.addImage,
            updateImage: this.updateImage,
            deleteImage: this.deleteImage
        };
    }

    login = (id: string, password: string) => {
        employeeAction.login(id, password)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            })
    }

    logout = () => {
        employeeAction.logout();
    }

    getMe = (token: string) => {
        employeeAction.getMe(token)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            });
    }

    getEmployee = (employeeNo: number) => {
        employeeAction.getEmployee(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            });
    }

    setEmployeeNoAndNameAndRole = (employeeNo: number, name: string, role: string) => {
        this.setState((prevState) => ({
            employeeSearch: {
                ...prevState.employeeSearch,
                employeeNo: employeeNo,
                name: name,
                role: role,
            },
        }), () => {
            this.getEmployeeList();
        });
    }

    setPage = (page: number) => {
        this.setState((prevState) => ({
            employeeSearch: {
                ...prevState.employeeSearch,
                page: page,
            },
        }), () => {
            this.getEmployeeList();
        })
    }

    getEmployeeList = () => {
        employeeAction.getEmployeeList(this.state.employeeSearch)
            .then(result => {
                let data = result?.data;
                this.setState({employeePage: data});
            });
    }

    updateEmployee = (employeeNo: number, updateEmployee: UpdateEmployee) => {
        employeeAction.updateEmployee(employeeNo, updateEmployee)
            .then(result => {
                let data = result?.data;
                this.setState({employee: data});
            });
    }

    addImage = (employeeNo: number, image: File) => {
        employeeAction.addImage(employeeNo, image)
            .then(result => {
                let data = result?.data;
                this.setState({image: data});
            });
    }

    updateImage = (employeeNo: number, image: File) => {
        employeeAction.updateImage(employeeNo, image)
            .then(result => {
                let data = result?.data;
                this.setState({image: data});
            });
    }

    deleteImage = (employeeNo: number) => {
        employeeAction.deleteImage(employeeNo)
            .then(result => {
                let data = result?.data;
                this.setState({image: data});
            });
    }
}
