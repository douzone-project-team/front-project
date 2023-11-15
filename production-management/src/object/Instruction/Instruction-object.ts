import {
  AddProductInstruction,
  DeleteProductInstruction
} from "../ProductInstruction/product-instruction-object"

export type AddInstruction = {
  customerNo: number,
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

export type UpdateInstruction = {
  customerNo: bigint,
  products: ProductInstruction[],
  instructionData: string
  expirationDate: string
}

export type InstructionPage = {
  instructions: InstructionList[],
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
  instructionDate: string,
  expirationDate: string,
  progressStatus: string
}

/* state - type */
export type InstructionsState = {
  search: InstructionSearch,
  instructionPage: InstructionPage,
  instruction: Instruction,
  setSearch(employeeName: string, startDate: string, endDate: string): void,
  setSearchProgressStatus(progressStatus: string): void,
  setPage(page: number): void,
  getInstructionList(): void,
  getInstruction(instructionNo: string): void,
  addInstruction(addInstruction: AddInstruction): void,
  addProductInstruction(addProductInstruction: AddProductInstruction): void,
  deleteProductInstruction(deleteProductInstruction: DeleteProductInstruction): void
}
