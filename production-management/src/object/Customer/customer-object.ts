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
    customerTel : string
}

export type InsertBar = {
    insertBar : boolean
}

export type CustomersState = {
    search: Search,
    insertCustomer: InsertCustomer
    customerPage: CustomerPage
    customer: Customer
    insertBar: InsertBar
    setInsertBar: (insertBar: boolean) => void
    setSearch: (customerCode: string, customerName: string, sector : string) => void
    setInsertCustomer: (customerCode: string, customerName: string, customerTel: string, ceo: string, sector : string) => void
    setPage: (page: number) => void
    getCustomerList: () => void
    getCustomer: (customerNo: number) => void
}

export type CustomerPath = {
    customerNo : number
}