import InstructionAction from "./instructions-action";
import ProductInstructionAction from "../ProductInstruction/product-instruction-action";
import {AddInstruction, InstructionsState} from "../../object/Instruction/Instruction-object";
import React, {Component} from "react";
import {
  initialInstruction,
  initialInstructionPageState,
  initialInstructionSearchState
} from "../../state/InstructionStateManagement";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";

const instructionAction = new InstructionAction;
const productInstructionAction = new ProductInstructionAction;

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
  addInstruction(): void {
  },
  addProductInstruction(addProductInstruction: AddProductInstruction): void {
  },
})

export class InstrcutionsContextProvider extends Component<Props, InstructionsState> {
  state: InstructionsState = {
    search: initialInstructionSearchState,
    instructionPage: initialInstructionPageState,
    instruction: initialInstruction,

    /* Instruction 조회 메서드 */
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
        search: {...prevState.search, page: page}
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
    /* Instruction 추가 메서드 */
    addInstruction: (addInstruction: AddInstruction) => {
      instructionAction.addInstruction(addInstruction).then((result) => {
        this.setState((prevState) => ({
          instruction: {
            ...prevState.instruction,
            instructionNo: result?.data.instructionNo,
            customerNo: addInstruction.customerNo,
            instructionDate: addInstruction.instructionDate,
            expirationDate: addInstruction.expirationDate,
            progressStatus: addInstruction.progressStatus,
            customerName: addInstruction.customerNo as unknown as string
          }
        }));
      });
    },
    addProductInstruction: (addProductInstruction: AddProductInstruction) => {
      const isDuplicate = this.state.instruction.products.some(product => {
        return product.productNo === addProductInstruction.productNo;
      });

      if (isDuplicate) {
        alert('두 개 이상의 상품 번호가 일치합니다.');
        return;
      }

      productInstructionAction.addProductInstruction(addProductInstruction)
      .then((result) => {
        instructionAction.getInstruction(this.state.instruction.instructionNo)
        .then((result) => {
          this.setState({instruction: result?.data})
        })
      });
    }

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