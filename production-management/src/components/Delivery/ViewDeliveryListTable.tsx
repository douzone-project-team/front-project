import React, {Component} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';

import "./../../assets/css/Table.css";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState, Delivery} from "../../object/Delivery/delivery-object";
import {ListTitle} from "../../core/ListTitle";
import {PageButton} from "../../core/button/PageButton";
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light'
}

const myMap: Map<string, string> = new Map<string, string>([
  ['INCOMPLETE', '미완료'],
  ['COMPLETED', '완료'],
]);

type Props = {
  tableSize: boolean,
  tableSizeUp: () => void,
  changeAmountStatusFalse: () => void,
}

class ViewDeliveryListTable extends Component<Props> {
  static contextType = DeliveriesContext;

  render() {
    const state = this.context as DeliveriesState;
    const list = state.deliveryPage.list || [];
    const currentPage = state.deliveryPage.currentPage;
    const {tableSize, tableSizeUp, changeAmountStatusFalse} = this.props;

    const handleNextPage = () => {
      if (state.deliveryPage.hasNextPage) {
        state.setPage(state.search.page + 1);
      }
    };

    const handlePrevPage = () => {
      if (state.deliveryPage.hasPreviousPage) {
        state.setPage(state.search.page - 1);
      }
    };

    return (
        <>
          <ListTitle options={{title: '출고 목록', count: list.length}}/>
          <TableContainer className='table-container' style={{
            height: this.props.tableSize ? '67.2%' : '20%',
            transition: 'height 0.3s ease-in-out'
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>출고 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>담당자</TableCell>
                  <TableCell align="center" style={boldCellStyle}>출고일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 개수</TableCell>
                  <TableCell align="center" style={boldCellStyle}>출고 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 ? list.map((row) => (
                        <TableRow
                            key={row.deliveryNo}
                            className='cellHoverEffect'
                            onClick={() => {
                              state.getDelivery(row.deliveryNo);
                              changeAmountStatusFalse();
                              if (tableSize) {
                                tableSizeUp();
                              }
                            }}>
                          <TableCell align="center" style={{...tableCellStyle, fontWeight: 'bold'}}>
                            {row.deliveryNo}</TableCell>
                          <TableCell align="center" style={tableCellStyle}>{row.employeeName}</TableCell>
                          <TableCell align="center" style={tableCellStyle}>{row.deliveryDate}</TableCell>
                          <TableCell align="center" style={tableCellStyle}>{row.instructionCount}</TableCell>
                          <TableCell align="center" style={{...tableCellStyle, width: '50px'}}>
                            <div className={row.deliveryStatus}>
                              {myMap.get(row.deliveryStatus.toUpperCase())}
                            </div>
                          </TableCell>
                        </TableRow>
                    )) :
                    <TableRow>
                      <TableCell colSpan={7} style={{border: '0'}}>
                        {currentPage != -1? <NullText/> : <Loading/> }
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
            {currentPage != -1 && list.length > 0 ?
                <PageButton options={{
                  currentPage: state.deliveryPage.currentPage,
                  handleNextPage: handleNextPage,
                  handlePrevPage: handlePrevPage,
                  hasNextPage: state.deliveryPage.hasNextPage,
                  hasPreviousPage: state.deliveryPage.hasPreviousPage
                }}/> : null}
          </TableContainer>
        </>
    );
  }
}

export default ViewDeliveryListTable;