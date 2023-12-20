import React, {Component} from 'react';
    import {Avatar, Button, ButtonGroup} from '@material-ui/core';
import GraphBox from './GraphBox';
import GraphBox2 from './GraphBox2';
import './../../assets/css/Main.css';
import TodoList from './Todo/Todolist';
import {Email, Phone, SupervisorAccount} from "@material-ui/icons";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import { MainContext } from "../../store/Main/main-context";
import { MainState } from "../../object/Main/main-object";
import {Employee} from '../../object/Employee/employee-object';
import { createBrowserHistory } from 'history';
import MainImage from "./main-image";

const boxShadowStyle = '1px 1px 3px 3px rgba(0, 0, 0, 0.1)';

type ProfileImageProps = {
}
type ProfileImageState = {
    selectedImage: File | null;
}

const containerStyle = { // 최상위 div
    display: 'flex',
    flexDirection: 'column' as const,
    marginTop: '1%',
    marginLeft: '3%',
    marginRight: '3%'
};

const topDivStyle = { // 최상위 div
    display: 'flex',
    flexDirection: 'column' as const,
    height: '25%',
    width: '100%',
    minWidth: '1100px',
    minHeight: '250px',
    marginTop: '55px'
};
const downDivStyle = {
    width: '100%',
    minWidth: '1100px',
    minHeight: '250px',
    display: 'flex',
    marginTop: '15px'
};
const welcomeStyle = {
    height: '20%',
    width: '90%',
};

const BoxStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    color: 'black',
    marginTop: '5px',
    marginBottom: '5px',
    minWidth: '200px',
    minHeight: '50px',
    width: '100%',
    height: '45%',
    borderRadius: '10px',
    boxShadow: boxShadowStyle,
};

const BoxDivStyle = {
    height:'100%',
    padding: '7%',
    cursor: 'pointer'
}

const boxPartStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '49%',
    height: '60vh',
};
const graphBoxStyle = {
    width: '49%',
    height: '60vh',
    marginLeft: '2%',
};
const MainStyle={
    fontWeight: 'bold',marginLeft:'5%',
    fontSize:'18px'
}
const SubStyle = {
    alignSelf: 'center', marginTop: '-5%',marginLeft:'25%'
}

const userDiv = {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    paddingLeft: '2%',
    paddingTop: '1%',
    marginTop: '1vh',
    backgroundColor: 'white',
    boxShadow: boxShadowStyle,
    display: 'flex',
}
const imageSize = {
    fontSize: '25px',
    marginRight: '10px'
}
const menuSpan = {
    fontSize: '20px',
    fontWeight: '900',
    marginLeft: '1%'
}

const menuComment = {
    marginTop: '2%',
    color: 'gray',
    fontSize:'15px'
};

const valueSpan = {
    fontSize: '33px',
    marginLeft: '10px',
    fontWeight: '900'
}
export type CircleGraphlist = {
    progress: string;
    count: number;
};

const history = createBrowserHistory();
class Main extends Component <ProfileImageProps>{
    static contextType = MainContext;

