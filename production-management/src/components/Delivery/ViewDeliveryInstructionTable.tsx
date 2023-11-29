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
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5'
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
                <div style={{
                    width: '100%',
                    height: '30px',
                    marginLeft: '2px',
                    display: 'flex',
                }}>
                    <div style={{width: '95%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={require('./../../images/icon/detail.png')} style={{width: '20px'}}/>
                            <span className='table-header'
                                  style={{fontWeight: 'bold', fontSize: '16px'}}> 지시 상세 : &nbsp; </span>
                                <span style={{color: '#0C70F2'}}>{this.props.instructionNo}</span>
                        </div>
                    </div>
                </div>
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
                                        <TableCell align="center">{row.productNo}</TableCell>
                                        <TableCell align="center">{row.productCode}</TableCell>
                                        <TableCell align="center">{row.productName}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.remainAmount}</TableCell>
                                    </TableRow>
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryInstructionTable;