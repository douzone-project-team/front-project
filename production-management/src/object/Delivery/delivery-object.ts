import {
    AddDeliveryInstruction,
    AddProduct,
    DeleteDeliveryInstruction, UpdateDeliveryInstruction,
} from "../DeliveryInstruction/delivery-instruction-object";

/*
 * 조회
 */
export type DeliverySearch = {
    deliveryNo: string,
    progressStatus: string,
    employeeName: string,
    startDate: string,
    endDate: string,
    page: number,
    pageSize: number
}

export type DeliveryPage = {
    list: DeliveryList[],
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
    progressStatus: string,
    productNo: number,
    productCode: string,
    productName: string,
    amount: number,
}

/*
 * 추가
 */

export type AddDeliveryObj = {
    deliveryDate: string,
}

export type UpdateDelivery = {
    deliveryNo: string,
    deliveryDate: string,
}

export type NewDelivery = {
    deliveryNo: string,
    deliveryDate: string,
    instructions: DeliveryInstruction[],
}

export type DeliveryInstruction = {
    instructionNo: string,
    instructionDate: string,
    expirationDate: string,
    customerName: string,
    progressStatus: string,
    products: AddProduct[],
}

export type RemainAmount = {
    remainAmount: number,
}

/* state */
export type DeliveriesState = {
    search: DeliverySearch,
    deliveryPage: DeliveryPage,
    delivery: Delivery,
    instructions: Instructions,
    remainAmount: RemainAmount,
    addDeliveryObj: AddDeliveryObj,
    newDelivery: NewDelivery,
    cleanDelivery(): void,
    setSearch(employeeName: string, startDate: string, endDate: string, deliveryNo: string): void,
    setSearchProgressStatus(progressStatus: string): void,
    setPage(page: number): void,
    getDeliveryList(): void,
    getDelivery(deliveryNo: string): void,
    getRemainAmount(instructionNo: string, productNo: number): void,
    addDelivery(addDeliveryObj: AddDeliveryObj): void,
    addDeliveryInstruction(deliveryNo: string, addDeliveryInstruction: AddDeliveryInstruction): void,
    deleteDelivery(deliveryNo: string): void,
    deleteDeliveryInstruction(deleteDeliveryInstructionObj: DeleteDeliveryInstruction): void,
    updateDelivery(updateDelivery: UpdateDelivery): void,
    updateDeliveryStatus(deliveryNo: string):void,
    updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction): void,
    getInitDelivery(): void,
}
