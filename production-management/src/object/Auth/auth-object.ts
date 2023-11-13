export type LoginToken = {
    grantType: string,
    accessToken: string,
    tokenExpiresIn: number
}

export type Employee = {
    employeeNo: number,
    id: string,
    password: string,
    name: string,
    role: string,
    tel: string,
    email: string
}

export type UpdateAuthEmployee = {
    id: string,
    password: string,
    name: string,
    role: string,
    tel: string,
    email: string
}

export type AuthState = {
    employee: Employee,
    updateAuthEmployee: UpdateAuthEmployee,
    regiEmployee: (employee: Employee) => void,
    deleteEmployee: (employeeNo: number) => void,
    updateEmployee: (employeeNo: number, updateAuthEmployee1: UpdateAuthEmployee) => void,
    employeeNoCheck: (employeeNo: number) => void,
    idCheck: (id: string) => void,
}

export type AuthPath = {
    employeeNo: number
}
