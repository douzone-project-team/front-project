import React, {Component} from "react";
import {MainState} from "../../object/Main/main-object"
import {initialBarGraphState, initialCircleGraphState, initialCurrentBoxState} from "../../state/mainStateManagement";
import MainAction from "./main-action";
import {initialEmployee} from "../../state/employeeStateMangement";

const mainAction = new MainAction();

export type Props = {
    children?: React.ReactNode;
}


export const MainContext = React.createContext<MainState>({
    currentBox:initialCurrentBoxState,
    employee: initialEmployee,
    getCurrentBox():void{},
    getEmployee(employeeNo: number): void {
    },
    barGraph: initialBarGraphState,
    circleGraph: initialCircleGraphState,
    getBarGraph(term: string): void {
    },
    getCircleGraph(term: string): void {
    },
});

export class MainContextProvider extends Component<Props, MainState> {
    state: MainState = {
        currentBox:initialCurrentBoxState,
        employee: initialEmployee,
        barGraph: initialBarGraphState,
        circleGraph: initialCircleGraphState,
        getCurrentBox:() =>{
            mainAction.getCurrentpage()
                .then(result =>{
                    let data = result?.data;
                    this.setState({...this.state,currentBox:data})
                })
        },
        getBarGraph: (term: string) => {
            mainAction.getBarGraph(term)
                .then(result => {
                    let data = result?.data;
                    this.setState({...this.state, barGraph: data});
                });
        },
        getCircleGraph: (term: string) => {
            mainAction.getCircleGraph(term)
                .then(result => {
                    let data = result?.data;
                    this.setState({...this.state, circleGraph: data});
                });
        },
        getEmployee: (employeeNo: number) => {
            mainAction.getEmployee(employeeNo, (emp) => this.setState({...this.state, employee: emp}))
        },
    }

    getBarGraph = (term: string) => {
        mainAction.getBarGraph(term)
            .then((result) => {
                let data = result?.data;
                this.setState({barGraph: data});
            })
            .catch((error) => {
                console.error("Error fetching bar graph:", error);
            });
    };

    getCircleGraph = (term: string) => {
        mainAction.getCircleGraph(term)
            .then((result) => {
                let data = result?.data;
                this.setState({circleGraph: data});
            })
            .catch((error) => {
                console.error("Error fetching circle graph:", error);
            });

    };
    getEmployee = (employeeNo: number) => {
        mainAction.getEmployee(employeeNo, (emp) => this.setState({...this.state, employee: emp}))
    };


    render() {
        return (
            <MainContext.Provider value={this.state}>
                {this.props.children}
            </MainContext.Provider>
        );
    }
}