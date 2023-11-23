import {AddInstruction} from "../../../object/DeliveryInstruction/delivery-instruction-object";
import {Component} from "react";
import {InstructionsContext} from "../../../store/Instruction/Instructions-context";
import {Box} from "@material-ui/core";
import "./../../../assets/css/InstructionModal.css"
import DeliverySearchInstructionBar from "../../Instruction/Delivery-SearchInstructionBar";
import ViewDeliveryInstructionListTable from "../../Delivery/ViewDeliveryInstructionListTable";

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
                <section>
                    <header>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <DeliverySearchInstructionBar/>
                        <ViewDeliveryInstructionListTable setInstruction={this.setInstruction} tableSize/>
                    </main>
                    {instruction.instructionNo !== '' && (
                        <Box
                            sx={{
                                height: '40px',
                                border: '1.4px solid #D3D3D3',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '20px',
                                marginRight: '20px'
                            }}
                        >
                            <label>
                                    <span style={{
                                        marginRight: '5px',
                                        fontSize: '15px',
                                        fontWeight: 'bold'
                                    }}>지시 번호</span>
                                <input type="text" placeholder="지시 번호"
                                       style={{height: '20px', marginTop: '6px', marginRight: '50px', width: '120px'}}
                                       readOnly
                                       value={this.state.instruction.instructionNo}
                                />
                            </label>
                            <button type="submit"
                                    style={{height: '27px', marginTop: '6px'}}
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