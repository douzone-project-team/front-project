import React, {Component} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";
import {ListTitle} from "../../core/ListTitle";
import {PageButton} from "../../core/button/PageButton";
import Avatar from "@material-ui/core/Avatar";
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '17px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '16px',
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

    state = {
        selectedRowIndex: 1,
    };

    handleRowClick = (index: number) => {
        this.setState({selectedRowIndex: index});
    };

    render() {
        const state = this.context as AuthState;
        const list = state.employeePage?.list;
        const currentPage = state.employeePage.currentPage;

        if (list && list.length > 0 && this.state.selectedRowIndex === 1) {
            this.setState({ selectedRowIndex: list[0].employeeNo });
        }

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
                <TableContainer className='table-container' style={{height: '390px'}}>
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
                                              className={`cellHoverEffect ${this.state.selectedRowIndex === row.employeeNo ? 'selectedRow' : ''}`}
                                              onClick={() => {
                                                  this.handleRowClick(row.employeeNo)
                                                  state.getEmployee(row.employeeNo)
                                              }}>
                                        <TableCell align="center" style={tableCellStyle}>
                                            <Avatar style={{width: 25, height: 25, marginLeft: 'auto', marginRight: 'auto'}}
                                                    src={(`http://localhost:8080/employees/${row.employeeNo}/image`)}>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            {row.employeeNo}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            {row.name}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            {row.tel === '--' ? '' : row.tel}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            {row.email}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            <div className={row.role}>
                                                {myMap.get(row.role.toUpperCase())}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) :
                                <TableRow>
                                    <TableCell colSpan={7} style={{border: '0'}}>
                                        {currentPage != -1 ? <NullText/> : <Loading/>}
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                    {currentPage != -1 && list.length > 0 ?
                        <PageButton options={{
                            currentPage: state.employeePage.currentPage,
                            handleNextPage: handleNextPage,
                            handlePrevPage: handlePrevPage,
                            hasNextPage: state.employeePage.hasNextPage,
                            hasPreviousPage: state.employeePage.hasPreviousPage
                        }}/> : null}
                </TableContainer>
            </>
        );
    }
}

export default ViewEmployeeListTable;