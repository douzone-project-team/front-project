import {Box, Button} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

let searchValue = {
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
};

class SearchInstructionBar extends Component {
  static contextType = InstructionsContext;


  handleSearchClick = () => {
    const state = this.context as InstructionsState;
    state.setSearch(searchValue.employeeName, searchValue.startDate, searchValue.endDate);
  }

  handleSearchProgressState = (progressStatus: string) => {
    const state = this.context as InstructionsState;
    state.setSearchProgressStatus(progressStatus);
  }

  renderProgressButton = (koreanStatus: string, status: string, image: string, color: string) => (
      <Button
          variant="outlined"
          style={{width: '34.9vh', marginLeft: '0.5vh', border: '1px solid #D3D3D3'}}
          onClick={() => this.handleSearchProgressState(status)}
      >
        <img src={require(`../../images/${image}`)} style={{width: '5vh'}} alt={koreanStatus}/>
        <span style={{fontWeight: 'bold'}}> {koreanStatus}</span>
        <br/>
        <span style={{fontWeight: 'bold', color: color, fontSize: '2vh'}}>
      </span>
        건
      </Button>
  );

  render() {
    const state = this.context as InstructionsState;
    return (
        <>
          <Box
              sx={{
                width: '141vh',
                height: '4vh',
                border: '1.5px solid #D3D3D3',
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
              }}>등록자</span>
              <input type="text" placeholder="등록자"
                     style={{height: '2vh', marginTop: '0.6vh'}}
                     onChange={(e) => {
                       searchValue.employeeName = e.target.value
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
                       searchValue.startDate = e.target.value
                     }}/>
              <input type="date"
                     style={{
                       height: '2vh',
                       marginTop: '0.6vh',
                       marginLeft: '2vh',
                       marginRight: '40%'
                     }}
                     onChange={(e) => {
                       searchValue.endDate = e.target.value
                     }}/>
            </label>
            <button type="submit"
                    style={{height: '2.7vh', marginTop: '0.6vh'}}
                    onClick={this.handleSearchClick}>검색
            </button>
          </Box>
          <Box
              sx={{
                mb: '5vh'
              }}
          >
            {this.renderProgressButton('전체', '', 'all.png', 'darkblue')}
            {this.renderProgressButton('준비', 'STANDBY', 'standby.png', 'gray')}
            {this.renderProgressButton('진행중', 'PROGRESS', 'progress.png', 'dodgerblue')}
            {this.renderProgressButton('완료', 'COMPLETED', 'completed.png', 'forestgreen')}
          </Box>
        </>
    )
  }
}

export default SearchInstructionBar;
