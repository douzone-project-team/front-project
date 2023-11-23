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

export type GetProductInstruction = {
  instructionNo: string,
  productNo: number,
}

export type ProductInstruction = {
  productNo: number,
  amount: number,
  remain_amount: number
}

/* state */
export type ProductInstructionState = {
  productInstruction: ProductInstruction;
  getProductInstruction: (getProductInstruction: GetProductInstruction) => void;
}