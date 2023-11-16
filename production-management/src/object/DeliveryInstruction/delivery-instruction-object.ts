export type AddDeliveryInstruction = {
    deliveryNo: string,
    instructionNo: string,
    productNo: number,
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