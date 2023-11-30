export type IsSuccess = boolean;

export type Search = {
    employeeNo: number,
    name: string,
    role: string,
    size: number,
    page: number
}

export type EmployeeList = {
    employeeNo: number,
    name: string,
    role: string,
    email: string
    tel: string
}

export type EmployeePage = {
    list: EmployeeList[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export type UpdateEmployee = {
    oldPassword: string,
    password: string,
    name: string,
    tel : string,
    email: string,
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

export type Image = {
    image: File | null;
}

export type EmployeeState = {
    isSuccess: IsSuccess,
    employee: Employee,
    updateEmployeeObj: UpdateEmployee,
    image: Image,
    login: (id: string, password: string) => void,
    logout: () => void,
    cleanEmployee: () => void,
    getMe: () => void,
    getEmployee: (employeeNo: number) => void,
    updateEmployee: (employeeNo: number, object: UpdateEmployee) => void,
    addImage: (employeeNo: number, image: File) => void,
    updateImage: (employeeNo: number, image: File) => void,
    deleteImage: (employeeNo: number) => void
}

/* path variables */
export type EmployeePath = {
    employeeNo : number
}