import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {TextInput} from "../../core/input/TextInput";
import {SearchButton} from "../../core/button/SearchButton";
import {Select} from "@material-ui/core";

let searchValue = {
    employeeNo: 0,
    name: '',
    role: '',
}

class SearchEmployeeBar extends Component {
    static contextType = AuthContext;

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
                    <BarLeftBox width='70vw'>
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
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }}>역할</span>
                            <select
                                style={{height: '20px', marginLeft: '10px', borderRadius: '5px', width: '100px'}}
                                value={searchValue.role}
                                onChange={(e) => {
                                    searchValue.role = e.target.value;
                                    this.handleSearchRoleState(e.target.value);
                                }}
                            >
                                <option value="">전체</option>
                                <option value="ROLE_MEMBER">사원</option>
                                <option value="ROLE_ADMIN">관리자</option>
                            </select>
                        </label>
                    </BarLeftBox>
                    <BarRightBox>
                        <SearchButton size={30} onClick={this.handleSearchClick} />
                    </BarRightBox>
                </BarBox>
            </>
        );
    }
}

export default SearchEmployeeBar;