    componentDidMount() {
        const state = this.context as MainState;
        state.getBarGraph('year');
        state.getCircleGraph('year')
        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};
        state.getEmployee(employeeData.employeeNo)
        state.getCurrentBox()
    };
    state = {
        selectedPeriod: 'Y',
        employeeData: {} as Employee,
        usedata:{} as Employee,
    };

    findUser = (employeeNo: number) => {
        const state = this.context as MainState;
        try {
            state.getEmployee(employeeNo);
/*            return employee;*/
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    };

    handleGraphButtonClick = (period: string) => {
        const state = this.context as MainState;
        if (period === 'D') {
            state.getBarGraph('day');
            state.getCircleGraph('day');
        } else if (period === 'M') {
            state.getBarGraph('month');
            state.getCircleGraph('month');
        } else if (period === 'Y') {
            state.getBarGraph('year');
            state.getCircleGraph('year');
        }
    };

    render() {
        const state = this.context as MainState
        const instructionColors = ['#7378C2', '#8f9de3', '#c8dded']; // 지시 색상
        const deliveryColors = ['#F77D93', '#F2BDD8', '#98FB98']; // 출고 색상
        const storedEmployeeData = localStorage.getItem('employee');
        const employeeData = storedEmployeeData ? JSON.parse(storedEmployeeData) : {};

        const role = employeeData.role === 'ROLE_ADMIN' ? '관리자' : '사원';

        return (
            <div style={containerStyle}>
                <div style={topDivStyle}>
                    <div style={welcomeStyle}>
                       <span
                           style={{
                               display: 'flex',
                               marginLeft: '1%',
                               fontSize: '25px',
                               fontWeight: '900',
                               marginTop: '0.5%'
                           }}>
                                안녕하세요.{' '} <span style={{color: '#3A4CA8', marginLeft: '0.5em'}}>{state.employee.name} {role}님</span>😁 오늘도 즐거운 하루 되세요.
                        </span>
                    </div>
                    <div style={{display: 'flex', height: '100%',minWidth:'100%'}}>
                        <div style={userDiv}>
                            <div>
                                <MainImage/>
                            </div>
                            <div style={{margin: '1%', marginLeft: '2%',minWidth:'40%'}}>
                        <span
                            style={{color: '#444444', fontSize: '30px', fontWeight: '900'}}>
                            <SupervisorAccount style={{color: '#444444'}}/>
                            &nbsp;{state.employee.name} {role}
                            </span><br/><br/>
                                <span style={{
                                    color: '#3A4CA8',
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}><Email
                                    style={{color: '#3A4CA8'}}/>&nbsp;&nbsp;{state.employee.email}</span><br/>
                                <span style={{
                                    color: '#63992B',
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}><Phone style={{color: '#63992B'}}/>&nbsp;&nbsp;{state.employee.tel}</span>
                            </div>
                            <div style={{width: '100%', height: '100%'}}>
                                <TodoList></TodoList>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={downDivStyle}>
                    <div style={boxPartStyle}>
                        <div>
                        <span
                            style={{fontSize: '25px', fontWeight: '800',height:'auto'}}>메뉴별 현황</span>
                        </div>
                        <div style={{
                            height: '50%', display: 'flex', backgroundColor: '#FFFFFF', boxShadow: boxShadowStyle,marginTop:'2%', minWidth: '550px', minHeight: '255px'
                        }}>
                            <div style={{width: '50%'}}>
                                <div style={{...BoxDivStyle}}  onClick={() => {
                                    window.location.href = '/instruction/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex'}}>
                                            <AssignmentIcon style={imageSize}/>
                                            <span style={menuSpan}>지시 건수</span>
                                        </div>
                                        <span style={menuComment}>금월, 누적 지시 건수를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex',flexDirection: 'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#C8DDED"}}>
                                            <span style={MainStyle}>금월 총 지시</span>
                                            <div style={SubStyle}>
                                            <span style={valueSpan}>{state.currentBox.instruction?.thisMonthCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            ...BoxStyle,
                                            backgroundColor: "#C8DDED",
                                        }}>
                                            <span style={MainStyle}>누적 총 지시</span>
                                            <div style={SubStyle}>
                                            <span style={valueSpan}>{state.currentBox.instruction?.allCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '50%'}}>
                                <div style={{...BoxDivStyle}}  onClick={() => {
                                    window.location.href = '/delivery/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex'}}>
                                            <LocalShippingIcon style={imageSize}/>
                                            <span style={menuSpan}>출고 건수</span>
                                        </div>
                                        <span style={menuComment}>금월, 누적 출고 건수를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex',flexDirection: 'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#C8DDED"
                                        }}>
                                            <span style={MainStyle}> 금월 총 출고</span>
                                            <div style={SubStyle}>
                                            <span style={valueSpan}>{state.currentBox.delivery?.thisMonthCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            ...BoxStyle,
                                            backgroundColor: "#C8DDED",
                                        }}>
                                            <span style={MainStyle}>누적 총 출고</span>
                                            <div style={SubStyle}>
                                            <span
                                                style={valueSpan}>{state.currentBox.delivery?.allCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: '50%', display: 'flex', backgroundColor: '#FFFFFF', boxShadow: boxShadowStyle,marginTop:'2%', minWidth: '550px', minHeight: '255px'
                        }}>
                            <div style={{width: '50%'}}>
                                <div style={{...BoxDivStyle}}  onClick={() => {
                                    window.location.href = '/instruction/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column',marginLeft:'5%'}}>
                                        <div style={{display: 'flex'}}>
                                            <AccessAlarmIcon style={imageSize}/>
                                            <span style={menuSpan}>마감 위험</span>
                                        </div>
                                        <span style={menuComment}>가장 마감일에 인접한 지시를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex', flexDirection:'column',height:'60'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8"}}>
                                            <span style={MainStyle}>마감일 : {state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[0].expirationDate : ''}</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                           <span style={{
                                               fontSize: '22px',
                                               fontWeight: '900'
                                           }}>{state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[0].instructionNo : ''}</span>
                                            </div>
                                        </div>
                                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8",}}>
                                            <span style={MainStyle}>마감일 : {state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[1].expirationDate : ''}</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                           <span style={{
                                               fontSize: '22px',
                                               fontWeight: '900'
                                           }}>{state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[1].instructionNo : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '50%'}}>
                                <div style={{...BoxDivStyle}}  onClick={() => {
                                    window.location.href = '/customer/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column' }}>
                                        <div style={{display: 'flex'}}>
                                            <BusinessIcon style={imageSize}/>
                                            <span style={menuSpan}>거래처</span>
                                        </div>
                                        <span style={menuComment}>가장 거래량이 많은 거래처를 나타냅니다</span>
                                    </div>
                                    <div style={{display: 'flex', flexDirection:'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#FFCD4A"}}>
                                            <span style={MainStyle}>최다 거래량 1등</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                            <span style={{
                                                fontSize: '22px',
                                                fontWeight: '900'
                                            }}>{state.currentBox.customer.length > 0? state.currentBox.customer[0].customerName:''}</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            ...BoxStyle,
                                            backgroundColor: "#FFCD4A",
                                        }}>
                                            <span style={MainStyle}>최다 거래량 2등</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                            <span style={{
                                                fontSize: '22px',
                                                fontWeight: '900'
                                            }}>{state.currentBox.customer.length > 0? state.currentBox.customer[1].customerName:''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{...boxPartStyle,marginLeft:'2%'}}>
                        <div style={{display:'flex', width: '100%'}}>
                        <span style={{fontSize: '25px', fontWeight: '800',height:'auto', width:'80%'}}>기간별 현황</span>
                            <ButtonGroup
                                size="small"
                                color="primary"
                                aria-label="large outlined primary button group"
                                style={{ minHeight:'30px',minWidth:'30px', marginTop:'0.1vh',height:'1vh' }} // 버튼 그룹이 확대되도록 함
                            >
                                <Button
                                    onClick={() => {
                                        this.handleGraphButtonClick('D');
                                        this.setState({ selectedPeriod: 'D' });
                                    }}
                                    variant={this.state.selectedPeriod === 'D' ? 'contained' : 'outlined'}
                                >
                                    D
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.handleGraphButtonClick('M');
                                        this.setState({ selectedPeriod: 'M' });
                                    }}
                                    variant={this.state.selectedPeriod === 'M' ? 'contained' : 'outlined'}
                                >
                                    M
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.handleGraphButtonClick('Y');
                                        this.setState({ selectedPeriod: 'Y' });
                                    }}
                                    variant={this.state.selectedPeriod === 'Y' ? 'contained' : 'outlined'}
                                >
                                    Y
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div style={{
                            height: '50%', display: 'flex', backgroundColor: '#FFFFFF', boxShadow: boxShadowStyle,marginTop:'2%', minWidth: '550px', minHeight: '255px'
                        }}>
                            <GraphBox2 data={state.barGraph}/>
                        </div>
                        <div style={{
                            height: '50%', display: 'flex',marginTop:'2%', minWidth: '550px', minHeight: '255px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '49%',
                                height: '100%'
                            }}>
                                <div
                                    style={{
                                        width: '100%', backgroundColor:
                                            '#FFFFFF', boxShadow: boxShadowStyle,
                                        height: '100%',
                                        minHeight: '255px'
                                    }}>
                                    <GraphBox
                                        data={state.circleGraph.instructionData.map(cg => ({
                                            name: (() => {
                                                switch (cg.progress) {
                                                    case 'STANDBY':
                                                        return '준비';
                                                    case 'PROGRESS':
                                                        return '진행';
                                                    case 'COMPLETED':
                                                        return '완료';
                                                    default:
                                                        return '알 수 없음';
                                                }
                                            })(),
                                            value: cg.count,
                                        }))}
                                        labelText="지시"
                                        colors={instructionColors}
                                    />

                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '49%',
                                marginLeft: '2%'
                            }}>
                                <div
                                    style={{
                                        width: '100%', backgroundColor:
                                            '#FFFFFF', boxShadow: boxShadowStyle,
                                        height: '100%'
                                    }}>
                                    <GraphBox
                                        data={state.circleGraph.deliveryData.map(cg => ({
                                            name: cg.progress === 'STANDBY' ? '미완료' : '완료',
                                            value: cg.count,
                                        }))}
                                        labelText="출고"
                                        colors={deliveryColors}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;