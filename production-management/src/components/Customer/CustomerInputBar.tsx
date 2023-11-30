import {Component} from 'react';
import {
    Box
} from "@material-ui/core";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState, InsertCustomer} from "../../object/Customer/customer-object";
import React from 'react';
import CustomerAddModal from "../Modal/Customer/CustomerAddModal";

type State = {
    customerAddModalOpen: boolean
}

type Props = {

}

let inputValue = {
    customerCode:'',
    customerName:'',
    sector:''
}

class CustomerInputBar extends Component<Props, State> {
    static contextType = CustomersContext;

    constructor(Props: Props) {
        super(Props);
        this.state = {
            customerAddModalOpen: false
        } as State;
    }

    insertCustomer = (customerCode: string, customerName: string, customerTel: string, ceo: string, sector: string) => {
        const state = this.context as CustomersState;
        const insertCustomer : InsertCustomer = {
            customerCode,
            customerName,
            customerTel,
            ceo,
            sector
        }
        state.setInsertCustomer(insertCustomer);
    }

    handleSearchClick = () => {
        const state = this.context as CustomersState;
        state.setSearch(inputValue.customerCode, inputValue.customerName, inputValue.sector);
    }

    render() {
        return (
            <>
                {/*<Box style={{ display: 'flex', marginBottom:'10px'}}>*/}
                {/*    <BusinessIcon/> <Typography style={{marginLeft:'10px'}}>거래처</Typography>*/}
                {/*</Box>*/}
                <Box
                    sx={{
                        width: '100%',
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
                        <input type="text" placeholder=""
                               style={{height: '25px', marginTop: '6px', width: '100px', borderRadius: '5px'}}
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
                    <input type="text" placeholder=""
                               style={{height: '25px', marginTop: '6px', borderRadius: '5px'}}
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
                            <input type="text" placeholder=""
                                   style={{height: '25px', marginTop: '6px', borderRadius: '5px'}}
                                   onBlur={(e) => {
                                       inputValue.sector = e.target.value
                                   }}
                            />
                    </label>

                    <img src={require('../../images/button/add-button.png')}
                         style={{height: '31px', marginTop: '6px', float: 'right', marginRight: '6px'}}
                         onClick={() => this.setState((prevState) => ({ customerAddModalOpen: !prevState.customerAddModalOpen }))}
                    />
                    <img src={require('../../images/button/search-button.png')}
                         style={{width : '30px', height: '31px', marginTop: '6px', float: 'right', marginRight: '6px'}}
                         onClick={this.handleSearchClick}/>

                    <React.Fragment>
                            {this.state.customerAddModalOpen ? (
                                <CustomerAddModal onClose={() => this.setState({customerAddModalOpen: false})}
                                                  insertCustomer = {this.insertCustomer}
                                                  />
                            ) : null}
                    </React.Fragment>
                </Box>
            </>
        );
    }
}

export default CustomerInputBar;