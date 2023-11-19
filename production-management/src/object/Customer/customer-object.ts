export type Customer = {
    customerNo : number,
    customerCode : string,
    customerName : string,
    customerTel : string,
    ceo : string,
    sector : string
}

export type Search = {
    customerCode : string,
    customerName : string,
    sector : string,
    page : number,
    pageSize : number
}
export type CustomerList = {
    customerNo : number,
    customerCode : string,
    customerName : string,
    customerTel : string,
    ceo : string,
    sector : string
}

export type CustomerPage = {
    list : CustomerList[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}

export type InsertCustomer = {
    customerCode : string,
    customerName : string,
    customerTel : string,
    ceo : string,
    sector : string
}

export type UpdateCustomer = {
    customerName : string,
    customerTel : string,
    ceo : string
}


export type CustomersState = {
    search: Search,
    insertCustomer: InsertCustomer
    customerPage: CustomerPage
    customer: Customer
    updateCustomer: UpdateCustomer
    setSearch: (customerCode: string, customerName: string, sector : string) => void
    setInsertCustomer: (insertCustomer: InsertCustomer) => void
    setUpdateCustomer: (customerNo: number, updateCustomer: UpdateCustomer) => void
    setPage: (page: number) => void
    getCustomerList: () => void
    getCustomer: (customerNo: number) => void
    deleteCustomer: (customerNo: number) => void
}

export type CustomerPath = {
    customerNo : number
}