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
      color: '#858891',
    };
    const accordionStyles = {
      backgroundColor: '#333948',
    };

    return (
        <React.Fragment>
          <Link to="/product/list" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button onClick={() => this.toggleAccordion('isItemAccordionOpen')}>
                <ListItemIcon style={iconAndTextStyles}>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="품목" style={iconAndTextStyles}/>
              </Button>
            </ListItem>
          </Link>
          <Link to="/customer/list" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button onClick={() => this.toggleAccordion('isBusinessAccordionOpen')}>
                <ListItemIcon style={iconAndTextStyles}>
                  <BusinessIcon/>
                </ListItemIcon>
                <ListItemText primary="거래처" style={iconAndTextStyles}/>
              </Button>
            </ListItem>
          </Link>
          <ListItem>
            <Button onClick={() => this.toggleAccordion('isOrderAccordionOpen')}>
              <ListItemIcon style={iconAndTextStyles}>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText primary="지시" style={iconAndTextStyles}/>
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
                        <ListItemText primary="지시 등록" style={iconAndTextStyles}/>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
                <AccordionDetails>
                  <Link to="/instruction/list" style={{textDecoration:'none'}}>
                    <ListItem>
                      <Button>
                        <ListItemText primary="지시 현황" style={iconAndTextStyles}/>
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
              <ListItemText primary="출고" style={iconAndTextStyles}/>
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
                        <ListItemText primary="출고 등록" style={iconAndTextStyles}/>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
                <AccordionDetails>
                  <Link to="/delivery/list" style={{textDecoration:'none'}}>
                    <ListItem>
                      <Button>
                        <ListItemText primary="출고 현황" style={iconAndTextStyles}/>
                      </Button>
                    </ListItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
          )}
          <ListItem>
            <Button>
              <ListItemIcon style={iconAndTextStyles}>
                <BarChartIcon/>
              </ListItemIcon>
              <ListItemText primary="현황 조회" style={iconAndTextStyles}/>
            </Button>
          </ListItem>
        </React.Fragment>
    );
  }
}


class SecondaryListItems extends Component {
  render() {

    // 색상
    const iconAndTextStyles = {
      color: '#858891',
    }

    return (
        <React.Fragment>
          {/*<ListSubheader component="div" inset style={{ backgroundColor: 'white' }}>*/}
          {/*    관리자 전용*/}
          {/*</ListSubheader>*/}
          <Link to="/addEmployee" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button>
                <ListItemIcon style={iconAndTextStyles}>
                  <PersonAddIcon/>
                </ListItemIcon>
                <ListItemText primary="사원 등록" style={iconAndTextStyles}/>
              </Button>
            </ListItem>
          </Link>
          <Link to="/editEmployee" style={{textDecoration: 'none', color: 'black'}}>
            <ListItem>
              <Button>
                <ListItemIcon style={iconAndTextStyles}>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="사원 조회" style={iconAndTextStyles}/>
              </Button>
            </ListItem>
          </Link>
        </React.Fragment>
    );
  }
}

export {MainListItems, SecondaryListItems};