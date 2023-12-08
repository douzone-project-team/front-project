import React, {Component} from 'react';
import {Avatar} from '@material-ui/core';
import GraphBox from './../../components/CurrentSituation/GraphBox';
import GraphBox2 from './../../components/CurrentSituation/GraphBox2';
import './../../assets/css/Main.css';
import TodoList from './../../components/CurrentSituation/Todo/Todolist'
import {Email, Phone, SupervisorAccount} from "@material-ui/icons";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import Layout from '../../common/Layout';

const boxShadowStyle = '1px 1px 3px 3px rgba(0, 0, 0, 0.1)';


const containerStyle = { // 최상위 div
  display: 'flex',
  flexDirection: 'column' as const,
  height: '85%',
  marginTop: '1%',
  marginLeft: '3%',
  fontFamily: 'S-CoreDream-3Light',
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
  marginTop: '3%'
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
  height: '70%',
  borderRadius: '10px',
  boxShadow: boxShadowStyle,
  backgroundColor: "#C8DDED"
};

const BoxDivStyle = {
  marginBottom: '30%',
  width: '100%',
  marginTop: '1%',
  padding: '5%',
}

const boxPartStyle = {
  display: 'flex',
  width: '50%',
  height: '100%',
};
const graphBoxStyle = {
  width: '50%',
  height: '100%',
};

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

class Main extends Component {
  state = {
    selectedGraph: null,
    instructionData: [
      {value: 1048, name: '완료'},
      {value: 735, name: '진행'},
      {value: 580, name: '준비'}
    ],
    deliveryData: [
      {value: 1048, name: '완료'},
      {value: 580, name: '미완료'}
    ],

    graphData2: [
      {value: 20, name: '7월'},
      {value: 40, name: '8월'},
      {value: 30, name: '9월'},
      {value: 50, name: '10월'},
      {value: 15, name: '11월'}
    ],
  };

  render() {
    const styles = document.styleSheets[0];
    const instructionColors = ['#7378C2', '#8f9de3', '#c8dded']; // 지시 색상
    const deliveryColors = ['#F77D93', '#F2BDD8', '#98FB98']; // 출고 색상
    return (
        <Layout>
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
                            안녕하세요.{' '} <span style={{color: '#3A4CA8', marginLeft: '0.5em'}}>이주빈 사원님</span>😁 오늘도 즐거운 하루 되세요.
                        </span>
              </div>
              <div style={{display: 'flex', height: '100%'}}>
                <div style={userDiv}>
                  <div>
                    <Avatar src='http://localhost:8080/employees/200001/image' style={{
                      width: '130px',
                      height: '130px',
                      border: '2px solid rgba(82,99,115,0.1)',
                      marginTop: '10px'
                    }} alt="사원사진"/>
                  </div>
                  <div style={{margin: '1%', paddingRight: '20%', marginLeft: '2%'}}>
                        <span
                            style={{color: '#444444', fontSize: '1.8em', fontWeight: '900'}}>
                            <SupervisorAccount style={{color: '#444444'}}/>
                          {' '}이주빈 사원
                            </span><br/><br/>
                    <span style={{
                      color: '#3A4CA8',
                      fontSize: '1.2em',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center'
                    }}><Email
                        style={{color: '#3A4CA8'}}/>&nbsp;&nbsp;timeattacks2@naver.com</span><br/>
                    <span style={{
                      color: '#63992B',
                      fontSize: '1.2em',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center'
                    }}><Phone style={{color: '#63992B'}}/>&nbsp;&nbsp;010-4596-5429</span>
                  </div>
                  <div style={{width: '100%', height: '100%'}}>
                    <TodoList></TodoList>
                  </div>
                </div>
              </div>
            </div>
            <div style={downDivStyle}>
              <div style={boxPartStyle}>
                <div style={{width: '45%', display: 'flex', flexDirection: 'column'}}>
                  <div style={{minHeight: '40px'}}>
                  <span
                      style={{fontSize: '1.8em', fontWeight: '800'}}>지시정보</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: '#FFFFFF'
                    ,
                    boxShadow: boxShadowStyle,
                    height: '100%'
                  }}>
                    <div style={BoxDivStyle}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex'}}>
                          <AssignmentIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                          <span style={{
                            fontSize: '1.5em',
                            fontWeight: '900',
                          }}>지시 건수</span>
                        </div>
                        <span style={{marginTop: '2%', color: 'gray'}}>금일, 금월의 지시 건수를 나타냅니다.</span>
                      </div>
                      <div style={{display: 'flex', height: '85%'}}>
                        <div style={{...BoxStyle, backgroundColor: "#C8DDED", height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>금월 총 지시</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '2.1em',
                                              marginLeft: '1em',
                                              fontWeight: '900'
                                            }}>14</span>
                            <span>건</span>
                          </div>
                        </div>
                        <div style={{...BoxStyle, backgroundColor: "#C8DDED", marginLeft: '7%', height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>금일 총 지시</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '2.1em',
                                              marginLeft: '1em',
                                              fontWeight: '900'
                                            }}>2</span>
                            <span>건</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={BoxDivStyle}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex'}}>
                          <AccessAlarmIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                          <span style={{
                            fontSize: '1.5em',
                            fontWeight: '900',
                            marginLeft: '1%'
                          }}>마감 위험</span>
                        </div>
                        <span style={{marginTop: '2%', color: 'gray'}}>가장 마감일에 인접한 지시를 나타냅니다.</span>
                      </div>
                      <div style={{display: 'flex', height: '85%'}}>
                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8", height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>마감일 : <span style={{fontSize:'12px',fontWeight: 'normal'}}>23-12-10</span></span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '0.8em',
                                              marginLeft: '0.5em',
                                              fontWeight: '900'
                                            }}>WO2312000001</span>
                          </div>
                        </div>
                        <div style={{...BoxStyle, backgroundColor: "#F2BDD8", marginLeft: '7%', height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>마감일 : <span style={{fontSize:'12px',fontWeight: 'normal'}}>23-12-11</span></span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '0.8em',
                                              marginLeft: '0.5em',
                                              fontWeight: '900'
                                            }}>WO2312000002</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  width: '45%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '5%',
                  height: '100%'
                }}>
                  <div style={{minHeight: '40px'}}>
                  <span
                      style={{fontSize: '1.8em', fontWeight: '800'}}>출고정보</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    backgroundColor: '#FFFFFF'
                    ,
                    boxShadow: boxShadowStyle,
                    height: '100%'
                  }}>
                    <div style={BoxDivStyle}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex'}}>
                          <LocalShippingIcon style={{fontSize: '1.6em', marginTop: '1%'}}/>
                          <span style={{
                            fontSize: '1.5em',
                            fontWeight: '900',
                            marginLeft: '1%'
                          }}>출고 건수</span>
                        </div>
                        <span style={{marginTop: '2%', color: 'gray'}}>금일, 금월의 출고 건수를 나타냅니다.</span>
                      </div>
                      <div style={{display: 'flex', height: '85%'}}>
                        <div style={{...BoxStyle, backgroundColor: "#C8DDED", height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>금월 총 출고</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '2.1em',
                                              marginLeft: '1em',
                                              fontWeight: '900'
                                            }}>10</span>
                            <span>건</span>
                          </div>
                        </div>
                        <div style={{...BoxStyle, backgroundColor: "#C8DDED", marginLeft: '7%', height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>금일 총 출고</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span
                                                style={{
                                                  fontSize: '2em',
                                                  marginLeft: '1em',
                                                  fontWeight: '900'
                                                }}>3</span>
                            <span>건</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={BoxDivStyle}>
                      <div style={{display: 'flex', flexDirection: 'column'}}>
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
                      <div style={{display: 'flex', height: '85%'}}>
                        <div style={{...BoxStyle, backgroundColor: "#FFCD4A", height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>최다 거래량 1등</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '1.3em',
                                              marginLeft: '1em',
                                              fontWeight: '900'
                                            }}>더존비즈온</span>
                          </div>
                        </div>
                        <div style={{...BoxStyle, backgroundColor: "#FFCD4A", marginLeft: '7%', height: '80px'}}>
                          <span style={{fontWeight: 'bold'}}>최다 거래량 2등</span>
                          <div style={{alignSelf: 'center', marginTop: '6%'}}>
                                            <span style={{
                                              fontSize: '1.3em',
                                              marginLeft: '1em',
                                              fontWeight: '900'
                                            }}>삼성전자</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={graphBoxStyle}>
                <div style={{height: '55%'}}>
                  <div style={{minHeight: '40px'}}>
                  <span
                      style={{fontSize: '1.8em', fontWeight: '800'}}>기간별 현황</span>
                  </div>
                  <div
                      style={{
                        height: '90%',
                        backgroundColor: '#FFFFFF',
                        boxShadow: boxShadowStyle,
                      }}>
                    <GraphBox2 data={this.state.graphData2}/>
                  </div>
                </div>
                <div style={{display: 'flex', height: '45%', width: '100%', marginTop: '2%'}}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '49%',
                    height: '100%'
                  }}>
                    <span style={{fontSize: '1.2em', fontWeight: '800', height: '10%'}}>지시사항</span>
                    <div
                        style={{
                          width: '100%', backgroundColor:
                              '#FFFFFF', boxShadow: boxShadowStyle,
                          height: '85%'
                        }}>
                      <GraphBox data={this.state.instructionData} labelText="지시"
                                colors={instructionColors}/>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '49%',
                    marginLeft: '2%'
                  }}>
                    <span style={{fontSize: '1.2em', fontWeight: '800', height: '10%'}}>출고사항</span>
                    <div
                        style={{
                          width: '100%', backgroundColor:
                              '#FFFFFF', boxShadow: boxShadowStyle,
                          height: '85%'
                        }}>
                      <GraphBox data={this.state.deliveryData} labelText="출고"
                                colors={deliveryColors}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

export default Main;