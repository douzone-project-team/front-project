import {Component} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {CustomersContext} from "../../../store/Customer/customers-context";
import "./../../../assets/css/Modal.css"
import {CustomersState} from "../../../object/Customer/customer-object";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";

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
          <section>
            <header>
              <button className="close" onClick={onClose}>
                &times;
              </button>
            </header>
            <main>
              <Box
                  sx={{
                    width: '100%',
                    height: '40px',
                    border: '1.4px solid #D3D3D3',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
              >
                <div style={{width: '80%', marginBottom: '7px', marginTop: '7px'}}>
                  <label>
                    <span style={{
                      marginRight: '5px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>코드</span>
                    <input type="text" placeholder="거래처 코드"
                           style={{height: '20px'}}
                           onBlur={(e) => {
                             this.setState({customerCode: e.target.value})
                           }}/>
                  </label>
                  <label>
                    <span style={{
                      marginLeft: '10px',
                      marginRight: '7px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>명칭</span>
                    <input type="text" placeholder="거래처 명칭"
                           style={{height: '20px'}}
                           onBlur={(e) => {
                             this.setState({customerName: e.target.value})
                           }}
                    />
                  </label>
                </div>
                <div style={{width: '20%', marginTop: '7px', marginBottom: '7px'}}>
                  <button type="submit"
                          style={{
                            height: '25px',
                            marginRight: '10px'
                          }}
                          onClick={this.handleSearchClick}
                  >조회
                  </button>
                </div>
              </Box>
              <TableContainer className='table-container' style={{height: '350px'}}>
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
                    {list === undefined || list.map((row) => (
                        <TableRow key={row.customerNo} className='cellHoverEffect' onClick={() => this.setCustomer(row.customerNo, row.customerName)}>
                          <TableCell align="center" style={cellStyle}>
                            {row.customerNo}</TableCell>
                          <TableCell align="center" style={cellStyle}>{row.customerCode}</TableCell>
                          <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                          <TableCell align="center" style={cellStyle}>{row.sector}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                >
                  <KeyboardArrowLeft onClick={handlePrevPage}/>
                  <KeyboardArrowRight onClick={handleNextPage}/>
                </Box>
              </TableContainer>
            </main>
          </section>
        </div>
    )
  }
}

export default CustomerModal;