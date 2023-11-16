import {DeleteDeliveryInstruction} from "../DeliveryInstruction/delivery-instruction-object";

export type AddDeliveryObj = {
    deliveryDate: string,
}

export type DeliverySearch = {
    progressStatus: string,
    employeeName: string,
    startDate: string,
    endDate: string,
    page: number,
    pageSize: number
}

export type AddDeliveryInstruction = {
    instructionNo : string
    productName:string,
    remainAmount: number,
    amount: number
}

export type UpdateDelivery = {
    deliveryDate: string,
}

export type DeliveryPage = {
    deliveries: DeliveryList[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export type DeliveryList = {
    deliveryNo: string,
    employeeName: string,
    deliveryDate: string,
    deliveryStatus: string,
    instructionCount: number
}

export type Delivery = {
    deliveryNo: string,
    employeeName: string,
    deliveryDate: string,
    deliveryStatus: string
    instructions: Instructions[],
}

export type Instructions = {
    instructionNo: string,
    employeeName: string,
    customerName: string,
    instructionDate: string,
    expirationDate: string,
    productNo: number,
    productCode: string,
    productName: string,
    amount: number
}

/* state */
export type DeliveriesState = {
    search: DeliverySearch,
    deliveryPage: DeliveryPage,
    delivery: Delivery,
    instructions: Instructions,
    addDeliveryObj: AddDeliveryObj,
    setSearch(employeeName: string, startDate: string, endDate: string): void,
    setSearchProgressStatus(progressStatus: string): void,
    setPage(page: number): void,
    getDeliveryList(): void,
    getDelivery(deliveryNo: string): void
    addDelivery(addDeliveryObj: AddDeliveryObj): void,
    deleteDeliveryInstruction(deleteDeliveryInstructionObj: DeleteDeliveryInstruction): void,
}
