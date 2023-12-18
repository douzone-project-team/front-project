import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
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
import logo from '../images/BLOOMING.png';
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import {MainListItems} from "./ListItem";
import Notification from './Notification';
import {Popover} from "@material-ui/core";
import {EventSourcePolyfill, NativeEventSource} from "event-source-polyfill";
import {EmployeeContext} from "../store/Employee/employee-context";
import Message from "./Message";
import Swal from 'sweetalert2'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailIcon from '@material-ui/icons/Mail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        fontFamily : 'S-CoreDream-3Light'
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
    overflowAuto: {
        overflowY: 'auto',
    },
    shakingNotificationIcon: {
        animation: '$shake 0.5s',
    },
    shakingMessageIcon: {
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
    static contextType = EmployeeContext;

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isPopoverOpen: false,
            isMessageOpen: false,
            anchorEl: null,
            notifications: [],
            currentMessages: [],
            isNotificationShaking: false,
            isMessageShaking: false,
            newNotification: {
                employeeNo: 0,
                employee: "",
                notification: "",
                date: "",
                time: ""
            },
            newMessage: {
                sendId: "",
                sendName: "",
                targetId: "",
                targetName: "",
                message: "",
                sendTime: "",
            },
        };
    }
    eventSource = null;

    componentDidMount() {
        const {getMessages, messages} = this.context;
        getMessages();
        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            this.setState({notifications: JSON.parse(storedNotifications)});
        }

        const EventSource = EventSourcePolyfill || NativeEventSource;

        this.eventSource = new EventSource(
            `/sse/subscribe`,
            {
                headers: {
                    baseURL: 'http://localhost:8080/',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                withCredentials: true,
                heartbeatTimeout: 600000
            }
        );


        this.eventSource.addEventListener('connect', (event) => {
        });


        this.eventSource.addEventListener('crudEvent', (event) => {
            const eventData = event.data;
            const notificationArray = eventData.split('(');
            const notificationArray2 = eventData.split(',');
            const dateArray = notificationArray2[2].split('/');
            const newNotification = {
                employeeNo: notificationArray[0],
                employee: notificationArray2[0],
                notification: notificationArray2[1],
                date: dateArray[0],
                time: dateArray[1]
            }

            this.addNotification(newNotification);
        });

        this.eventSource.addEventListener('messageEvent', (event) => {
            getMessages();
            const messageData = event.data;
            const messageArray = messageData.split('&&');
            const newMessage = {
                sendId: messageArray[0],
                sendName: messageArray[1],
                targetId: messageArray[2],
                targetName: messageArray[3],
                message: messageArray[4],
                sendTime: messageArray[5]
            };

            this.addMessage(newMessage);
        });

    }

    componentWillUnmount() {
        this.eventSource.close();
    }

    addNotification = (notification) => {
        this.setState(
            (prevState) => ({
                notifications: [...prevState.notifications, notification],
                isNotificationShaking: true,
            }),
            () => {
                localStorage.setItem('notifications', JSON.stringify(this.state.notifications));
                setTimeout(() => {
                    this.setState({isNotificationShaking: false});
                }, 1000);
            }
        );
    };

    onDeleteNotification = (notificationToDelete) => {
        const { notifications } = this.state;

        const indexToDelete = notifications.findIndex((notification) =>
            notification.employeeNo === notificationToDelete.employeeNo &&
            notification.employee === notificationToDelete.employee &&
            notification.notification === notificationToDelete.notification &&
            notification.date === notificationToDelete.date &&
            notification.time === notificationToDelete.time
        );

        if (indexToDelete !== -1) {
            const updatedNotifications = [
                ...notifications.slice(0, indexToDelete),
                ...notifications.slice(indexToDelete + 1)
            ];

            // Update state
            this.setState({
                notifications: updatedNotifications,
            }, () => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "알림를 삭제하였습니다.",
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
            });
        }
    };

    clearNotifications = () => {
        localStorage.removeItem('notifications');
        this.setState((prevState) => {
            prevState.notifications = [];
        }, () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "모든 알림를 삭제하였습니다.",
                showConfirmButton: false,
                timer: 1500
            });
        });
        this.setState({
            isPopoverOpen: false,
        });
    };

    sendMessage = (sendId, targetId, message) => {
        const {sendMessage} = this.context;
        sendMessage(sendId, targetId, message);
        this.setState({
            isMessageOpen: false,
        });
    }

    addMessage = (message) => {
        const {getMessages} = this.context;
        getMessages();
        this.setState(
            (prevState) => ({
                isMessageShaking: true,
            }),
            () => {
                setTimeout(() => {
                    this.setState({isMessageShaking: false});
                }, 1000);
            }
        );
    };

    onDeleteMessage = (messageNo) => {
        const {deleteMessage} = this.context;
        deleteMessage(messageNo);
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
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
        this.setState({
            isPopoverOpen: false,
        });
    };

    handleMessageOpen = (event) => {
        this.setState({
            isMessageOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleMessageClose = () => {
        this.setState({
            isMessageOpen: false,
        });
    };

    render() {
        const {classes} = this.props;
        const {isPopoverOpen, isMessageOpen, anchorEl, isNotificationShaking, isMessageShaking} = this.state;
        const messages = this.context.messages.messages;
        return (
            <div className={classes.root}>
                    <CssBaseline/>
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
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="div"
                            variant="h6"
                            color="inherit"
                            noWrap
                            style={{flexGrow: 1, display: 'flex', alignItems: 'center'}}
                            className={classes.title}
                        >
                            <Link to='/main-page'>
                                <img
                                    src={logo}
                                    alt='logo'
                                    style={{height: '20px', marginTop: '10px'}}
                                />
                            </Link>
                        </Typography>
                        <AccountMenu/>
                        <IconButton
                            color="#858891"
                            style={{marginLeft: '15px'}}
                            onClick={this.handleMessageOpen}
                            className={isMessageShaking ? classes.shakingNotificationIcon : null}
                        >
                            <Badge badgeContent={messages.length} color="secondary">
                                {messages.length === 0?<MailOutlineIcon/> : <MailIcon/>}
                            </Badge>
                        </IconButton>
                        <IconButton
                            color="#858891"
                            style={{marginLeft: '15px'}}
                            onClick={this.handlePopoverOpen}
                            className={isNotificationShaking ? classes.shakingNotificationIcon : null}
                        >
                            <Badge badgeContent={this.state.notifications.length} color="secondary">
                                {this.state.notifications.length !== 0 ? <NotificationsIcon/> : <NotificationsNoneIcon/>}
                            </Badge>
                        </IconButton>
                        <Popover
                            id="mouse-over-popover"
                            open={isPopoverOpen}
                            anchorEl={anchorEl}
                            onClose={this.handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Notification notifications={this.state.notifications}
                                          isClear={this.clearNotifications}
                                          handlePopoverClose={this.handlePopoverClose}
                                          onDeleteNotification={this.onDeleteNotification}
                            />
                        </Popover>
                        <Popover
                            id="mouse-over-popover"
                            open={isMessageOpen}
                            anchorEl={anchorEl}
                            onClose={this.handleMessageClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Message messages={messages}
                                     onDeleteMessage={this.onDeleteMessage}
                                     sendMessage={this.sendMessage}/>
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
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <div onMouseOver={this.handleDrawerOpen} style={{width: '100%', height: '100%'}}>
                        <Divider/>
                        <List><MainListItems open={this.state.open} isAccordionOpen={this.state.isAccordionOpen}
                                             onDrawerToggle={this.handleDrawerOpen}/></List>
                    </div>
                </Drawer>
                <main className={classes.content} style={{margin: 0, padding: 0, backgroundColor: '#f1f3f5'}}>
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