import InstructionAction from "./instructions-action";
import ProductInstructionAction from "../ProductInstruction/product-instruction-action";
import {
  AddInstruction,
  InstructionsState,
  UpdateInstruction
} from "../../object/Instruction/Instruction-object";
import React, {Component} from "react";
import {
  initialInstruction,
  initialInstructionPageState,
  initialInstructionSearchState
} from "../../state/InstructionStateManagement";
import {
  AddProductInstruction,
  DeleteProductInstruction
} from "../../object/ProductInstruction/product-instruction-object";

const instructionAction = new InstructionAction;
const productInstructionAction = new ProductInstructionAction;

export type Props = {
  children?: React.ReactNode;
}

export const InstructionsContext = React.createContext<InstructionsState>({
  search: initialInstructionSearchState,
  instructionPage: initialInstructionPageState,
  instruction: initialInstruction,
  cleanInstruction(): void {
  },
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
  updateInstruction(updateInstruction: UpdateInstruction): void {
  },
  addProductInstruction(addProductInstruction: AddProductInstruction): void {
  },
  deleteProductInstruction(deleteProductInstruction: DeleteProductInstruction): void {
  },
  deleteInstruction(instructionNo: string): void {
  },
  updateInstructionProduct(amount: number, productNo: number): void {
  },
})

export class InstrcutionsContextProvider extends Component<Props, InstructionsState> {
  state: InstructionsState = {
    search: initialInstructionSearchState,
    instructionPage: initialInstructionPageState,
    instruction: initialInstruction,
    cleanInstruction: () => {
      this.setState({instruction: initialInstruction})
      this.setState({instructionPage: initialInstructionPageState})
      this.setState({search: initialInstructionSearchState})
    },
    setSearch: (employeeName: string, startDate: string, endDate: string) => {
      this.setState((prevState) => ({
        search: {
          ...prevState.search,
          employeeName: employeeName,
          startDate: startDate,
          endDate: endDate
        }
      }), () => {
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
        this.getInstructionList();
      })
    },
    setPage: (page: number) => {
      this.setState((prevState) => ({
        search: {...prevState.search, page: page}
      }), () => {
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
            customerName: addInstruction.customerName,
            instructionDate: addInstruction.instructionDate,
            expirationDate: addInstruction.expirationDate,
            progressStatus: addInstruction.progressStatus,
          }
        }));
      });
    },
    updateInstruction: (updateInstruction: UpdateInstruction) => {
      instructionAction.updateInstruction(updateInstruction).then((result) => {
        this.getInstruction(updateInstruction.instructionNo);
      })
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
        this.getInstruction(this.state.instruction.instructionNo);
      });
    },

    deleteProductInstruction: (deleteProductInstruction: DeleteProductInstruction) => {
      productInstructionAction.deleteProductInstruction(deleteProductInstruction)
      .then((result) => {
        instructionAction.getInstruction(this.state.instruction.instructionNo)
        .then((result) => {
          this.setState({instruction: result?.data})
        })
      });
    },
    deleteInstruction: (instructionNo: string) => {
      instructionAction.deleteInstruction(instructionNo)
      .then((result) => {
        this.getInstructionList();
        this.setState({instruction: initialInstruction})
      })
    },
    updateInstructionProduct: (amount: number, productNo: number) => {
      let updateInstructionProduct = {
        amount: amount,
        productNo: productNo,
        instructionNo: this.state.instruction.instructionNo
      }
      productInstructionAction.updateProductInstruction(updateInstructionProduct)
      .then(() => {
            this.getInstruction(this.state.instruction.instructionNo);
          }
      )
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