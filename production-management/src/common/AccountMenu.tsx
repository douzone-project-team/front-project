import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Link as RouterLink } from 'react-router-dom';
import {EmployeeContext} from '../store/Employee/employee-context';
import Typography from "@material-ui/core/Typography";
import {EmployeeState} from "../object/Employee/employee-object";

interface AccountMenuState {
    anchorEl: HTMLElement | null;
}

class AccountMenu extends Component<{}, AccountMenuState> {
    static contextType = EmployeeContext;

    constructor(props: {}) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    handleLogout = () => {
        const state = this.context as EmployeeState;
        state.logout();
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};
        const name = employeeData.name;
        const role = employeeData.role === 'ROLE_ADMIN' ? '관리자' : '사원';
        const employeeNo = employeeData.employeeNo;

        return (
            <React.Fragment>
                <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="">
                        <IconButton
                            onClick={this.handleClick}
                            size="small"
                            style={{ marginLeft: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar style={{width: 32, height: 32, marginRight: 5}}
                            src={(`http://localhost:8080/employees/${employeeNo}/image`)}/>
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 5 }}>
                                <Typography variant="caption" color="inherit"
                                            style={{ marginBottom: -4, fontWeight: 'bold', fontFamily: 'S-CoreDream-3Light' }}>
                                    {name}
                                </Typography>
                                <Typography variant="caption" color="inherit" style={{fontFamily: 'S-CoreDream-3Light'}}>
                                    {role} | {employeeNo}
                                </Typography>
                            </Box>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={this.handleClose}
                    onClick={this.handleClose}
                    PaperProps={{
                        elevation: 0,
                        style: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            marginTop: 1.5,
                            '& .MuiAvatarRoot': {
                                width: 32,
                                height: 32,
                                marginLeft: -0.5,
                                marginRight: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                backgroundColor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        } as React.CSSProperties,
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    getContentAnchorEl={null}
                >
                    <MenuItem onClick={this.handleClose}>
                        <RouterLink to="/my-page" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'black' }}>
                            <Avatar style={{ width: 20, height: 20, marginRight: 36}} src={(`http://localhost:8080/employees/${employeeData.employeeNo}/image`)}/>
                            마이 페이지
                        </RouterLink>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        로그아웃
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

export default AccountMenu;
