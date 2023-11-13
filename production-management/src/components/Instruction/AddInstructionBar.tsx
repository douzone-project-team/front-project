import {Box} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

let SearchValue = {
  customerNo: 0,
  products: [],
  instructionData: '',
  expirationDate: '',
  progressStatus: ''
};

class AddInstructionBar extends Component {
  static contextType = InstructionsContext;


  handleAddClick = () => {
    if (!SearchValue.customerNo) {
      alert("거래처를 입력하세요.");
      return;
    }

    const state = this.context as InstructionsState;
    state.setAddInstruction(SearchValue.customerNo, SearchValue.instructionData, SearchValue.expirationDate, SearchValue.progressStatus);
  }

  render() {
    const state = this.context as InstructionsState;
    return (
        <>
          <Box
              sx={{
                width: '123.5vh',
                height: '4vh',
                border: '1.4px solid #D3D3D3',
                marginBottom: '1vh',
                marginLeft: '0.5vh'
              }}
          >
            <label>
              <span style={{
                marginLeft: '5vh',
                marginRight: '0.5vh',
                fontSize: '1.5vh',
                fontWeight: 'bold'
              }}>거래처</span>
              <input type="text" placeholder="거래처"
                     style={{height: '2vh', marginTop: '0.6vh'}}
                     onChange={(e) => {
                       SearchValue.customerNo = e.target.value as unknown as number
                     }}
              />
            </label>
            <label>
              <span style={{
                marginLeft: '5vh',
                marginRight: '0.5vh',
                fontSize: '1.4vh',
                fontWeight: 'bold'
              }}>지시일</span>
              <input type="date"
                     style={{height: '2vh', marginTop: '0.6vh'}}
                     onChange={(e) => {
                       SearchValue.instructionData = e.target.value
                     }}/>
              <input type="date"
                     style={{
                       height: '2vh',
                       marginTop: '0.6vh',
                       marginLeft: '2vh',
                       marginRight: '5vh'
                     }}
                     onChange={(e) => {
                       SearchValue.expirationDate = e.target.value
                     }}/>
            </label>
            <label><span style={{
              marginLeft: '5vh',
              marginRight: '0.5vh',
              fontSize: '1.4vh',
              fontWeight: 'bold'
            }}>지시 상태</span>
              <select name="languages" id="lang" style={{marginRight: '30vh', height: '2.5vh'}}
                      onChange={(e) => {
                        SearchValue.progressStatus = e.target.value;
                        console.log(e.target.value);
                      }}>
                <option value="STANDBY">준비</option>
                <option value="PROGRESS">진행중</option>
                <option value="COMPLETE">완료</option>
              </select>
            </label>
            <button type="submit"
                    style={{height: '2.7vh', marginTop: '0.6vh'}}
                    onClick={this.handleAddClick}>지시 설정
            </button>
          </Box>
        </>
    )
  }
}

export default AddInstructionBar;
