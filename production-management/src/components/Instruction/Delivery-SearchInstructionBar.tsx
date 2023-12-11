import React, {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionSearch, InstructionsState} from "../../object/Instruction/Instruction-object";
import {TextInput} from "../../core/input/TextInput";
import {DateInput} from "../../core/input/DateInput";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {SearchButton} from "../../core/button/SearchButton";
import { SearchBox } from "../../core/box/SearchBox";

let searchValue = {
  progressStatus: '',
  employeeName: '',
  startDate: '',
  endDate: '',
  expirationStartDate: '',
  expirationEndDate: ''
} as InstructionSearch;

class DeliverySearchInstructionBar extends Component {
  static contextType = InstructionsContext;

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

  render() {
    const state = this.context as InstructionsState;
    return (
        <SearchBox p='5px'>
          <BarBox>
            <BarLeftBox width='70vw'>
              <TextInput title='등록자'
                         onBlur={(e) => {
                           searchValue.employeeName = e.target.value
                         }}
                         input={{width: '100px'}}
                         label={{ml: '0px'}}
              />
              <label style={{marginLeft: '10px'}}>
                <span style={{
                  marginLeft: '5px',
                  marginRight: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}>진행 상태</span>
                <select
                    style={{height: '20px', width: '60px'}}
                    value={searchValue.progressStatus}
                    onChange={(e) => {
                      searchValue.progressStatus = e.target.value;
                      this.handleSearchProgressState(e.target.value);
                    }}
                >
                  <option value="STANDBY">준비</option>
                  <option value="PROGRESS">진행중</option>
                </select>
              </label>
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
            </BarLeftBox>
            <BarRightBox>
              <SearchButton
                  size={25}
                  onClick={this.handleSearchClick}
              />
            </BarRightBox>
          </BarBox>
        </SearchBox>
    )
  }
}

export default DeliverySearchInstructionBar;
