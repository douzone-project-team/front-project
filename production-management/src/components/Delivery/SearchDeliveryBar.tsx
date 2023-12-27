import React, {Component} from "react";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Box, Button} from "@material-ui/core";
import {SearchButton} from "../../core/button/SearchButton";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import { ProgressButton } from "../../core/button/ProgressButton";
import { TextInput } from '../../core/input/TextInput';
import { DateInput } from "../../core/input/DateInput";
import Swal from 'sweetalert2';

let searchValue = {
  deliveryNo: '',
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
};

type SearchState = {
  all: boolean,
  incomplete: boolean,
  completed: boolean,
}

class SearchDeliveryBar extends Component<Props, SearchState> {
  static contextType = DeliveriesContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      all: false,
      incomplete: false,
      completed: false,
    }
  }

  setStateAllFalse = () => {
    this.setState({
      all: false,
      incomplete: false,
      completed: false,
    })
  }

  handleSearchClick = () => {
    const state = this.context as DeliveriesState;
    state.search.page = 1;
    if(searchValue.startDate === '' || searchValue.endDate === '') {
      Swal.fire({
        icon: "warning",
        text: "출고일은 필수값입니다. (시작일, 종료일)"
      });
      return;
    }
    state.setSearch(searchValue.employeeName, searchValue.startDate, searchValue.endDate, searchValue.deliveryNo);
  }

  handleSearchProgressState = (progressStatus: string) => {
    const state = this.context as DeliveriesState;
    state.search.page = 1;
    state.setSearchProgressStatus(progressStatus);
  }
  
  componentDidMount = async () => {
    this.setState({all: true});
  }

  renderProgressButton = (koreanStatus: string, status: string, image: string, color: string, checked: boolean,
                          changeFunc: () => void) => (
      <Button
          variant="outlined"
          style={{
            width: '33%',
            marginLeft: '2px',
            border: '1px solid #D3D3D3',
            backgroundColor: (checked ? color : 'white')
          }}
          onClick={() => {
            this.handleSearchProgressState(status)
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
    const state = this.context as DeliveriesState;
    const {all, incomplete, completed} = this.state;

    return (
        <>
          <BarBox>
            <BarLeftBox width='90%' minWidth='1010px'>
              <TextInput title='출고번호' onBlur={(e) => {
                searchValue.deliveryNo = e.target.value
              }} label={{ml: '30px'}} input={{width:'120px'}}/>
              <TextInput title='담당자' onBlur={(e) => {
                searchValue.employeeName = e.target.value
              }} label={{ml: '30px'}} input={{width:'120px'}}/>
              <DateInput title='출고일'
                         darkMode
                         startDate={{
                           datalaceholder: '시작일',
                           onChange: (e) => {
                             searchValue.startDate = e.target.value
                           },
                           defaultValue: state.search.startDate,
                           required: true
                         }}
                         endDate={{
                           datalaceholder: '종료일',
                           onChange: (e) => {
                             searchValue.endDate = e.target.value
                           },
                           defaultValue: state.search.endDate,
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
              width:'31.5%',
              changeFunc: () => this.setState({all: !all}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '미완료',
              checked: incomplete,
              width:'31.5%',
              changeFunc: () => this.setState({incomplete: !incomplete}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '완료',
              checked: completed,
              width:'31.5%',
              changeFunc: () => this.setState({completed: !completed}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
          </Box>
        </>
    )
  }
}

export default SearchDeliveryBar;
