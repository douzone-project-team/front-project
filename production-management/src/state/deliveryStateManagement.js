export const initialDeliverySearchState = {
    progressStatus: '',
    employeeName: '',
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 8
};

export const initialDeliveryPageState = {
    list: [],
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false
}

export const initialInstructions = {
    instructionNo: '',
    employeeName: '',
    customerName: '',
    instructionDate: '',
    expirationDate: '',
    progressStatus: '',
    productNo: 0,
    productCode: '',
    productName: '',
    amount: 0,
}
export const initialDelivery = {
    deliveryNo: '',
    employeeName: '',
    deliveryDate: '',
    deliveryStatus: '',
    instructions: []
}

export const initialAddDeliveryObj = {
    deliveryDate: '',
}

export const initialNewDelivery = {
    deliveryNo: '',
    deliveryDate: '',
    instructions: [],
    products: []
}

export const initialRemainAmount = {
    remainAmount: 0,
}
