export const initialSearchState = {
  productCode: '',
  productName: '',
  pageSize: 8,
  page: 1
};
export const initialDuplicateProductCodeResult = {
  duplicateResult : false
}
export const initialProductPageState = {
  list: [],
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false
};

export const initialProduct = {
  productNo: 0,
  productCode: '',
  productName: '',
  price:0,
  standard: '',
  weight:0,
  unit: 0
}

export const initialProductInstruction = {
  productNo: 0,
  remain_amount: 0,
  amount: 0
}
export const initialCheckProductCode = {
  productCode : ''
}