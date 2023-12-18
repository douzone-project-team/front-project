import {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {CustomersContext} from "../../../store/Customer/customers-context";
import "./../../../assets/css/Modal.css"
import {CustomersState} from "../../../object/Customer/customer-object";
import {SearchBox} from "../../../core/box/SearchBox";
import {TextInput} from "../../../core/input/TextInput";
import {SearchButton} from "../../../core/button/SearchButton";
import {TableBox} from "../../../core/box/TableBox";
import {PageButton} from "../../../core/button/PageButton";
import {BarBox, BarLeftBox, BarRightBox} from "../../../core/box/BarBox";
import { ListTitle } from "../../../core/ListTitle";
import BusinessIcon from '@material-ui/icons/Business';

type CustomerModalProps = {
  onClose: () => void,
  setCustomer: (customerNo: number, customerName: string) => void
}

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
};

type CustomerModalState = {
  customerCode: string,
  customerName: string,
  sector: string
}


class CustomerModal extends Component<CustomerModalProps, CustomerModalState> {
  static contextType = CustomersContext;

  constructor(props: CustomerModalProps) {
    super(props);
    this.state = {
      customerCode: '',
      customerName: '',
      sector: ''
    }
  }

  componentDidMount = () => {
    const state = this.context as CustomersState;
    state.getCustomerList();
  }

  handleSearchClick = () => {
    const state = this.context as CustomersState;
    const {customerCode, customerName, sector} = this.state;
    state.setSearch(customerCode, customerName, sector);
  }
  setCustomer = (customerNo: number, customerName: string) => {
    const {onClose, setCustomer} = this.props;
    setCustomer(customerNo, customerName);
    onClose();
  }

  render() {
    const {onClose} = this.props;

    const state = this.context as CustomersState;
    const list = state.customerPage.list;

    const handleNextPage = () => {
      if (state.customerPage.hasNextPage) {
        state.setPage(state.search.page + 1);
      }
    };

    const handlePrevPage = () => {
      if (state.customerPage.hasPreviousPage) {
        state.setPage(state.search.page - 1);
      }
    };

    return (
        <div className='modal'>
          <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '635px', width: '700px'}}>
            <div className="modalHeader" style={{height: '55px'}}>
              <div style={{display: 'flex'}}><BusinessIcon/>&nbsp;거래처 설정</div>
              <button className="close" onClick={onClose}>
                &times;
              </button>
            </div>
            <main>
              <SearchBox p='5px'>
                <BarBox>
                  <BarLeftBox width='60%'>
                    <TextInput title='코드' onBlur={(e) => {
                      this.setState({customerCode: e.target.value})
                    }}
                               label={{ml: '10px'}}
                               input={{width: '100px'}}/>
                    <TextInput title='명칭' onBlur={(e) => {
                      this.setState({customerName: e.target.value})
                    }}
                               label={{ml: '10px'}}
                               input={{width: '100px'}}
                    />
                  </BarLeftBox>
                  <BarRightBox>
                    <SearchButton size={30} onClick={this.handleSearchClick}/>
                  </BarRightBox>
                </BarBox>
              </SearchBox>
              <TableBox p='15px' height='480px'>
                <ListTitle options={{title: '거래처 목록'}}/>
                <TableContainer className='table-container' style={{height: '410px'}}>
                  <Table size='small' className='table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                        <TableCell align="center" style={boldCellStyle}>거래처 코드</TableCell>
                        <TableCell align="center" style={boldCellStyle}>거래처 명칭</TableCell>
                        <TableCell align="center" style={boldCellStyle}>업종</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list && list.length > 0 && list.map((row) => (
                          <TableRow key={row.customerNo} className='cellHoverEffect'
                                    onClick={() => this.setCustomer(row.customerNo, row.customerName)}>
                            <TableCell align="center" style={cellStyle}>
                              {row.customerNo}</TableCell>
                            <TableCell align="center"
                                       style={cellStyle}>{row.customerCode}</TableCell>
                            <TableCell align="center"
                                       style={cellStyle}>{row.customerName}</TableCell>
                            <TableCell align="center" style={cellStyle}>{row.sector}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <PageButton options={{
                    currentPage: state.customerPage.currentPage,
                    handleNextPage: handleNextPage,
                    handlePrevPage: handlePrevPage,
                    hasNextPage: state.customerPage.hasNextPage,
                    hasPreviousPage: state.customerPage.hasPreviousPage
                  }}
                  />
                </TableContainer>
              </TableBox>
            </main>
          </section>
        </div>
    )
  }
}

export default CustomerModal;