import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import logo from '../images/logo.png';
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import {MainListItems, SecondaryListItems} from "./ListItem";
import Notification from './Notification';
import {Popover} from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#333948',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing.unit,
    },
    shakingIcon: {
        animation: '$shake 0.5s',
    },
    '@keyframes shake': {
        '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)',
        },
        '20%, 80%': {
            transform: 'translate3d(1px, 0, 0)',
        },
        '30%, 50%, 70%': {
            transform: 'translate3d(-2px, 0, 0)',
        },
        '40%, 60%': {
            transform: 'translate3d(2px, 0, 0)',
        },
    },
});


class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        isPopoverOpen: false,
        anchorEl: null,
        notifications: [],
        isShaking: false,
    };

    eventSource = null;

    componentDidMount() {
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            this.setState({ notifications: JSON.parse(storedNotifications) });
        }

        this.eventSource = new EventSource('/sse/subscribe');

        this.eventSource.addEventListener('connect', (event) => {
            console.log('event = ', event.data);
        });

        this.eventSource.onmessage = (event) => {
            const eventData = event.data;
            console.log('Received SSE event:', eventData);

            this.addNotification(eventData);
        };
    }

    componentWillUnmount() {
        this.eventSource.close();
    }

    addNotification = (notification) => {
        this.setState(
            (prevState) => ({
                notifications: [...prevState.notifications, notification],
                isShaking: true,
            }),
            () => {
                console.log('this.state.notifications = ', this.state.notifications);
                localStorage.setItem('notifications', JSON.stringify(this.state.notifications));
                setTimeout(() => {
                    this.setState({ isShaking: false });
                }, 1000);
            }
        );
    };

    clearNotifications = () => {
        localStorage.removeItem('notifications');
        this.setState((prevState) => {
            prevState.notifications = [];
        }, () => {
            console.log('Notifications cleared');
        });
    };



    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false,
            isAccordionOpen: false,
        });
    };

    handlePopoverOpen = (event) => {
        this.setState({
            isPopoverOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handlePopoverClose = () => {
        this.clearNotifications();
        this.setState({
            isPopoverOpen: false,
        });
    };

    render() {
        const { classes } = this.props;
        const { isPopoverOpen, anchorEl, isShaking} = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    style={{background: 'white'}}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="#858891"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="div"
                            variant="h6"
                            color="inherit"
                            noWrap
                            style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                            className={classes.title}
                        >
                            <Link to='/'>
                                <img
                                    src={logo}
                                    alt='logo'
                                    style={{ height: '20px', marginRight: '10px' }}
                                />
                            </Link>
                        </Typography>
                        <AccountMenu />
                        <IconButton
                            color="#858891"
                            style={{ marginLeft: '15px' }}
                            onClick={this.state.notifications.length === 0 ? null :  this.handlePopoverOpen}
                            className={isShaking ? classes.shakingIcon : null}
                        >
                            <Badge badgeContent={this.state.notifications.length} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Popover
                            id="mouse-over-popover"
                            classes={{
                                paper: classes.popover,
                            }}
                            open={isPopoverOpen}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={this.handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Notification notifications={this.state.notifications} />
                        </Popover>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div onMouseOver={this.handleDrawerOpen} style={{width:'100%',height:'100%'}}>
                        <Divider/>
                        <List><MainListItems open={this.state.open} isAccordionOpen={this.state.isAccordionOpen} onDrawerToggle={this.handleDrawerOpen}/></List>
                        <Divider />
                        <List><SecondaryListItems/></List>
                    </div>
                </Drawer>
                <main className={classes.content} style={{margin:0, padding:0}}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);