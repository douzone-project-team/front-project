export const initialInstructionSearchState = {
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
  expirationStartDate: '',
  expirationEndDate: '',
  page: 1,
  pageSize: 8
};

export const initialInstructionPageState = {
  list: [],
  currentPage: -1,
  hasNextPage: false,
  hasPreviousPage: false
}

export const initialInstruction = {
  instructionNo: '',
  employeeName: '',
  customerName: '',
  customerNo: 0,
  products: [],
  instructionDate: '',
  expirationDate: '',
  progressStatus: ''
}

export const initialAddInstruction = {
  customerNo: 0,
  products: [],
  instructionData: '',
  expirationDate: '',
  progressStatus: ''
}

export const initialUpdateInstruction = {
  instructionNo: '',
  customerNo: 0,
  instructionData: '',
  expirationDate: ''
}

