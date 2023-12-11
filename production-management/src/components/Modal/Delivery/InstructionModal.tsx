import {AddInstruction} from "../../../object/DeliveryInstruction/delivery-instruction-object";
import {Component} from "react";
import {InstructionsContext} from "../../../store/Instruction/Instructions-context";
import {Box} from "@material-ui/core";
import "./../../../assets/css/InstructionModal.css"
import DeliverySearchInstructionBar from "../../Instruction/Delivery-SearchInstructionBar";
import ViewDeliveryInstructionListTable from "../../Delivery/ViewDeliveryInstructionListTable";
import {SearchBox} from "../../../core/box/SearchBox";
import {TableBox} from "../../../core/box/TableBox";
import AssignmentIcon from '@material-ui/icons/Assignment';

type InstructionModalProps = {
  onClose: () => void,
  addDeliveryInstruction: (instructionNo: string,
                           instructionDate: string,
                           expirationDate: string,
                           customerName: string,
  ) => void,
}

type InstructionModalState = {
  instruction: AddInstruction
}

export class InstructionModal extends Component<InstructionModalProps, InstructionModalState> {
  static contextType = InstructionsContext;


  constructor(props: InstructionModalProps) {
    super(props);

    this.state = {
      instruction: {
        instructionNo: '',
        instructionDate: '',
        expirationDate: '',
        customerName: '',
      },
    }
  }

  setInstruction = (instruction: AddInstruction) => {
    this.setState({instruction: instruction})
  }

  addDeliveryInstruction = () => {
    const {onClose, addDeliveryInstruction} = this.props as InstructionModalProps;
    addDeliveryInstruction(
        this.state.instruction.instructionNo,
        this.state.instruction.instructionDate,
        this.state.instruction.expirationDate,
        this.state.instruction.customerName,
    );
    onClose();
  }

  render() {
    const {onClose} = this.props as InstructionModalProps;
    const {instruction} = this.state;

    return (
        <div className='modal'>
          <section className='modal-container' style={{height: '625px', width: '1000px'}}>
            <div className="modalHeader" style={{height: '55px'}}>
              <div style={{display: 'flex'}}><AssignmentIcon/>&nbsp;지시 설정</div>
              <button className="close" onClick={onClose}>
                &times;
              </button>
            </div>
            <main>
              <SearchBox p='0px'>
                <DeliverySearchInstructionBar/>
              </SearchBox>
              <TableBox>
                <ViewDeliveryInstructionListTable setInstruction={this.setInstruction} tableSize/>
              </TableBox>
            </main>
            {instruction.instructionNo !== '' && (
                <Box
                    sx={{
                      height: '40px',
                      border: '1.4px solid #D3D3D3',
                      marginTop: '10px',
                      marginBottom: '10px',
                      marginLeft: '20px',
                      marginRight: '20px',
                      borderRadius: '10px'
                    }}
                >
                  <label>
                                    <span style={{
                                      marginRight: '15px',
                                      fontSize: '15px',
                                      fontWeight: 'bold',
                                    }}>지시 번호</span>
                    <input type="text"
                           style={{
                             height: '20px',
                             marginTop: '6px',
                             marginRight: '25px',
                             width: '120px',
                             textAlign: 'center'
                           }}
                           readOnly
                           value={this.state.instruction.instructionNo}
                    />
                  </label>
                  <button type="submit"
                          style={{
                            width: '50px',
                            height: '27px',
                            marginTop: '6px',
                            borderRadius: '10px',
                            backgroundColor: '#0C70F2',
                            color: '#FFFFFF'
                          }}
                          onClick={this.addDeliveryInstruction}>
                    등록
                  </button>
                </Box>
            )}
          </section>
        </div>
    );
  }
}

export default InstructionModal;