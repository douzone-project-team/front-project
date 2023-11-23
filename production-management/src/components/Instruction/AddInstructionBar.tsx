import {Box} from "@material-ui/core";
import React, {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import CustomerModal from "../Modal/Product/CustomerModal";

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
          expirationDate: expirationDate === '' ? new Date().toISOString().split('T')[0] : expirationDate,
        },
        () => {
          state.addInstruction(this.state);
        }
    );
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
          <Box
              sx={{
                width: '100%',
                height: '40px',
                border: '1.4px solid #D3D3D3',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
          >
            <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
              <label>
              <span style={{
                marginLeft: '50px',
                marginRight: '5px',
                fontSize: '15px',
                fontWeight: 'bold'
              }}>거래처</span>
                <input type="text" placeholder="거래처"
                       style={{height: '20px', marginRight: '10px'}}
                       value={this.state.customerName}
                       readOnly
                />
                <img src={require(`../../images/button/modify-button-black.png`)}
                     className='cellHoverEffect'
                     style={{width: '19px', verticalAlign: 'middle'}}
                     onClick={changeCustomerSearchModalStatus}/>
              </label>
              <label>
              <span style={{
                marginLeft: '50px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>지시일</span>
                <input type="date"
                       style={{height: '20px'}}
                       onChange={(e) => {
                         this.setState({instructionDate: e.target.value})
                       }}/>
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px',
                         marginRight: '50px'
                       }}
                       onChange={(e) => {
                         this.setState({expirationDate: e.target.value})
                       }}/>
              </label>
              <label><span style={{
                marginLeft: '50px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>지시 상태</span>
                <select name="languages" id="lang" style={{height: '25px'}}
                        defaultValue={state.search.progressStatus}
                        onChange={(e) => {
                          this.setState({progressStatus: e.target.value})
                        }}>
                  <option value="STANDBY">준비</option>
                  <option value="PROGRESS">진행중</option>
                  <option value="COMPLETED">완료</option>
                </select>
              </label>
            </div>
            <div style={{marginTop: '7px', marginBottom: '7px'}}>
              <img src={require('../../images/button/add-button.png')}
                   style={{width: '30px', marginRight: '10px', marginTop: '6px'}}
                   className='cellHoverEffect'
                   onClick={state.instruction.instructionNo === '' ? this.addInstructionClick : this.newAddInstructionClick}/>
            </div>
          </Box>
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
