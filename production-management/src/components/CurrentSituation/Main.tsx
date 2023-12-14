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
    height: '93%',
    marginTop: '1%',
    marginLeft: '3%',
};

const topDivStyle = { // 최상위 div
    display: 'flex',
    flexDirection: 'column' as const,
    height: '25%',
    width: '95%',
    marginTop: '4%'
};
const downDivStyle = {
    width: '95%',
    height: '80%',
    display: 'flex',
    marginTop: '2.5%'
};
const welcomeStyle = {
    height: '20%',
    width: '90%',
};

const BoxStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    color: 'black',
    padding: '3%',
    marginTop: '3%',
    width: '100%',
    height: '45%',
    borderRadius: '10px',
    boxShadow: boxShadowStyle,
};

const BoxDivStyle = {
    height:'100%',
    width: '14vw',
    marginTop: '1%',
    padding: '5%',
    cursor: 'pointer'
}

const boxPartStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '49%',
    height: '100%',
};
const graphBoxStyle = {
    width: '49%',
    height: '100%',
    marginLeft: '2%',
};
const MainStyle={
    fontWeight: 'bold',marginLeft:'5%'
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
    marginTop: '1%',
    backgroundColor: 'white',
    boxShadow: boxShadowStyle,
    display: 'flex',
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
        selectedPeriod: 'Y', // 기본값은 'D'로 설정
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
        return (
            <div style={containerStyle}>
                <div style={topDivStyle}>
                    <div style={welcomeStyle}>
                       <span
                           style={{
                               display: 'flex',
                               marginLeft: '1%',
                               fontSize: '1.5em',
                               fontWeight: '900',
                               marginTop: '0.5%'
                           }}>
                                안녕하세요.{' '} <span style={{color: '#3A4CA8', marginLeft: '0.5em'}}>{state.employee.name} 사원님</span>😁 오늘도 즐거운 하루 되세요.
                        </span>
                    </div>
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={userDiv}>
                            <div>
                                <MainImage/>
                                {/*{this.state.selectedImage ? (*/}
                                {/*    <img*/}
                                {/*        src={URL.createObjectURL(this.state.selectedImage)}*/}
                                {/*        alt="새 이미지"*/}
                                {/*        style={{*/}
                                {/*            maxWidth: '200px',*/}
                                {/*            maxHeight: '250px',*/}
                                {/*            marginTop: '10px',*/}
                                {/*            marginBottom: "10px",*/}
                                {/*            borderRadius: '20%'*/}
                                {/*        }}/>*/}
                                {/*) : employeeData.employeeNo !== 0 ? (*/}
                                {/*    <img src={('http://localhost:8080/employees/'+employeeData.employeeNo+'/image')}*/}
                                {/*         style={{*/}
                                {/*             maxWidth: '200px',*/}
                                {/*             maxHeight: '250px',*/}
                                {/*             marginTop: '10px',*/}
                                {/*             marginBottom: "10px",*/}
                                {/*             borderRadius: '20%'*/}
                                {/*         }}/>*/}
                                {/*) : (*/}
                                {/*    <div> 이미지 없음 </div>*/}
                                {/*)}*/}
{/*                                <Avatar src='http://localhost:8080/employees/200001/image' style={{
                                    width: '130px',
                                    height: '130px',
                                    border: '2px solid rgba(82,99,115,0.1)',
                                    marginTop: '10px'
                                }} alt="사원사진"/>*/}
                            </div>
                            <div style={{margin: '1%', paddingRight: '20%', marginLeft: '2%',width:'50%'}}>
                        <span
                            style={{color: '#444444', fontSize: '1.8em', fontWeight: '900'}}>
                            <SupervisorAccount style={{color: '#444444'}}/>
                            &nbsp;{state.employee.name} 사원
                            </span><br/><br/>
                                <span style={{
                                    color: '#3A4CA8',
                                    fontSize: '1.2em',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}><Email
                                    style={{color: '#3A4CA8'}}/>&nbsp;&nbsp;{state.employee.email}</span><br/>
                                <span style={{
                                    color: '#63992B',
                                    fontSize: '1.2em',
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
                            style={{fontSize: '1.8em', fontWeight: '800',height:'auto'}}>메뉴별 현황</span>
                        </div>
                        <div style={{
                            display: 'flex', backgroundColor: '#FFFFFF', boxShadow: boxShadowStyle,
                            height: '45%',justifyContent: 'space-between',marginTop:'2%'
                        }}>
                            <div>
                                <div style={{...BoxDivStyle,marginLeft:'25%'}}  onClick={() => {
                                    window.location.href = '/instruction/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex'}}>
                                            <AssignmentIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                                            <span style={{
                                                fontSize: '1.5em',
                                                fontWeight: '900',
                                            }}>지시 건수</span>
                                        </div>
                                        <span style={{marginTop: '2%', color: 'gray'}}>금일, 누적 지시 건수를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex',flexDirection: 'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#C8DDED"}}>
                                            <span style={MainStyle}>금일 총 지시</span>
                                            <div style={SubStyle}>
                                            <span style={{
                                                fontSize: '2.1em',
                                                marginLeft: '1em',
                                                fontWeight: '900'
                                            }}>{state.currentBox.instruction.thisMonthCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            ...BoxStyle,
                                            backgroundColor: "#C8DDED",
                                        }}>
                                            <span style={MainStyle}>누적 총 지시</span>
                                            <div style={SubStyle}>
                                            <span style={{
                                                fontSize: '2.1em',
                                                marginLeft: '1em',
                                                fontWeight: '900'
                                            }}>{state.currentBox.instruction.allCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{...BoxDivStyle, marginLeft:'-25%'}}  onClick={() => {
                                    window.location.href = '/delivery/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex'}}>
                                            <LocalShippingIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                                            <span style={{
                                                fontSize: '1.5em',
                                                fontWeight: '900',
                                                marginLeft: '1%'
                                            }}>출고 건수</span>
                                        </div>
                                        <span style={{marginTop: '2%', color: 'gray'}}>금일, 누적 출고 건수를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex',flexDirection: 'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#C8DDED"
                                        }}>
                                            <span style={MainStyle}> 금일 총 출고</span>
                                            <div style={SubStyle}>
                                            <span style={{
                                                fontSize: '2.1em',
                                                marginLeft: '1em',
                                                fontWeight: '900'
                                            }}>{state.currentBox.delivery.thisMonthCount}</span>
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
                                                style={{
                                                    fontSize: '2.1em',
                                                    marginLeft: '1em',
                                                    fontWeight: '900'
                                                }}>{state.currentBox.delivery.allCount}</span>
                                                <span>건</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex', backgroundColor: '#FFFFFF', boxShadow: boxShadowStyle,
                            height: '45%',marginTop:'2%',justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{...BoxDivStyle,marginLeft:'25%'}}  onClick={() => {
                                    window.location.href = '/instruction/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column',marginLeft:'5%'}}>
                                        <div style={{display: 'flex'}}>
                                            <AccessAlarmIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                                            <span style={{
                                                fontSize: '1.5em',
                                                fontWeight: '900',
                                            }}>마감 위험</span>
                                        </div>
                                        <span style={{marginTop: '2%', color: 'gray'}}>가장 마감일에 인접한 지시를 나타냅니다.</span>
                                    </div>
                                    <div style={{display: 'flex', flexDirection:'column',height:'60'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8"}}>
                                            <span style={MainStyle}>마감일 : {state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[0].expirationDate : ''}</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                           <span style={{
                                               fontSize: '1.3em',
                                               fontWeight: '900'
                                           }}>{state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[0].instructionNo : ''}</span>
                                            </div>
                                        </div>
                                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8",}}>
                                            <span style={MainStyle}>마감일 : {state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[1].expirationDate : ''}</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                           <span style={{
                                               fontSize: '1.3em',
                                               fontWeight: '900'
                                           }}>{state.currentBox.expirationDateNearInstruction.length > 0 ? state.currentBox.expirationDateNearInstruction[1].instructionNo : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{...BoxDivStyle, marginLeft:'-25%'}}  onClick={() => {
                                    window.location.href = '/customer/list';
                                }}>
                                    <div style={{display: 'flex', flexDirection: 'column' }}>
                                        <div style={{display: 'flex'}}>
                                            <BusinessIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                                            <span style={{
                                                fontSize: '1.5em',
                                                fontWeight: '900',
                                                marginLeft: '1%'
                                            }}>거래처</span>
                                        </div>
                                        <span style={{marginTop: '2%', color: 'gray'}}>가장 거래량이 많은 거래처를 나타냅니다</span>
                                    </div>
                                    <div style={{display: 'flex', flexDirection:'column'}}>
                                        <div style={{...BoxStyle, backgroundColor: "#FFCD4A"}}>
                                            <span style={MainStyle}>최다 거래량 1등</span>
                                            <div style={{...SubStyle, marginTop:'3%'}}>
                                            <span style={{
                                                fontSize: '1.3em',
                                                marginLeft: '1em',
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
                                                fontSize: '1.3em',
                                                marginLeft: '1em',
                                                fontWeight: '900'
                                            }}>{state.currentBox.customer.length > 0? state.currentBox.customer[1].customerName:''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={graphBoxStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span
                                style={{fontSize: '1.8em', fontWeight: '800',height:'auto'}}>기간별 현황</span>
                            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
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
                        <div style={{height: '45%',marginTop:'2%'}}>
                            <div
                                style={{
                                    height: '100%',
                                    backgroundColor: '#FFFFFF',
                                    boxShadow: boxShadowStyle,
                                }}>
                                <GraphBox2 data={state.barGraph}/>
                            </div>
                        </div>
                        <div style={{display: 'flex', height: '45%', width: '100%', marginTop: '2%'}}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '49%',
                                height: '100%'
                            }}>
    {/*                                <span style={{fontSize: '1.2em', fontWeight: '800', height: '10.5%'}}>지시사항</span>*/}
                                <div
                                    style={{
                                        width: '100%', backgroundColor:
                                            '#FFFFFF', boxShadow: boxShadowStyle,
                                        height: '100%'
                                    }}>
                                    {/*<GraphBox data={this.state.instructionData} labelText="지시"*/}
                                    {/*          colors={instructionColors}/>*/}
                                    <GraphBox data={state.circleGraph.instructionData.map(cg =>({
                                        name: cg.progress,
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
{/*                                <span style={{fontSize: '1.2em', fontWeight: '800', height: '10.5%'}}>출고사항</span>*/}
                                <div
                                    style={{
                                        width: '100%', backgroundColor:
                                            '#FFFFFF', boxShadow: boxShadowStyle,
                                        height: '100%'
                                    }}>
                                    <GraphBox data={state.circleGraph.deliveryData.map(cg =>({
                                            name: cg.progress,
                                            value: cg.count,
                                        }))}
                                              labelText="출고"
                                              colors={deliveryColors}/>
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