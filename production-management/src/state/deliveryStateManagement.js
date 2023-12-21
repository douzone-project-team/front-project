export const initialDeliverySearchState = {
    deliveryNo: '',
    progressStatus: '',
    employeeName: '',
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
    page: 1,
    pageSize: 8
};

export const initialDeliveryPageState = {
    list: [],
    currentPage: -1,
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
