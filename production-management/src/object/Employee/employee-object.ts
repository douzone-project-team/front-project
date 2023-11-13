export type EmployeeSearch = {
    employeeNo: number,
    name: string,
    role: string,
    pageSize: number,
    page: number
}

export type EmployeeList = {
    employeeNo: number,
    name: string,
    tel: string,
    email: string
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
    employeeSearch: EmployeeSearch,
    employeePage: EmployeePage,
    employee: Employee,
    updateEmployeeObj: UpdateEmployee,
    image: Image,
    login: (id: string, password: string) => void,
    logout: () => void,
    getMe: (token: string) => void,
    getEmployee: (employeeNo: number) => void,
    setEmployeeNoAndNameAndRole: (employeeNo: number, name: string, role: string) => void,
    setPage: (page: number) => void,
    getEmployeeList: () => void,
    updateEmployee: (employeeNo: number, object: UpdateEmployee) => void,
    addImage: (employeeNo: number, image: File) => void,
    updateImage: (employeeNo: number, image: File) => void,
    deleteImage: (employeeNo: number) => void
}

/* path variables */
export type EmployeePath = {
    employeeNo : number
}