import React, {Component} from "react";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Box, Button} from "@material-ui/core";

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
            <img src={require(`../../images/${image}`)} style={{width: '5vh'}} alt={koreanStatus}/>
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
                            <input type="text" placeholder="담당자"
                                   style={{height: '20px', marginTop: '100px'}}
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
                                       marginLeft: '20px',
                                       width: '100px'
                                   }}
                                   data-placeholder="출고일"
                                   required
                                   aria-required="true"
                                   onChange={(e) => {
                                       searchValue.endDate = e.target.value
                                   }}/>
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
                    {this.renderProgressButton('전체', '', 'all.png',
                        'rgb(60,123,194)', all, () => this.setState({all: !all}))}
                    {this.renderProgressButton('미완료', 'INCOMPLETE', 'standby.png',
                        'rgb(60,123,194)', incomplete, () => this.setState({incomplete: !incomplete}))}
                    {this.renderProgressButton('완료', 'COMPLETE', 'completed.png',
                        'rgb(60,123,194)', completed, () => this.setState({completed: !completed}))}
                </Box>
            </>
    )
    }
    }

    export default SearchDeliveryBar;
