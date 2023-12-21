export const initialInstructionSearchState = {
  instructionNo: '',
  progressStatus: '',
  employeeName: '',
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().split('T')[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
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

