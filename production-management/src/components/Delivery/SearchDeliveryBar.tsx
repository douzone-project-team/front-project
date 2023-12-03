import React, {Component} from "react";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Box, Button} from "@material-ui/core";
import {SearchButton} from "../../core/button/SearchButton";
import {BarBox} from "../../core/BarBox";
import { ProgressButton } from "../../core/button/ProgressButton";
import { TextInput } from '../../core/input/TextInput';

let searchValue = {
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
    state.setSearch(searchValue.employeeName, searchValue.startDate, searchValue.endDate);
  }

  handleSearchProgressState = (progressStatus: string) => {
    const state = this.context as DeliveriesState;
    state.search.page = 1;
    state.setSearchProgressStatus(progressStatus);
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

            <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
              <TextInput title='등록자' onBlur={(e) => {
                searchValue.employeeName = e.target.value
              }}/>
              <label>
                          <span style={{
                            marginLeft: '30px',
                            marginRight: '5px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>출고일</span>
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
                       }}/>
              </label>
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
              width:'33%',
              changeFunc: () => this.setState({all: !all}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '미완료',
              checked: incomplete,
              width:'33%',
              changeFunc: () => this.setState({incomplete: !incomplete}),
              handleSearchProgressState: this.handleSearchProgressState,
              setStateAllFalse: this.setStateAllFalse,
            }}/>
            <ProgressButton options={{
              koreanStatus: '완료',
              checked: completed,
              width:'33%',
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
