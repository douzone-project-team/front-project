import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

interface NotificationProps {
    notifications: string[];
}


class Notification extends React.Component<NotificationProps> {
    render() {
        const { notifications } = this.props;

        return (
            <div style={{backgroundColor:'white'}}>
                <section>
                    <Typography variant="h6" style={{textAlign:'center'}}><img src={require('../images/icon/tack.png')} style={{width:'35px'}}/></Typography>
                    <ul style={{paddingLeft:'25px', paddingRight:'5px', paddingBottom:'15px', marginBottom:'3px'}}>
                        {notifications.map((notification, index) => (
                            <>
                                <li key={index}>
                                    {notification}
                                    <Divider style={{border:'0.1px solid', marginTop:'3px', marginBottom:'3px', color:'wheat'}}/>
                                </li>
                            </>
                        ))}
                    </ul>
                </section>
            </div>
        );
    }
}

export default Notification;