import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Box,
    Tab,
    Tabs,
    AppBar,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Avatar
} from "@material-ui/core";
import {AuthContext} from "../store/Auth/auth-context";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import SubdirectoryArrowRightOutlinedIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined';
import {EmployeeContext} from "../store/Employee/employee-context";
import Swal from "sweetalert2";

interface MessageProps {
    messages: [],
    onDeleteMessage: (messageNo: number) => void
    sendMessage: (sendId: number, targetId: number, message: string) => void
}

type Messages = {
    messageNo: 0,
    sendId: "",
    sendName: "",
    targetId: "",
    targetName: "",
    message: "",
    sendTime: ""
}

type Employees = {
    employeeNo: number,
    name: string,
    role: string
}

let message = {
    sendId: 0,
    targetId: 0,
    message: ""
}

const styles = {
    select: {
        height: '200px', // 여기에 원하는 높이를 지정하세요.
    },
};


class Message extends React.Component<MessageProps> {
    static contextType = EmployeeContext;
    state = {
        anchorEl: null,
        tabValue: 0,
        targetId: 0,
        message: "",
    };

    componentDidMount() {
        const {getEmployeeList} = this.context;
        getEmployeeList();
    }

    onReplyMessage = (sendId: string, targetId: string) => {
        this.setState({
            tabValue: 1,
            targetId: parseInt(sendId),
            message: `RE: `, // 기본적인 답장 메시지 설정
        });

    };

    handleChangeTab = (event: any, newValue: any) => {
        if (newValue === 1 && this.state.tabValue === 0) {
            this.setState({
                tabValue: newValue,
                targetId: 0,
                message: "",
            });
        } else {
            this.setState({tabValue: newValue});
        }
    };

    handleTargetIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({targetId: event.target.value});
    }

    handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({message: event.target.value});
    }

    handleSendMessage = () => {
        const {sendMessage} = this.props;
        const {targetId, message} = this.state;
        if(!targetId){
            Swal.fire({
                position: "bottom-right",
                icon: "warning",
                text: '선택된 사원이 없습니다.',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }
        if(message.length == 0){
            Swal.fire({
                position: "bottom-right",
                icon: "warning",
                text: '메시지를 작성해주세요',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }
        const employee = JSON.parse(localStorage.getItem('employee') as string) as unknown as Employees;
        sendMessage(employee.employeeNo, targetId, message);
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {messages, onDeleteMessage} = this.props;
        const {tabValue, targetId, message} = this.state;
        const {anchorEl} = this.state;
        const {employeeList} = this.context;
        let employee = JSON.parse(localStorage.getItem('employee') as string) as unknown as Employees;
        let messages1 = messages as unknown as Messages[];
        const open = Boolean(anchorEl);
        // @ts-ignore
        // @ts-ignore
        return (
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'white',
                    color: 'black',
                    height: '430px', fontFamily: 'S-CoreDream-3Light'
                }}
            >
                <AppBar position="static">
                    <Tabs value={tabValue} onChange={this.handleChangeTab}
                          indicatorColor="primary"
                          textColor="primary"
                          style={{backgroundColor: 'white', width: '400px'}}>
                        <Tab style={{fontFamily: 'S-CoreDream-3Light', width: '50%'}} label="쪽지함"/>
                        <Tab style={{fontFamily: 'S-CoreDream-3Light', width: '50%'}} label="쪽지 보내기"/>
                    </Tabs>
                </AppBar>
                <div>
                    {tabValue === 0 && (
                        <>
                            <Box bgcolor="#f3f4f7" overflow="auto" width="400px">
                                {messages1.map((message, index) => (
                                    <Accordion key={index} style={{marginTop: 0, marginBottom: '2px', width: '400px'}}>
                                        <AccordionSummary>
                                            <Box display="flex" width="100%">
                                                <Avatar src={('http://localhost:8080/employees/'+message.sendId+'/image')} style={{width: '23px', height:'23px' ,borderRadius: '8px'}}/>
                                                &nbsp;&nbsp;<div>
                                                <Typography style={{fontSize: '15px', width: '100%', fontWeight:'bold', fontFamily: 'S-CoreDream-3Light'}}>
                                                    {message.sendId}({message.sendName})님의 쪽지
                                                </Typography>
                                                <Typography style={{
                                                    fontSize: '12px',
                                                    color: 'lightgray', fontFamily: 'S-CoreDream-3Light'
                                                }}>
                                                    {message.sendTime}
                                                </Typography>
                                            </div>
                                            </Box>
                                            <SubdirectoryArrowRightOutlinedIcon
                                                onClick={() => this.onReplyMessage(message.sendId, message.targetId)}
                                            />
                                            <img src={(require('../images/button/delete-button2.png'))}
                                                 onClick={() => onDeleteMessage(message.messageNo)}
                                                 style={{width: '20px', height: '25px'}}/>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{wordWrap: 'break-word', whiteSpace: 'normal', width: '350px', fontFamily: 'S-CoreDream-3Light'}}>{message.message}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </>
                    )}

                    {tabValue === 1 && (
                        <>
                            <div style={{padding: '20px', width: '400px'}}>
                                <TextField
                                    style={{fontFamily: 'S-CoreDream-3Light'}}
                                    label="보내는 사람"
                                    fullWidth
                                    margin="normal"
                                    value={employee.employeeNo}
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel style={{fontFamily: 'S-CoreDream-3Light'}}
                                                id="recipient-label">받는 사람</InputLabel>
                                    <Select
                                        labelId="recipient-label"
                                        id="targetId"
                                        onChange={this.handleTargetIdChange}
                                        defaultValue={targetId}
                                        MenuProps={{
                                            PaperProps: {
                                                style: {maxHeight: '250px'},
                                            }
                                        }}
                                    >
                                        {employeeList.list.map((employee: any) => (
                                            <MenuItem key={employee.employeeNo} value={employee.employeeNo}>
                                                {employee.employeeNo} ({employee.name})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    style={{fontFamily: 'S-CoreDream-3Light'}}
                                    label="메시지 작성"
                                    multiline
                                    minRows={4}
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={message}
                                    margin="normal"
                                    onChange={this.handleMessageChange}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSendMessage}
                                    style={{marginTop: '10px', fontFamily: 'S-CoreDream-3Light'}}
                                >
                                    쪽지 보내기
                                </Button>
                            </div>
                        </>
                    )}

                </div>
            </Box>
        );
    }
}

export default Message;