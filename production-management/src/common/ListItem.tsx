import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Accordion, AccordionDetails, Button} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BusinessIcon from '@material-ui/icons/Business';
import {Link} from 'react-router-dom';
import ListItemIcon from "@material-ui/core/ListItemIcon";

interface MainListItemsProps {
  open: boolean;
  onDrawerToggle: () => void;
}

interface MainListItemsState {
  isItemAccordionOpen: boolean;
  isBusinessAccordionOpen: boolean;
  isOrderAccordionOpen: boolean;
  isShippingAccordionOpen: boolean;
}

class MainListItems extends Component<MainListItemsProps, MainListItemsState> {
  constructor(props: MainListItemsProps) {
    super(props);
    this.state = {
      isItemAccordionOpen: false,
      isBusinessAccordionOpen: false,
      isOrderAccordionOpen: false,
      isShippingAccordionOpen: false,
    };
  }

  toggleAccordion = (section: keyof MainListItemsState) => {
    this.setState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));

    this.props.onDrawerToggle();
  };


  componentDidUpdate(prevProps: MainListItemsProps) {
    if (!this.props.open && prevProps.open) {
      this.setState({
        isItemAccordionOpen: false,
        isBusinessAccordionOpen: false,
        isOrderAccordionOpen: false,
        isShippingAccordionOpen: false,
      });
    }
  }

  render() {
    const {open} = this.props;
    const {
      isItemAccordionOpen,
      isBusinessAccordionOpen,
      isOrderAccordionOpen,
      isShippingAccordionOpen,
    } = this.state;

    // 색상
    const iconAndTextStyles = {
      color: 'rgba(255,255,255,0.75)',
      fontFamily: 'S-CoreDream-3Light'
    };
    const accordionStyles = {
      backgroundColor: '#333948',
      fontFamily: 'S-CoreDream-3Light'
    };

    return (
        <React.Fragment>
          <Link to="/product/list" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button onClick={() => this.toggleAccordion('isItemAccordionOpen')}>
                <ListItemIcon style={iconAndTextStyles}>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText><span style={iconAndTextStyles}>품목</span></ListItemText>
              </Button>
            </ListItem>
          </Link>
          <Link to="/customer/list" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button onClick={() => this.toggleAccordion('isBusinessAccordionOpen')}>
                <ListItemIcon style={iconAndTextStyles}>
                  <BusinessIcon/>
                </ListItemIcon>
                <ListItemText><span style={iconAndTextStyles}>거래처</span></ListItemText>
              </Button>
            </ListItem>
          </Link>
          <ListItem>
            <Button onClick={() => this.toggleAccordion('isOrderAccordionOpen')}>
              <ListItemIcon style={iconAndTextStyles}>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText><span style={iconAndTextStyles}>지시</span></ListItemText>
            </Button>
          </ListItem>
          {isOrderAccordionOpen && (
              <Accordion expanded={isOrderAccordionOpen}
                         onChange={() => this.toggleAccordion('isOrderAccordionOpen')}
                         style={accordionStyles}>
                <AccordionDetails>
                  <Link to="/instruction/add" style={{textDecoration:'none'}}>
                    <ListItem style={{marginBottom: -40}}>
                      <Button>
                        <ListItemText><span style={iconAndTextStyles}>지시 등록</span></ListItemText>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
                <AccordionDetails>
                  <Link to="/instruction/list" style={{textDecoration:'none'}}>
                    <ListItem>
                      <Button>
                        <ListItemText><span style={iconAndTextStyles}>지시 현황</span></ListItemText>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
          )}
          <ListItem>
            <Button onClick={() => this.toggleAccordion('isShippingAccordionOpen')}>
              <ListItemIcon style={iconAndTextStyles}>
                <LocalShippingIcon/>
              </ListItemIcon>
              <ListItemText><span style={iconAndTextStyles}>출고</span></ListItemText>
            </Button>
          </ListItem>
          {isShippingAccordionOpen && (
              <Accordion expanded={isShippingAccordionOpen}
                         onChange={() => this.toggleAccordion('isShippingAccordionOpen')}
                         style={accordionStyles}>
                <AccordionDetails>
                  <Link to="/delivery/add" style={{textDecoration:'none'}}>
                    <ListItem style={{marginBottom: -40}}>
                      <Button>
                        <ListItemText><span style={iconAndTextStyles}>출고 등록</span></ListItemText>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
                <AccordionDetails>
                  <Link to="/delivery/list" style={{textDecoration:'none'}}>
                    <ListItem>
                      <Button>
                        <ListItemText><span style={iconAndTextStyles}>출고 현황</span></ListItemText>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
          )}
        </React.Fragment>
    );
  }
}


class SecondaryListItems extends Component {
  render() {

    // 색상
    const iconAndTextStyles = {
      color: 'rgba(255,255,255,0.75)',
      fontFamily: 'S-CoreDream-3Light'
    }

    const storedEmployeeData = localStorage.getItem('employee');
    const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};
    const isAdmin = employeeData.role;

    if(isAdmin !== 'ROLE_ADMIN'){
      return null;
    }

    return (
        <React.Fragment>
          <Link to="/employee/list" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button>
                <ListItemIcon style={iconAndTextStyles}>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText><span style={iconAndTextStyles}>사원 조회</span></ListItemText>
              </Button>
            </ListItem>
          </Link>
        </React.Fragment>
    );
  }
}

export {MainListItems, SecondaryListItems};
