export type AddDeliveryInstruction = {
    instructionNo: string,
    products: AddDeliveryProduct[],
}

export type AddDeliveryProduct = {
    productNo: number,
    amount: number,
}

export type AddInstruction = {
    instructionNo: string,
    instructionDate: string,
    expirationDate: string,
    customerName: string,
}

//AddDeliveryProduct
export type AddProduct = {
    instructionNo: string,
    productNo: number,
    productCode: string,
    amount: number,
    remainAmount: number,
}

export type DeleteDeliveryInstruction = {
    deliveryNo: string,
    instructionNo: string,
    productNo: number,
}

export type UpdateDeliveryInstruction = {
    deliveryNo: string,
    instructionNo: string,
    productNo: number,
    amount: number,
}

/* state */
export type DeliveryInstructionState = {

}