import {Component} from "react";
import {EmployeeState} from "../../object/Employee/employee-object";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {EmployeeContext} from "../../store/Employee/employee-context";
import {AuthContext} from "../../store/Auth/auth-context";
import {AuthState} from "../../object/Auth/auth-object";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

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

        return(
            <>
                <span className='table-header'>사원 목록</span>
                <TableContainer className='table-container' style={{height:'395px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>사번</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>연락처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>이메일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>역할</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? list.map((row) => (
                                <TableRow key={row.employeeNo}
                                        onClick={() => state.getEmployee(row.employeeNo)}>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'>
                                        {row.employeeNo}</TableCell>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'>
                                        {row.name}</TableCell>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'>
                                        {row.tel}</TableCell>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'>
                                        {row.email}</TableCell>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'>
                                        {row.role === 'ROLE_ADMIN' ? '관리자' : '사원' }</TableCell>
                                </TableRow>
                            )) : null }
                        </TableBody>
                    </Table>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <KeyboardArrowLeft
                            onClick={handlePrevPage}
                        >
                            이전 페이지
                        </KeyboardArrowLeft>
                        <KeyboardArrowRight
                            onClick={handleNextPage}
                        >
                            다음 페이지
                        </KeyboardArrowRight>
                    </Box>
                </TableContainer>
            </>
        )
    }
}

export default ViewEmployeeListTable;