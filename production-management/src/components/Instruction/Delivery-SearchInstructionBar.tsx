import React, {Component} from "react";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {Box, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

let searchValue = {
    progressStatus: '',
    employeeName: '',
    startDate: '',
    endDate: '',
};

class DeliverySearchInstructionBar extends Component {
    static contextType = InstructionsContext;

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
                              marginLeft: '5x',
                              marginRight: '5px',
                              fontSize: '15px',
                              fontWeight: 'bold'
                          }}>등록자</span>
                            <input type="text" placeholder="등록자"
                                   style={{height: '20px', width: '120px', marginRight: '10px'}}
                                   onChange={(e) => {
                                       searchValue.employeeName = e.target.value
                                   }}
                            />
                        </label>
                        <label>
                            <span style={{
                                marginLeft: '5x',
                                marginRight: '5px',
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }}>진행 상태</span>
                            <select
                                   style={{height: '20px', width: '120px', marginRight: '10px'}}
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
                                    width: '40px',
                                    marginRight: '10px'
                                }}
                                onClick={this.handleSearchClick}>검색
                        </button>
                    </div>
                </Box>
            </>
        )
    }
}

export default DeliverySearchInstructionBar;
