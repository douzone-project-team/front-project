import {Component} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';

class CustomerInputBar extends Component {
    render() {
        return (
            <>
              <BusinessIcon/>거래처
            <TableContainer component={Paper} style={{ maxHeight: '200px'}}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#e0e0e0' }}>
                                거래처 코드
                            </TableCell>
                            <TableCell>
                                <Input placeholder="Enter value" />
                            </TableCell>
                            <TableCell style={{ backgroundColor: '#e0e0e0' }}>
                                거래처 명칭
                            </TableCell>
                            <TableCell>
                                <Input placeholder="Enter value" />
                            </TableCell>
                            <TableCell style={{ backgroundColor: '#e0e0e0' }}>
                                연락처
                            </TableCell>
                            <TableCell>
                                <Input placeholder="Enter value" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        );
    }
}

export default CustomerInputBar;