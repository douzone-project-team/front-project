import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState, ProductInstruction} from "../../object/Instruction/Instruction-object";
import "./../../assets/css/Table.css";
import {AddProduct} from "../../object/DeliveryInstruction/delivery-instruction-object";

type Props = {
    instructionNo: string,
    setProduct: (product: AddProduct) => void,
}

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

class ViewDeliveryInstructionTable extends Component<Props> {
    static contextType = InstructionsContext;

    componentDidMount() {
        const {instructionNo} = this.props;
        this.context.getInstruction(instructionNo);
    }

    render() {
        const state = this.context as InstructionsState;
        const list = state.instruction.products;

        const {setProduct, instructionNo} = this.props as Props;

        return (
            <>
          <span className='table-header'>지시 상세 :
            <span style={{color: '#0C70F2'}}>{this.props.instructionNo}</span>
          </span>
                <TableContainer className='table-container' style={{height: '170px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>상품 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>상품 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>상품 이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>갯수</TableCell>
                                <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? (
                                list.map((row) => (
                                    <TableRow
                                        className="cellHoverEffect"
                                        onClick={() => setProduct({
                                            instructionNo,
                                            productNo: row.productNo,
                                            productCode: row.productCode,
                                            amount: row.amount,
                                            remainAmount: row.remainAmount,
                                        })}
                                        key={row.productNo}>
                                        <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                                        <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                                        <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                                        <TableCell align="center" style={cellStyle}>{row.amount}</TableCell>
                                        <TableCell align="center" style={cellStyle}>{row.remainAmount}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell align="center" style={cellStyle}>
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryInstructionTable;