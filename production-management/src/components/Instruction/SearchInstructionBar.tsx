import {Box} from "@material-ui/core";
import {Component} from "react";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionSearch, InstructionsState} from "../../object/Instruction/Instruction-object";
import "./../../assets/css/Styles.css";
import {ProgressButton} from "../../core/button/ProgressButton";
import {SearchButton} from "../../core/button/SearchButton";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {TextInput} from '../../core/input/TextInput';
import {DateInput} from "../../core/input/DateInput";
import { initialInstructionSearchState } from "../../state/InstructionStateManagement";


let searchValue = {
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
  expirationStartDate: '',
  expirationEndDate: '',
  page: 1,
  pageSize: 8
} as InstructionSearch;

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
    state.search.page = 1;
    state.setSearch(searchValue);
  }

  handleSearchProgressState = (progressStatus: string) => {
    const state = this.context as InstructionsState;
    state.search.page = 1;
    state.setSearchProgressStatus(progressStatus);
  }

  componentDidMount = async () => {
    this.setState({all: true});
  }

  render() {
    const state = this.context as InstructionsState;
    const {all, standby, progress, completed} = this.state;

    return (
        <>
          <BarBox>
            <BarLeftBox width='90%' minWidth='1010px'>
              <TextInput title='등록자' onBlur={(e) => {
                searchValue.employeeName = e.target.value;
              }} label={{ml: '30px'}}/>
              <DateInput title='지시일'
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             searchValue.startDate = e.target.value
                           },
                           required: true
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             searchValue.endDate = e.target.value
                           },
                           required: true
                         }}
              />
              <DateInput title='만료일'
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             searchValue.expirationStartDate = e.target.value
                           },
                           required: true
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             searchValue.expirationEndDate = e.target.value
                           },
                           required: true
                         }}
              />
            </BarLeftBox>
            <BarRightBox minWidth='30px'>
              <SearchButton size={35} onClick={this.handleSearchClick}/>
            </BarRightBox>
          </BarBox>
          <Box
              sx={{
                mt: '10px',
                mb: '8px',
              }}
          >
            &nbsp;
            <ProgressButton options={{
              koreanStatus: '전체',
              checked: all,
              width: '23.3%',
              changeFunc: () => this.setState({all: !all}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '준비',
              checked: standby,
              width: '23.3%',
              changeFunc: () => this.setState({standby: !standby}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '진행',
              checked: progress,
              width: '23.3%',
              changeFunc: () => this.setState({progress: !progress}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '완료',
              checked: completed,
              width: '23.3%',
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
