import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";

let inputValue = {
    employeeNo: 0,
    name: '',
    role: '',
}

class EmployeeSearchBar extends Component {
    static contextType = AuthContext;

    handleSearchClick = () => {
        const state = this.context as AuthState;
        state.setSearch(inputValue.employeeNo, inputValue.name);
    }

    handleSearchRoleState = (role: string) => {
        const state = this.context as AuthState;
        state.search.page = 1;
        state.setSearchRole(inputValue.role);
    }

    render() {
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
                            marginLeft: '40px',
                            marginRight: '7px',
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }}>사번</span>
                            <input type="number" placeholder="사번"
                                       style={{marginLeft: '10px', height: '20px'}}
                                       onBlur={(e) => {
                                           inputValue.employeeNo = parseInt(e.target.value)
                                       }}
                            />
                        </label>
                        <label>
                        <span style={{
                            marginLeft: '60px',
                            marginRight: '5px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>이름</span>
                            <input type="text" placeholder="이름"
                                   style={{height: '20px', marginLeft: '10px'}}
                                   onBlur={(e) => {
                                       inputValue.name = e.target.value
                                   }}
                            />
                        </label>
                        <label>
                    <span style={{
                        marginLeft: '60px',
                        marginRight: '5px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>역할</span>
                            <select
                                style={{height: '20px', marginLeft: '10px', borderRadius: '5px'}}
                                value={inputValue.role}
                                onChange={(e) => {
                                    inputValue.role = e.target.value;
                                    this.handleSearchRoleState(e.target.value);
                                }}
                            >
                                <option value="">전체</option>
                                <option value="ROLE_MEMBER">사원</option>
                                <option value="ROLE_ADMIN">관리자</option>
                            </select>
                        </label>
                    </div>
                    <div style={{marginBottom: '7px', marginTop: '7px'}}>
                        <img src={require('../../images/button/search-button.png')}
                             style={{width: '30px', marginRight: '10px', marginTop: '6px'}}
                             className='cellHoverEffect' onClick={this.handleSearchClick}/>
                    </div>
                </Box>
            </>
        );
    }
}

export default EmployeeSearchBar;