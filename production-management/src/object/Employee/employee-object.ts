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

export type AllEmployeeList = {
    list: EmployeeList[],
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

export type Instruction = {
    instructionNo: string,
    instructionDate: string,
    expirationDate: string,
    progressStatus: string,
}

export type InstructionList = {
    list: Instruction[]
}

export type Delivery = {
    deliveryNo: string,
    deliveryDate: string,
    progressStatus: string,
}

export type DeliveryList = {
    list: Delivery[]
}

export type Messages = {
    messages: Message[]
}

export type Message = {
    messageNo: number
    sendId: number
    sendName: string
    targetId: number
    targetName: string
    message: string
    sendTime: string
}

export type EmployeeState = {
    isSuccess: IsSuccess,
    employee: Employee,
    updateEmployeeObj: UpdateEmployee,
    image: Image,
    instructionList: InstructionList,
    deliveryList: DeliveryList,
    instruction: Instruction,
    employeeList: AllEmployeeList,
    delivery: Delivery,
    message: Message,
    messages: Messages,
    login: (id: string, password: string) => void,
    logout: () => void,
    cleanEmployee: () => void,
    getMe: () => void,
    getEmployee: (employeeNo: number) => void,
    getEmployeeList : () => void,
    updateEmployee: (employeeNo: number, object: UpdateEmployee) => void,
    addImage: (employeeNo: number, image: File) => void,
    updateImage: (employeeNo: number, image: File) => void,
    deleteImage: (employeeNo: number) => void,
    myInstruction: () => void,
    myDelivery: () => void,
    getMessages: () => void
    sendMessage: (sendId: number, targetId: number, message: string) => void
    deleteMessage: (messageNo: number) => void
}

/* path variables */
export type EmployeePath = {
    employeeNo : number
}