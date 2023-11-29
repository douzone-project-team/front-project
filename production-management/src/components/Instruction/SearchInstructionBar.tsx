import {Box, Button} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import "./../../assets/css/Styles.css";

let searchValue = {
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
};

type SearchState = {
  all: boolean,
  standby: boolean,
  progress: boolean,
  completed: boolean
}

class SearchInstructionBar extends Component<Props, SearchState> {

  constructor(props: Props) {
    super(props);

    this.state = {
      all: false,
      standby: false,
      progress: false,
      completed: false
    }
  }

  static contextType = InstructionsContext;

  setStateAllFalse = () => {
    this.setState({
      all : false,
      standby : false,
      progress: false,
      completed: false
    })
  }

  handleSearchClick = () => {
    const state = this.context as InstructionsState;
    state.setSearch(searchValue.employeeName, searchValue.startDate, searchValue.endDate);
  }

  handleSearchProgressState = (progressStatus: string) => {
    const state = this.context as InstructionsState;
    state.search.page = 1;
    state.setSearchProgressStatus(progressStatus);
  }

  renderProgressButton = (koreanStatus: string, status: string, image: string, color: string, checked: boolean, changeFunc: () => void) => (
      <Button
          variant="outlined"
          style={{
            width: '24.8%',
            marginLeft: '2px',
            border: '1px solid #D3D3D3',
            backgroundColor: (checked ? color : 'white')
          }}
          onClick={() => {
            this.handleSearchProgressState(status);
            this.setStateAllFalse();
            changeFunc();
          }}
      >
        <img src={require(`../../images/${image}`)} style={{width: '50px'}} alt={koreanStatus}/>
        <span style={{
          fontWeight: 'bold',
          color: (checked ? 'white' : 'black')
        }}> {koreanStatus}</span>
        <span style={{fontWeight: 'bold', color: color, fontSize: '2vh'}}>
      </span>
      </Button>
  );

  render() {
    const state = this.context as InstructionsState;
    const {all, standby, progress, completed} = this.state;

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
                alignItems: 'center',
                borderRadius: '5px'
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
                <input type="text"
                       style={{marginLeft: '10px', height: '20px'}}
                       onChange={(e) => {
                         searchValue.employeeName = e.target.value
                       }}
                />
              </label>
              <label>
              <span style={{
                marginLeft: '60px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>지시일</span>
                <input type="date"
                       style={{height: '20px', marginLeft: '10px', width: '100px'}}
                       data-placeholder="시작일"
                       required
                       aria-required="true"
                       onChange={(e) => {
                         searchValue.startDate = e.target.value
                       }}
                />
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px',
                         width: '100px'
                       }}
                       data-placeholder="종료일"
                       required
                       aria-required="true"
                       onChange={(e) => {
                         searchValue.endDate = e.target.value
                       }}
                />
              </label>
              <label>
               <span style={{
                 marginLeft: '60px',
                 marginRight: '5px',
                 fontSize: '14px',
                 fontWeight: 'bold'
               }}>만료일</span>
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px',
                         width: '100px'
                       }}
                       data-placeholder="시작일"
                       required
                       aria-required="true"
                       onChange={(e) => {
                         searchValue.endDate = e.target.value
                       }}
                />
                <input type="date"
                       style={{
                         height: '20px',
                         marginLeft: '20px',
                         width: '100px'
                       }}
                       data-placeholder="종료일"
                       required
                       aria-required="true"
                       onChange={(e) => {
                         searchValue.endDate = e.target.value
                       }}
                />
              </label>
            </div>
            <div style={{marginBottom: '7px', marginTop: '7px'}}>
              <img src={require('../../images/button/search-button.png')}
                   style={{width: '30px', marginRight: '10px', marginTop: '6px'}}
                   className='cellHoverEffect' onClick={this.handleSearchClick}/>
            </div>
          </Box>
          <Box
              sx={{
                mb: '20px',
                ml: '5px'
              }}
          >
            {this.renderProgressButton('전체', '', 'all.png', 'rgb(60,123,194)', all, () => this.setState({all: !all}))}
            {this.renderProgressButton('준비', 'STANDBY', 'standby.png', 'rgb(60,123,194)', standby, () => this.setState({standby: !standby}))}
            {this.renderProgressButton('진행중', 'PROGRESS', 'progress.png', 'rgb(60,123,194)', progress, () => this.setState({progress: !progress}))}
            {this.renderProgressButton('완료', 'COMPLETED', 'completed.png', 'rgb(60,123,194)', completed, () => this.setState({completed: !completed}))}
          </Box>
        </>
    )
  }
}

export default SearchInstructionBar;
