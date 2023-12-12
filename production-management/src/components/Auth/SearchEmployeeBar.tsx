import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {AuthContext, Props} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {TextInput} from "../../core/input/TextInput";
import {SearchButton} from "../../core/button/SearchButton";
import {Select} from "@material-ui/core";
import {AddItemButton} from "../../core/button/AddItemButton";
import CustomerAddModal from "../Modal/Customer/CustomerAddModal";
import EmployeeAddModal from "../Modal/Auth/EmployeeAddModal";

type State = {
    employeeAddModalOpen: boolean
}

let searchValue = {
    employeeNo: 0,
    name: '',
    role: '',
}

class SearchEmployeeBar extends Component<Props, State> {
    static contextType = AuthContext;

    constructor(Props: Props) {
        super(Props);
        this.state = {
            employeeAddModalOpen: false,
        } as State;
    }

    addEmployee = (name: string, employeeNo: number, id: string, password: string, tel: string,
                email: string, role: string) => {

    }

    handleSearchClick = () => {
        const state = this.context as AuthState;
        state.setSearch(searchValue.employeeNo, searchValue.name);
    }

    handleSearchRoleState = (role: string) => {
        const state = this.context as AuthState;
        state.search.page = 1;
        state.setSearchRole(searchValue.role);
    }

    render() {
        return (
            <>
                <BarBox>
                    <BarLeftBox width='90%' minWidth='1010px'>
                        <TextInput title='사번' onBlur={(e) => {
                            searchValue.employeeNo = parseInt(e.target.value)
                        }} />
                        <TextInput title='이름' onBlur={(e) => {
                            searchValue.name = e.target.value
                        }} />
                        <label>
                        <span style={{
                            marginLeft: '50px',
                            marginRight: '5px',
                            fontSize: '17px',
                            fontWeight: 'bold'
                        }}>역할</span>
                            <select
                                style={{
                                    height: '30px',
                                    marginLeft: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #D3D3D3',
                                    width: '150px',
                                    fontFamily: 'S-CoreDream-3Light',
                                    fontSize: '15px'
                                }}
                                value={searchValue.role}
                                onChange={(e) => {
                                    searchValue.role = e.target.value;
                                    this.handleSearchRoleState(e.target.value);
                                }}
                            >
                                <option value="" style={{fontFamily: 'S-CoreDream-3Light'}}>전체</option>
                                <option value="ROLE_MEMBER" style={{fontFamily: 'S-CoreDream-3Light'}}>사원</option>
                                <option value="ROLE_ADMIN" style={{fontFamily: 'S-CoreDream-3Light'}}>관리자</option>
                            </select>
                        </label>
                    </BarLeftBox>
                    <BarRightBox minWidth='60px'>
                        <SearchButton size={35} onClick={this.handleSearchClick} />
                        &nbsp;&nbsp;
                        <AddItemButton
                            size={35}
                            onClick={() => this.setState((prevState) =>
                                ({employeeAddModalOpen: !prevState.employeeAddModalOpen}))}
                        />
                    </BarRightBox>
                </BarBox>
                <React.Fragment>
                    {this.state.employeeAddModalOpen ? (
                    <EmployeeAddModal onClose={() => this.setState({employeeAddModalOpen: false})}
                                      addEmployee={this.addEmployee}
                    />
                    ) : null}
                </React.Fragment>
            </>
        );
    }
}

export default SearchEmployeeBar;