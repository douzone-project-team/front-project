import React, {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import Box from "@material-ui/core/Box";
import {EmployeeContext} from "../../store/Employee/employee-context";

let inputValue = {
    employeeNo: 0,
    name: '',
    role: '',
}

class EmployeeSearchBar extends Component {
    static contextTypes = EmployeeContext;

    handleSearchClick = () => {
        const state = this.context as EmployeeState;
        state.setSearch(inputValue.employeeNo, inputValue.name);
    }

    handleSearchRoleState = (role: string) => {
        const state = this.context as EmployeeState;
        state.search.page = 1;
        state.setSearchRole(inputValue.role);
    }

    render() {
        return(
            <>
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
                    }}>사번</span>
                        <input type="number" placeholder="사번"
                               style={{height: '25px', marginTop: '6px', width: '100px'}}
                               onBlur={(e) => {
                                   inputValue.employeeNo = parseInt(e.target.value)
                               }}
                        />
                    </label>
                    <label>
                    <span style={{
                        marginLeft: '30px',
                        marginRight: '7px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}>이름</span>
                        <input type="text" placeholder="이름"
                               style={{height: '25px', marginTop: '6px'}}
                               onBlur={(e) => {
                                   inputValue.name = e.target.value
                               }}
                        />
                    </label>
                    <label>
                    <span style={{
                        marginLeft: '30px',
                        marginRight: '7px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}>역할</span>
                        <select
                            style={{height: '20px', width: '120px', marginRight: '10px'}}
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
                    <button type="submit"
                            style={{height: '31px', marginTop: '6px', marginLeft:'20px', marginRight:'10px'}}
                            onClick={this.handleSearchClick}
                    >
                        조회
                    </button>
                </Box>
            </>
        );
    }
}

export default EmployeeSearchBar;