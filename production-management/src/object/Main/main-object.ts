interface CircleData {
    "progress": "STANDBY" | "PROGRESS" | "COMPLETED",
    "count": number
}
interface BarData {
    "date": string,
    "count": number
}
export type Employee = {
    employeeNo: number,
    id: string,
    password: string,
    name: string,
    role: string,
    tel: string,
    email: string
}

export interface CircleGraphlist {
    "instructionData": CircleData[],
    "deliveryData": CircleData[]
}

export interface BarGraph {
    "instructionData": BarData[],
    "deliveryData": BarData[]
}
export interface Currentinfo{
    thisMonthCount: number,
    allCount: number,
}

export interface NearDatae{
    instructionNo:string,
    expirationDate:string
}
export interface NearDateData{
    instructionNo:string,
    expirationDate:string
}
export interface Bigcustomer{
    customerNo:number,
    customerName:string,
    count:number
}
export interface  CurrentBox{
    "instruction": Currentinfo,
    "delivery": Currentinfo,
    "expirationDateNearInstruction": NearDateData[],
    "customer": Bigcustomer[]
}

export type MainState = {
    employee: Employee,
    getEmployee: (employeeNo: number) => void,
    barGraph: BarGraph;
    circleGraph: CircleGraphlist;
    currentBox:CurrentBox;
    getCurrentBox:()=>void;
    getBarGraph: (term: string) => void;
    getCircleGraph: (term: string) => void;
};

/* path variables */
export type GraphTerm = {
    term: string;
};
