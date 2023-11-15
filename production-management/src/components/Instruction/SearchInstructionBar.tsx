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
          style={{width: '24.8%', marginLeft: '2px', border: '1px solid #D3D3D3'}}
          onClick={() => this.handleSearchProgressState(status)}
      >
        <img src={require(`../../images/${image}`)} style={{width: '50px'}} alt={koreanStatus}/>
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
                width: '100%',
                height: '40px',
                border: '1.5px solid #D3D3D3',
                marginBottom: '10px',
                marginLeft: '2px',
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
              }}>등록자</span>
                <input type="text" placeholder="등록자"
                       style={{height: '20px', marginRight: '100px'}}
                       onChange={(e) => {
                         searchValue.employeeName = e.target.value
                       }}
                />
              </label>
              <label>
              <span style={{
                marginLeft: '5px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>지시일</span>
                <input type="date"
                       style={{height: '20px'}}
                       onChange={(e) => {
                         searchValue.startDate = e.target.value
                       }}/>
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px'
                       }}
                       onChange={(e) => {
                         searchValue.endDate = e.target.value
                       }}/>
              </label>
            </div>
            <div style={{marginBottom: '7px', marginTop: '7px'}}>
              <button type="submit"
                      style={{
                        height: '25px',
                        marginRight: '10px'
                      }}
                      onClick={this.handleSearchClick}>검색
              </button>
            </div>
          </Box>
          <Box
              sx={{
                mb: '20px',
                ml: '5px'
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
