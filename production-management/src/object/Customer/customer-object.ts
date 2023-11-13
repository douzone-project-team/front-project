export type Customer = {
    customerNo : number,
    customerCode : string,
    customerName : string,
    customerTel : string
}

export type Search = {
    customerName : string,
    page : number,
    pageSize : number,

}

export type CustomerList = {
    customerNo : number,
    customerCode : string,
    customerName : string,
    customerTel : string
}

export type CustomerPage = {
    list : string[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export type InsertCustomer = {
    customerCode : string,
    customerName : string,
    customerTel : string
}

export type UpdateCustomer = {
    customerName : string,
    customerTel : string
}

export type CustomersState = {
    search: Search,
    customerPage: CustomerPage
    customer: Customer,
    setCustomerName: (customerName: string) => void
    setPage: (page: number) => void
    getCustomerList: () => void
    getCustomer: (customerNo: number) => void
}

export type CustomerPath = {
    customerNo : number
}