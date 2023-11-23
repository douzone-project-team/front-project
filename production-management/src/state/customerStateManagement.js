export const initialSearchState = {
    customerCode: '',
    customerName: '',
    sector: '',
    pageSize: 8,
    page: 1
};

export const initialInsertCustomerState = {
    customerCode: '',
    customerName: '',
    customerTel: '',
    ceo : '',
    sector : ''
}

export const initialCustomerPageState = {
    list: [],
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false
};

export const initialCustomer = {
    customerNo: 0,
    customerCode: '',
    customerName: '',
    customerTel: '',
    ceo: '',
    sector: ''
}

export const updateCustomerState = {
    customerName: '',
    customerTel: ''
}

export const insertBarState = {
    insertBar: false
}