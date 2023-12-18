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

export type Employee = {
    employeeNo: number,
    id: string,
    password: string,
    name: string,
    role: string,
    tel: string,
    email: string
}

export type AddEmployee = {
    employeeNo: number,
    id: string,
    password: string,
    name: string,
    role: string,
    tel: string,
    email: string
}

export type UpdateAuthEmployee = {
    employeeNo: number
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

export type IdDuplicate = {
    availability: boolean,
}

export type EmployeeNoDuplicate = {
    availability: boolean,
}

export type AuthState = {
    idDuplicate: IdDuplicate,
    employeeNoDuplicate: EmployeeNoDuplicate
    search: Search,
    employeePage: EmployeePage,
    employee: Employee,
    updateAuthEmployee: UpdateAuthEmployee,
    image: Image,
    addEmployee: (addEmployee: AddEmployee) => void,
    deleteEmployee: (employeeNo: number) => void,
    updateEmployee: (updateAuthEmployee: UpdateAuthEmployee) => void,
    employeeNoCheck: (employeeNo: number) => void,
    idCheck: (id: string) => void,
    cleanEmployee: () => void,
    setSearch: (employeeNo: number, name: string) => void,
    setSearchRole: (role: string) => void,
    setPage: (page: number) => void,
    getEmployeeList: () => void,
    getEmployee: (employeeNo: number) => void,
    addImage: (employeeNo: number, image: File) => void,
    updateImage: (employeeNo: number, image: File) => void,
    deleteImage: (employeeNo: number) => void,
    getInitEmployee: () => void,
    cleanAvailabilites: () => void,
}

export type AuthPath = {
    employeeNo: number
}
