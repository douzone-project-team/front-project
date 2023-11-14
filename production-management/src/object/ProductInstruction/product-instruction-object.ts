export type AddProductInstruction = {
  instructionNo: string,
  productNo: number,
  amount: number
}

export type DeleteProductInstruction = {
  instructionNo: string,
  productNo: number,
}

export type UpdateProductInstruction = {
  instructionNo: string,
  productNo: number,
  amount: number
}

/* state */
export type ProductInstructionState = {
  
}