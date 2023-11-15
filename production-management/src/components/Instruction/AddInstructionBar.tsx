import {Box} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

let Instruction = {
  customerNo: 0,
  instructionDate: '',
  expirationDate: '',
  progressStatus: ''
};

interface AddInstructionBarState {
  showModal: boolean;
  message: string;
}

class AddInstructionBar extends Component {
  static contextType = InstructionsContext;


  handleAddClick = () => {
    if (!Instruction.customerNo) {
      alert("거래처를 입력하세요.");
      return;
    }
    const parsedInstructionData = Instruction.instructionDate
        ? new Date(Instruction.instructionDate)
        : new Date();
    const parsedExpirationDate = Instruction.expirationDate
        ? new Date(Instruction.expirationDate)
        : new Date();
    parsedExpirationDate.setDate(parsedExpirationDate.getDate() + 7);

    Instruction.progressStatus = Instruction.progressStatus === '' ? 'STANDBY' : Instruction.progressStatus;
    Instruction.instructionDate = parsedInstructionData.toLocaleDateString('en-CA');
    Instruction.expirationDate = parsedExpirationDate.toLocaleDateString('en-CA');
    const state = this.context as InstructionsState;
    state.addInstruction(Instruction);
  }

  render() {
    const state = this.context as InstructionsState;
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
                alignItems: 'center'
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
                       style={{height: '20px'}}
                       defaultValue={state.instruction.customerName}
                       onChange={(e) => {
                         Instruction.customerNo = e.target.value as unknown as number
                       }}
                />
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
                       defaultValue={state.search.startDate}
                       onChange={(e) => {
                         Instruction.instructionDate = e.target.value
                       }}/>
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px',
                         marginRight: '50px'
                       }}
                       defaultValue={state.search.endDate}
                       onChange={(e) => {
                         Instruction.expirationDate = e.target.value
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
                          Instruction.progressStatus = e.target.value;
                        }}>
                  <option value="STANDBY">준비</option>
                  <option value="PROGRESS">진행중</option>
                  <option value="COMPLETED">완료</option>
                </select>
              </label>
            </div>
            {state.instruction.instructionNo === '' && (
                <div style={{marginTop: '7px', marginBottom: '7px'}}>
                  <button
                      type="submit"
                      style={{
                        height: '25px',
                        marginRight: '10px'
                      }}
                      onClick={this.handleAddClick}
                  >
                    지시 추가
                  </button>
                </div>
            )}
          </Box>
        </>
    )
  }
}

export default AddInstructionBar;
