import React, {Component} from "react";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Box, Button} from "@material-ui/core";

let searchValue = {
    progressStatus: '',
    employeeName: '',
    startDate: '',
    endDate: '',
};

class SearchDeliveryBar extends Component {
    static contextType = DeliveriesContext;

    handleSearchClick = () => {
        const state = this.context as DeliveriesState;
        state.setSearch(searchValue.employeeName, searchValue.startDate, searchValue.endDate);
    }

    handleSearchProgressState = (progressStatus: string) => {
        const state = this.context as DeliveriesState;
        state.search.page = 1;
        state.setSearchProgressStatus(progressStatus);
    }

    renderProgressButton = (koreanStatus: string, status: string, image: string, color: string) => (
        <Button
            variant="outlined"
            style={{width: '33%', marginLeft: '2px', border: '1px solid #D3D3D3'}}
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
        const state = this.context as DeliveriesState;
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
                    <label>
              <span style={{
                  marginLeft: '5vh',
                  marginRight: '0.5vh',
                  fontSize: '1.5vh',
                  fontWeight: 'bold'
              }}>담당자</span>
                        <input type="text" placeholder="담당자"
                               style={{height: '2vh', marginTop: '0.6vh'}}
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
              }}>출고일</span>
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
                    {this.renderProgressButton('전체', '', 'all.png', 'darkblue')}
                    {this.renderProgressButton('미완료', 'INCOMPLETE', 'standby.png', 'gray')}
                    {this.renderProgressButton('완료', 'COMPLETE', 'completed.png', 'forestgreen')}
                </Box>
            </>
        )
    }
}

export default SearchDeliveryBar;
