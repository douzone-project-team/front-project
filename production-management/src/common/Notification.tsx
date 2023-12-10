import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import {Box, Button} from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';

interface NotificationProps {
    notifications: [];
    isClear: () => void
    onDeleteNotification: (index: Notifications) => void;
}

type Notifications = {
    employeeNo: 0,
    employee: "",
    notification: "",
    date: "",
    time: ""
}


class Notification extends React.Component<NotificationProps> {
    render() {
        const { notifications, isClear, onDeleteNotification } = this.props;
        const notificationList = notifications as unknown as Notifications[];

        const notificationGroupByDate: Record<string, Notifications[]> = {};
        notificationList.forEach((notification) => {
            if (!notificationGroupByDate[notification.date]) {
                notificationGroupByDate[notification.date] = [];
            }
            notificationGroupByDate[notification.date].push(notification);
        });

        const sortedDates = Object.keys(notificationGroupByDate).sort((a, b) => {
            // @ts-ignore
            return new Date(b) - new Date(a);
        });

        return (
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'white',
                    color: 'black',
                    height: '350px',
                    fontFamily: 'S-CoreDream-3Light',
                }}
            >
                <div
                    style={{
                        padding: '10px',
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        borderBottom: '0.3px solid #EBEBEFFF',
                        backgroundColor: '#ffffff',
                    }}
                >
                    알림
                    <button
                        onClick={isClear}
                        style={{
                            float: 'right',
                            fontFamily: 'S-CoreDream-3Light',
                            border: '0.5px solid gray',
                            borderRadius: '5px',
                        }}
                    >
                        모두 지우기
                    </button>
                </div>

                <div style={{ backgroundColor: '#f3f4f7', height: '100%' }}>
                    <section style={{ backgroundColor: '#f3f4f7', width: '320px' }}>
                        {sortedDates.map((date, index) => (
                            <div key={index}>
                                <Divider />
                                <Typography style={{ textAlign: 'center', margin: '6px', fontFamily: 'S-CoreDream-3Light', fontSize: '18px' }}>
                                    <ScheduleIcon style={{width: '20px', height: '15px', alignItems: 'center'}}/>
                                    {date}
                                </Typography>
                                {notificationGroupByDate[date].map((notification, notificationIndex) => (
                                    <div
                                        key={notificationIndex}
                                        style={{
                                            padding: '20px',
                                            border: '1px solid lightgray',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            marginBottom: '10px',
                                            borderRadius: '7px',
                                            backgroundColor: '#FDFDFEFF',
                                            boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '95%', display: 'flex' }}>
                                                <img
                                                    src={('http://localhost:8080/employees/' + notification.employeeNo + '/image')}
                                                    style={{ width: '23px', height: '23px', borderRadius: '8px' }}
                                                />
                                                &nbsp;&nbsp;
                                                <Typography style={{ fontWeight: 'bold', fontFamily: 'S-CoreDream-3Light' }}>
                                                    {notification.employeeNo}
                                                </Typography>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <Typography
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#8d8d8d',
                                                        marginTop: '4px',
                                                        fontFamily: 'S-CoreDream-3Light',
                                                    }}
                                                >
                                                    {notification.time}
                                                </Typography>
                                            </div>
                                            <div>
                                                <img
                                                    src={(require('../images/button/delete-button2.png'))}
                                                    onClick={() => onDeleteNotification(notification)}
                                                    style={{ width: '20px' }}
                                                />
                                            </div>
                                            <br/>
                                        </div>
                                        <Typography style={{ fontSize: '13px', fontFamily: 'S-CoreDream-3Light' }}>
                                            {notification.notification}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                </div>
            </Box>
        );
    }
}

export default Notification;