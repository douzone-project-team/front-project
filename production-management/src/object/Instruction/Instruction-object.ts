import {
  AddProductInstruction,
  DeleteProductInstruction
} from "../ProductInstruction/product-instruction-object"

export type AddInstruction = {
  customerNo: number,
  customerName: string,
  instructionDate: string,
  expirationDate: string,
  progressStatus: string
}

export type InstructionSearch = {
  progressStatus: string,
  employeeName: string,
  startDate: string,
  endDate: string,
  page: number,
  pageSize: number
}

export type ProductInstruction = {
  productNo: number,
  productCode: string,
  productName: string,
  amount: number,
  remainAmount: number
}

export type AddInstructionProduct = {
  productNo: number,
  productCode: string,
  amount: number,
}

export type InstructionPage = {
  list: InstructionList[],
  currentPage: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export type InstructionList = {
  instructionNo: string,
  employeeName: string,
  customerNo: number,
  customerName: string,
  instructionDate: string,
  expirationDate: string,
  progressStatus: string
}

export type Instruction = {
  instructionNo: string,
  employeeName: string,
  products: ProductInstruction[],
  customerName: string,
  customerNo: number,
  instructionDate: string,
  expirationDate: string,
  progressStatus: string
}

export type UpdateInstruction = {
  instructionNo: string,
  customerNo: number,
  instructionDate: string
  expirationDate: string
}

/* state - type */
export type InstructionsState = {
  search: InstructionSearch,
  instructionPage: InstructionPage,
  instruction: Instruction,
  cleanInstruction(): void,
  setSearch(employeeName: string, startDate: string, endDate: string): void,
  setSearchProgressStatus(progressStatus: string): void,
  setPage(page: number): void,
  getInstructionList(): void,
  getInstruction(instructionNo: string): void,
  addInstruction(addInstruction: AddInstruction): void,
  updateInstruction(updateInstruction: UpdateInstruction): void,
  addProductInstruction(addProductInstruction: AddProductInstruction): void,
  deleteProductInstruction(deleteProductInstruction: DeleteProductInstruction): void,
  deleteInstruction(instructionNo: string): void,
  updateInstructionProduct(amount: number, productNo: number): void,
}
