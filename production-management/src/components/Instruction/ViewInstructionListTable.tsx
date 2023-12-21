import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import "./../../assets/css/Table.css";

import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {PageButton} from "../../core/button/PageButton";
import {ListTitle} from "../../core/ListTitle";
import {Loading} from "../../core/Loading";
import {NullText} from "../../core/NullText";

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
  fontSize: '16px'
}

const myMap: Map<string, string> = new Map<string, string>([
  ['COMPLETED', '완료'],
  ['PROGRESS', '진행'],
  ['STANDBY', '준비'],
]);

type Props = {
  tableSize: boolean,
  tableSizeUp: () => void,
  changeAmountStatusFalse: () => void,
  clearCheckBoxs: () => void,
}

type State = {
  selectedRowIndex: number
}

class ViewInstructionListTable extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRowIndex: 0
    }
  }

  handleRowClick = (index: number) => {
    this.setState({selectedRowIndex: index});
  };

  render() {
    const state = this.context as InstructionsState;
    const list = state.instructionPage.list;
    const currentPage = state.instructionPage.currentPage;
    const {tableSize, tableSizeUp, changeAmountStatusFalse, clearCheckBoxs} = this.props;

    const handleNextPage = () => {
      if (state.instructionPage.hasNextPage) {
        state.setPage(state.search.page + 1);
      }
    };

    const handlePrevPage = () => {
      if (state.instructionPage.hasPreviousPage) {
        state.setPage(state.search.page - 1);
      }
    };

    return (
        <>
          <ListTitle options={{title: '지시 목록', count: list.length}}/>
          <TableContainer className='table-container' style={{
            height: tableSize ? '67.2%' : '20%',
            transition: 'height 0.3s ease-in-out',
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow style={{fontFamily: 'S-CoreDream-3Light'}}>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>등록자</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 ? list.map((row) => {
                      if (this.state.selectedRowIndex == 0) {
                        this.setState({selectedRowIndex: list[0].instructionNo.replace(/\D/g, '') as unknown as number});
                      }
                      return (
                          <TableRow key={row.instructionNo.replace(/\D/g, '')}
                                    className={`cellHoverEffect ${this.state.selectedRowIndex === row.instructionNo.replace(/\D/g, '') as unknown as number ? 'selectedRow' : ''}`}
                                    onClick={() => {
                                      this.handleRowClick(row.instructionNo.replace(/\D/g, '') as unknown as number);
                                      state.getInstruction(row.instructionNo);
                                      changeAmountStatusFalse();
                                      clearCheckBoxs();
                                      if (tableSize) {
                                        tableSizeUp();
                                      }
                                    }}>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.instructionNo}</TableCell>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.employeeName}</TableCell>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.customerNo}</TableCell>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.customerName}</TableCell>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.instructionDate}</TableCell>
                            <TableCell align="center"
                                       style={tableCellStyle}>{row.expirationDate}</TableCell>
                            <TableCell align="center" style={{width: '50px'}}>
                              <div className={row.progressStatus}>
                                {myMap.get(row.progressStatus.toUpperCase())}
                              </div>
                            </TableCell>
                          </TableRow>)
                    }) :
                    <TableRow>
                      <TableCell colSpan={7} style={{border: '0'}}>
                        {currentPage != -1 ? <NullText/> : <Loading/>}
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
            {currentPage != -1 && list.length > 0 ?
                <PageButton options={{
                  currentPage: state.instructionPage.currentPage,
                  handleNextPage: handleNextPage,
                  handlePrevPage: handlePrevPage,
                  hasNextPage: state.instructionPage.hasNextPage,
                  hasPreviousPage: state.instructionPage.hasPreviousPage
                }}
                /> : null
            }
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionListTable;