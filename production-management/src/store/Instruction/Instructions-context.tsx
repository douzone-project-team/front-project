import InstructionAction from "./instructions-action";
import {
  AddInstructionProduct,
  InstructionsState
} from "../../object/Instruction/Instruction-object";
import React, {Component} from "react";
import {
  initialAddInstruction,
  initialInstruction,
  initialInstructionPageState,
  initialInstructionSearchState
} from "../../state/InstructionStateManagement";

const instructionAction = new InstructionAction;

export type Props = {
  children?: React.ReactNode;
}

export const InstructionsContext = React.createContext<InstructionsState>({
  search: initialInstructionSearchState,
  instructionPage: initialInstructionPageState,
  instruction: initialInstruction,
  setSearch(employeeName: string, startDate: string, endDate: string): void {
  },
  setSearchProgressStatus(progressStatus: string): void {
  },
  setPage(page: number): void {
  },
  getInstructionList(): void {
  },
  getInstruction(instructionNo: string): void {
  },
  addInstruction: initialAddInstruction,
  setAddInstruction(customerNo: number, instructionData: string, expirationDate: string, progressStatus: string): void {
  },
  setAddInstructionProducts(products: AddInstructionProduct): void {
  },
})

export class InstrcutionsContextProvider extends Component<Props, InstructionsState> {
  state: InstructionsState = {
    search: initialInstructionSearchState,
    instructionPage: initialInstructionPageState,
    instruction: initialInstruction,
    setSearch: (employeeName: string, startDate: string, endDate: string) => {
      this.setState((prevState) => ({
        search: {
          ...prevState.search,
          employeeName: employeeName,
          startDate: startDate,
          endDate: endDate
        }
      }), () => {
        console.log(this.state.search);
        this.getInstructionList();
      })
    },
    setSearchProgressStatus: (progressStatus: string) => {
      this.setState((prevState) => ({
        search: {
          ...prevState.search,
          progressStatus: progressStatus
        }
      }), () => {
        console.log(this.state.search);
        this.getInstructionList();
      })
    },
    setPage: (page: number) => {
      this.setState((prevState) => ({
        search: {
          ...prevState.search,
          page: page,
        }
      }), () => {
        console.log(this.state.search);
        this.getInstructionList();
      })
    },
    getInstructionList: () => {
      this.getInstructionList();
    },
    getInstruction: (instructionNo: string) => {
      instructionAction.getInstruction(instructionNo)
      .then((result) => {
        let data = result?.data;
        console.log(data);
        this.setState({instruction: data});
      })
    },
    addInstruction: initialAddInstruction,
    setAddInstruction: (customerNo: number, instructionData: string, expirationDate: string, progressStatus: string) => {
      const parsedInstructionData = instructionData
          ? new Date(instructionData)
          : new Date();
      const parsedExpirationDate = expirationDate
          ? new Date(expirationDate)
          : new Date();
      parsedExpirationDate.setDate(parsedExpirationDate.getDate() + 7);

      this.setState((prevState) => ({
        addInstruction: {
          ...prevState.addInstruction,
          customerNo: customerNo,
          instructionData: parsedInstructionData.toLocaleDateString('en-CA'),
          expirationDate: parsedExpirationDate.toLocaleDateString('en-CA'),
          progressStatus: progressStatus || 'STANDBY',
        }
      }))
    },
    setAddInstructionProducts: (products: AddInstructionProduct) => {
      this.setState((prevState) => ({
        addInstruction: {
          ...prevState.addInstruction,
          page: products,
        }
      }), () => {
        console.log(this.state.search);
        this.getInstructionList();
      })
    },
  }

  getInstructionList = () => {
    instructionAction.getInstructionList(this.state.search)
    .then((result) => {
      let data = result?.data;
      console.log(data);
      this.setState({instructionPage: data});
    })
  };

  getInstruction = (instructionNo: string) => {
    instructionAction.getInstruction(instructionNo)
    .then((result) => {
      let data = result?.data;
      console.log(data);
      this.setState({instruction: data});
    })

  }

  render() {
    return (
        <InstructionsContext.Provider value={this.state}>
          {this.props.children}
        </InstructionsContext.Provider>
    )
  }
}