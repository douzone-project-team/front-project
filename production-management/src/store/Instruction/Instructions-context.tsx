import InstructionAction from "./instructions-action";
import ProductInstructionAction from "../ProductInstruction/product-instruction-action";
import {
  AddInstruction,
  InstructionSearch,
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
import Swal from 'sweetalert2';

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
  setSearch(instructionSearch: InstructionSearch): void {
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
  getInitInstruction(): void {
  }
})

export class InstrcutionsContextProvider extends Component<Props, InstructionsState> {
  state: InstructionsState = {
    search: initialInstructionSearchState,
    instructionPage: initialInstructionPageState,
    instruction: initialInstruction,
    cleanInstruction: () => {
      this.setState({
        instruction: initialInstruction,
        instructionPage: initialInstructionPageState,
        search: initialInstructionSearchState
      });
    },
    setSearch: (instructionSearch: InstructionSearch) => {
      this.setState({search: instructionSearch}, () => {
        this.getInstructionList();
      });
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
      }).catch((error) => {
        this.printErrorAlert(error);
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
      }).catch((error) => {
        this.printErrorAlert(error);
      });
    },
    updateInstruction: (updateInstruction: UpdateInstruction) => {
      instructionAction.updateInstruction(updateInstruction).then((result) => {
        this.getInstruction(updateInstruction.instructionNo);
      }).catch((error) => {
        this.printErrorAlert(error);
      })
    },

    addProductInstruction: (addProductInstruction: AddProductInstruction) => {
      const isDuplicate = this.state.instruction.products.some(product => {
        return product.productNo === addProductInstruction.productNo;
      });

      if (isDuplicate) {
        this.printErrorAlert("이미 존재하는 품목입니다.");
        return;
      }

      productInstructionAction.addProductInstruction(addProductInstruction)
      .then((result) => {
        this.getInstruction(this.state.instruction.instructionNo);
      }).catch((error) => {
        this.printErrorAlert(error);
      })
    },
    deleteProductInstruction: (deleteProductInstruction: DeleteProductInstruction) => {
      productInstructionAction.deleteProductInstruction(deleteProductInstruction)
      .then((result) => {
        instructionAction.getInstruction(this.state.instruction.instructionNo)
        .then((result) => {
          this.setState({instruction: result?.data})
        }).catch((error) => {
          this.printErrorAlert(error);
        })
      }).catch((error) => {
        this.printErrorAlert(error);
      })
    },
    deleteInstruction: (instructionNo: string) => {
      instructionAction.deleteInstruction(instructionNo)
      .then((result) => {
        this.getInstructionList();
        this.setState({instruction: initialInstruction})
      }).catch((error) => {
        this.printErrorAlert(error);
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
      ).catch((error) => {
        this.printErrorAlert(error);
      })
    },
    getInitInstruction: () => {
      instructionAction.getInstructionList(this.state.search)
      .then((result) => {
        this.setState({instructionPage: result?.data}, () => {
          if(this.state.instructionPage.list.length) {
            this.getInstruction(this.state.instructionPage.list[0].instructionNo);
          }
        });
      }).catch((error) => {
        this.printErrorAlert(error);
      })
    }
  }

  getInstructionList = () => {
    instructionAction.getInstructionList(this.state.search)
    .then((result) => {
      this.setState({instructionPage: result?.data});
    }).catch((error) => {
      this.printErrorAlert(error);
    })
  };

  getInstruction = (instructionNo: string) => {
    instructionAction.getInstruction(instructionNo)
    .then((result) => {
      this.setState({instruction: result?.data});
    }).catch((error) => {
      this.printErrorAlert(error);
    })
  }

  printErrorAlert = (message : string) => {
    Swal.fire({
      icon: "warning",
      text: message
    });
  }

  render() {
    return (
        <InstructionsContext.Provider value={this.state}>
          {this.props.children}
        </InstructionsContext.Provider>
    )
  }
}