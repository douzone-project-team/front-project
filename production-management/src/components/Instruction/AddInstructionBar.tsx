import React, {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import CustomerModal from "../Modal/Instruction/CustomerModal";
import {AddButton} from "../../core/button/AddButton";
import {EditButton} from "../../core/button/EditButton";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {TextInput} from '../../core/input/TextInput';
import {DateInput} from "../../core/input/DateInput";


type AddInstructionBarProps = {
  customerSearchModalOpen: boolean,
  changeCustomerSearchModalStatus: () => void,
};

type AddInstructionBarState = {
  customerNo: number,
  customerName: string,
  instructionDate: string,
  expirationDate: string,
  progressStatus: string
}

class AddInstructionBar extends Component<AddInstructionBarProps, AddInstructionBarState> {

  constructor(props: AddInstructionBarProps) {
    super(props);
    this.state = {
      customerNo: 0,
      customerName: '',
      instructionDate: '',
      expirationDate: '',
      progressStatus: 'STANDBY'
    }
  }

  static contextType = InstructionsContext;


  addInstructionClick = () => {
    const state = this.context as InstructionsState;
    const {customerName, customerNo, instructionDate, expirationDate, progressStatus} = this.state;
    let instruction = state.instruction;

    if (!customerNo) {
      alert("거래처를 입력하세요.");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    this.setState(
        {
          progressStatus: instruction.progressStatus === '' ? 'STANDBY' : instruction.progressStatus,
          instructionDate: instructionDate === '' ? new Date().toISOString().split('T')[0] : instructionDate,
          expirationDate: expirationDate === '' ? this.getOneMonthAfterInstructionDate(this.state.instructionDate) : expirationDate,
        },
        () => {
          state.addInstruction(this.state);
        }
    );
  };
  getOneMonthAfterInstructionDate = (instructionDate: string) => {
    console.log('instructionDate' + instructionDate);
    if (instructionDate !== '') {
      const date = new Date(instructionDate);
      date.setMonth(date.getMonth() + 1);
      return date.toISOString().split('T')[0];
    } else {
      const currentDate = new Date();
      const oneMonthLater = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      return oneMonthLater.toISOString().split('T')[0];
    }
  };

  newAddInstructionClick = () => {
    const state = this.context as InstructionsState;

    state.cleanInstruction();

    this.addInstructionClick();
  }

  getCustomer = (customerNo: number, customerName: string) => {
    this.setState({customerName: customerName, customerNo: customerNo});
  }

  render() {
    const state = this.context as InstructionsState;
    const {customerSearchModalOpen, changeCustomerSearchModalStatus} = this.props;
    const {customerName, customerNo, instructionDate, expirationDate, progressStatus} = this.state;

    let instruction = state.instruction;

    return (
        <>
          <BarBox>
            <BarLeftBox width='80%'>
            <TextInput title='거래처' value={this.state.customerName} readOnly/>
              <EditButton
                  color='black'
                  onClick={changeCustomerSearchModalStatus}
              />
              <DateInput title='지시일'
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             this.setState({instructionDate: e.target.value})
                           },
                           required: true
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             this.setState({expirationDate: e.target.value})
                           },
                           required: true
                         }}
              />
            </BarLeftBox>
            <BarRightBox>
              <AddButton
                  size={30}
                  onClick={state.instruction.instructionNo === '' ? this.addInstructionClick : this.newAddInstructionClick}/>
            </BarRightBox>
          </BarBox>
          <div style={{textAlign: 'center'}}>
            <React.Fragment>
              {customerSearchModalOpen ? (
                  <CustomerModal onClose={changeCustomerSearchModalStatus}
                                 setCustomer={this.getCustomer}/>
              ) : null}
            </React.Fragment>
          </div>
        </>
    )
  }
}

export default AddInstructionBar;
