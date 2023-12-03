import {Box} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import "./../../assets/css/Styles.css";
import {ProgressButton} from "../../core/button/ProgressButton";
import {SearchButton} from "../../core/button/SearchButton";
import {BarBox} from "../../core/BarBox";
import {TextInput} from '../../core/input/TextInput';
import {DateInput} from "../../core/input/DateInput";


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
      all: false,
      standby: false,
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

  render() {
    const state = this.context as InstructionsState;
    const {all, standby, progress, completed} = this.state;

    return (
        <>
          <BarBox>
            <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
              <TextInput title='등록자' onBlur={(e) => {
                searchValue.employeeName = e.target.value;
              }}/>
              <DateInput title='지시일'
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             searchValue.startDate = e.target.value
                           }
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             searchValue.endDate = e.target.value
                           }
                         }}
              />
              <DateInput title='만료일'
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             searchValue.endDate = e.target.value

                           }
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             searchValue.endDate = e.target.value
                           }
                         }}
              />
            </div>
            <div style={{marginTop: '6px', marginRight: '7px'}}>
              <SearchButton size={30} onClick={this.handleSearchClick}/>
            </div>
          </BarBox>
          <Box
              sx={{
                mt: '10px',
              }}
          >
            <ProgressButton options={{
              koreanStatus: '전체',
              checked: all,
              width: '24.8%',
              changeFunc: () => this.setState({all: !all}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '준비',
              checked: standby,
              width: '24.8%',
              changeFunc: () => this.setState({standby: !standby}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '진행중',
              checked: progress,
              width: '24.8%',
              changeFunc: () => this.setState({progress: !progress}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '완료',
              checked: completed,
              width: '24.8%',
              changeFunc: () => this.setState({completed: !completed}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
          </Box>
        </>
    )
  }
}

export default SearchInstructionBar;
