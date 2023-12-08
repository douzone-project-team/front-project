import React, {Component} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";
import {ListTitle} from "../../core/ListTitle";
import {PageButton} from "../../core/button/PageButton";
import Avatar from "@material-ui/core/Avatar";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}

const myMap: Map<string, string> = new Map<string, string>([
    ['ROLE_ADMIN', '관리자'],
    ['ROLE_MEMBER', '사원'],
]);

class ViewEmployeeListTable extends Component {
    static contextType = AuthContext;

    componentDidMount() {
        const state = this.context as AuthState;
        state.getEmployeeList();
    }

    render() {
        const state = this.context as AuthState;
        const list = state.employeePage?.list;

        const handleNextPage = () => {
            if (state.employeePage.hasNextPage) {
                state.setPage(state.search.page + 1);
            }
        };

        const handlePrevPage = () => {
            if (state.employeePage.hasPreviousPage) {
                state.setPage(state.search.page - 1);
            }
        };

        return (
            <>
                <ListTitle options={{title: '사원 목록', count: list.length}}/>
                <TableContainer className='table-container' style={{height: '380px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={boldCellStyle}>사진</TableCell>
                                <TableCell align="center" style={boldCellStyle}>사번</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이메일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>권한</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? list.map((row) => (
                                <TableRow key={row.employeeNo}
                                          className='cellHoverEffect'
                                          onClick={() => state.getEmployee(row.employeeNo)}>
                                    <TableCell align="center" style={tableCellStyle}>
                                        <Avatar style={{ width: 25, height: 25, marginLeft: 'auto', marginRight: 'auto'}}
                                            src={(`http://localhost:8080/employees/${row.employeeNo}/image`)}>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell align="center" style={tableCellStyle}>
                                        {row.employeeNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>
                                        {row.name}</TableCell >
                                    <TableCell align="center" style={tableCellStyle}>
                                        {row.tel}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>
                                        {row.email}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>
                                        <div className={row.role}>
                                            {myMap.get(row.role.toUpperCase())}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                    <PageButton options={{
                        currentPage: state.employeePage.currentPage,
                        handleNextPage: handleNextPage,
                        handlePrevPage: handlePrevPage,
                        hasNextPage: state.employeePage.hasNextPage,
                        hasPreviousPage: state.employeePage.hasPreviousPage
                    }}/>
                </TableContainer>
            </>
        )
    }
}

export default ViewEmployeeListTable;