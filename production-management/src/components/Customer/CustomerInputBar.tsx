import {Component} from 'react';
import {
    Box
} from "@material-ui/core";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState} from "../../object/Customer/customer-object";

let inputValue = {
    customerCode:'',
    customerName:'',
    sector:''
}

let insertBarState = {
    insertBar:false
}

class CustomerInputBar extends Component {
    static contextType = CustomersContext;

    handleSearchClick = () => {
        const state = this.context as CustomersState;
        state.setSearch(inputValue.customerCode, inputValue.customerName, inputValue.sector);
    }

    handleAddClick = () => {
        const state = this.context as CustomersState;
        state.setInsertBar(!insertBarState.insertBar);
    }

    render() {
        return (
            <>
                {/*<Box style={{ display: 'flex', marginBottom:'10px'}}>*/}
                {/*    <BusinessIcon/> <Typography style={{marginLeft:'10px'}}>거래처</Typography>*/}
                {/*</Box>*/}
                <Box
                    sx={{
                        width: '990px',
                        height: '45px',
                        border: '1.4px solid #D3D3D3',
                        marginBottom: '10px',
                        marginLeft: '2px'
                    }}
                >
                    <label>
                    <span style={{
                      marginLeft: '40px',
                      marginRight: '7px',
                      fontSize: '15px',
                      fontWeight: 'bold'
                    }}>거래처 코드</span>
                        <input type="text" placeholder="거래처 코드"
                               style={{height: '20px', marginTop: '6px', width: '100px'}}
                               onBlur={(e) => {
                                   inputValue.customerCode = e.target.value
                               }}
                        />
                    </label>
                    <label>
                    <span style={{
                      marginLeft: '30px',
                      marginRight: '7px',
                      fontSize: '15px',
                      fontWeight: 'bold'
                    }}>거래처 명칭</span>
                    <input type="text" placeholder="거래처 명칭"
                               style={{height: '20px', marginTop: '6px'}}
                               onBlur={(e) => {
                                   inputValue.customerName = e.target.value
                               }}
                    />
                    </label>
                    <label>
                    <span style={{
                        marginLeft: '40px',
                        marginRight: '7px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}>업종</span>
                            <input type="text" placeholder="업종"
                                   style={{height: '20px', marginTop: '6px'}}
                                   onBlur={(e) => {
                                       inputValue.sector = e.target.value
                                   }}
                            />
                    </label>
                    <button type="submit"
                            style={{height: '31px', marginTop: '6px', marginLeft:'50px', marginRight:'10px'}}
                            onClick={this.handleSearchClick}
                    >조회
                    </button>
                    <button type="submit"
                            style={{height: '31px', marginTop: '6px'}}
                            onClick={this.handleAddClick}
                    >거래처 추가
                    </button>
                </Box>
            </>
        );
    }
}

export default CustomerInputBar;