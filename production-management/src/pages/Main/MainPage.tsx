import React, {Component} from 'react';
import Main from '../../components/CurrentSituation/Main'
/*import SemiBox from '../../components/CurrentSituation/SemiBox'*/
import Layout from '../../common/Layout';
import {Title} from '../../core/Title';
import ReactEcharts from "echarts-for-react";
import {Email, Phone, SupervisorAccount} from "@material-ui/icons";
import {Avatar} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BusinessIcon from '@material-ui/icons/Business';

type EChartsOption = echarts.EChartsOption;

const instructionBar = {
  title: {
    text: '지시 현황',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: '지시 현황',
      type: 'pie',
      radius: ['35%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 1048, name: '대기'},
        {value: 735, name: '진행'},
        {value: 580, name: '완료'},
      ]
    }
  ]
}

const deliveryBar = {
  title: {
    text: '출고 현황',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: '출고 현황',
      type: 'pie',
      radius: ['35%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 1048, name: '미완료'},
        {value: 735, name: '완료'},
      ]
    }
  ]
}

const option2 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['날짜', '지시', '출고'],
      ['월', 43.3, 85.8],
      ['화', 83.1, 73.4],
      ['수', 86.4, 65.2],
      ['목', 72.4, 53.9],
      ['금', 72.4, 53.9]
    ]
  },
  xAxis: {type: 'category'},
  yAxis: {},
  series: [{type: 'bar'}, {type: 'bar'}]
};

const containerStyle = { // 최상위 div
  display: 'flex',
};

const leftDivStyle = { // 왼쪽 배치 div
  width: '80%',
};

const rightDivStyle = { // 오른쪽 배치 div
  width: '20%',
};

const topDivStyle = { // 왼쪽 상단 div
  height: '17vh',
};

const bottomDivStyle = { // 왼쪽 하단 div
  height: '68vh',
};

const userDiv = { // 유저 box div
  borderRadius: '5px',
  backgroundColor: 'white',
  marginTop: '1vw',
  marginLeft: '1vw',
  marginRight: '1vw',
  boxShadow: '0 0 5px 1px #DDDDDD',
  display: 'flex',
}

const issueDiv = { // 박스 3 개 div
  borderRadius: '5px',
  backgroundColor: 'white',
  marginLeft: '1vw',
  marginRight: '1vw',
  boxShadow: '0 0 5px 1px #DDDDDD'
}

const chartDiv = {
  borderRadius: '5px',
  backgroundColor: 'white',
  boxShadow: '0 0 5px 1px #DDDDDD',
  marginRight: '1vw',
}

const barChartDiv = {
  display: 'flex',
  justifyContent: 'space-between'
}

const todoDiv = {
  borderRadius: '5px',
  backgroundColor: 'white',
  marginTop: '1vw',
  marginRight: '1vw',
  boxShadow: '0 0 5px 1px #DDDDDD',
  display: 'flex',
}

const bottomLeftDivStyle = { // 왼쪽 배치 div
  width: '40%',
  height: '100%',
};

const bottomRightDivStyle = { // 오른쪽 배치 div
  width: '60%',
  height: '100%',
};

class MainPage extends Component {

  render() {
    return (
        <Layout>
          <Main/>
          <Title title="메인 페이지"/>
          <div style={containerStyle}>
            <div style={leftDivStyle}>
              <div style={topDivStyle}>
                <div style={userDiv}>
                  <div>
                    <Avatar src="http://localhost:8080/employees/200001/image" style={{
                      width: '130px',
                      height: '130px',
                      border: '2px solid rgba(82,99,115,0.1)',
                      marginTop: '5px',
                      marginLeft: '10px'
                    }} alt="사원사진"/>
                  </div>
                  <div style={{margin: '10px'}}>
                    <span
                        style={{color: 'gray', fontSize: '27px', fontWeight: 'bold'}}>이주빈 사원님&nbsp;
                      <SupervisorAccount/></span><br/><br/>
                    <span style={{
                      color: 'gray',
                      fontSize: '17px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}><Email/>&nbsp;&nbsp;timeattacks2@naver.com</span><br/>
                    <span style={{
                      color: 'gray',
                      fontSize: '17px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}><Phone/>&nbsp;&nbsp;010-4596-5429</span>
                  </div>
                </div>
              </div>
              <div style={bottomDivStyle}>
                <div style={containerStyle}>
                  <div style={bottomLeftDivStyle}>
                    <div style={issueDiv}>
                      <div style={{
                        backgroundColor: 'rgb(140 148 194)',
                        borderRadius: '5px 5px 0 0',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        display: 'flex', // Flexbox 사용
                        alignItems: 'center', // 수직 정렬
                        padding: '6px', // 여백 추가
                      }}><AssignmentIcon style={{marginLeft: '10px'}}/>&nbsp;&nbsp;지시 현황
                        <div>
                        <span style={{fontSize: '8px'}}>&nbsp;&nbsp;금월 입고 및 총 입고수를 나타냅니다.</span>
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={{
                          margin: '2%',
                          float: 'left',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                        <div style={{
                          margin: '2%',
                          float: 'right',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                      </div>
                    </div>
                    <br/>
                    <div style={issueDiv}>
                      <div style={{
                        backgroundColor: 'rgb(140 148 194)',
                        borderRadius: '5px 5px 0 0',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        display: 'flex', // Flexbox 사용
                        alignItems: 'center', // 수직 정렬
                        padding: '6px', // 여백 추가
                      }}><LocalShippingIcon style={{marginLeft: '10px'}}/>&nbsp;&nbsp;출고 현황
                        <div>
                          <span style={{fontSize: '8px'}}>&nbsp;&nbsp;금월 입고 및 총 입고수를 나타냅니다.</span>
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={{
                          margin: '2%',
                          float: 'left',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                        <div style={{
                          margin: '2%',
                          float: 'right',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                      </div>
                    </div>
                    <br/>
                    <div style={issueDiv}>
                      <div style={{
                        backgroundColor: 'rgb(140 148 194)',
                        borderRadius: '5px 5px 0 0',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        display: 'flex', // Flexbox 사용
                        alignItems: 'center', // 수직 정렬
                        padding: '6px', // 여백 추가
                      }}><BusinessIcon style={{marginLeft: '10px'}}/>&nbsp;&nbsp;거래가 많은 거래처
                        <div>
                          <span style={{fontSize: '8px'}}>&nbsp;&nbsp;금월 입고 및 총 입고수를 나타냅니다.</span>
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={{
                          margin: '2%',
                          float: 'left',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                        <div style={{
                          margin: '2%',
                          float: 'right',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>

                        </div>
                      </div>
                    </div>
                    <br/>
                    <div style={issueDiv}>
                      <div style={{
                        backgroundColor: 'rgb(140 148 194)',
                        borderRadius: '5px 5px 0 0',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        display: 'flex', // Flexbox 사용
                        alignItems: 'center', // 수직 정렬
                        padding: '6px', // 여백 추가
                      }}><BusinessIcon style={{marginLeft: '10px'}}/>&nbsp;&nbsp;만료일이 가까운 지시
                        <div>
                          <span style={{fontSize: '8px'}}>&nbsp;&nbsp;금월 입고 및 총 입고수를 나타냅니다.</span>
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={{
                          margin: '2%',
                          float: 'left',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>
                        </div>
                        <div style={{
                          margin: '2%',
                          float: 'right',
                          width: '46%',
                          boxShadow: '0 0 5px 1px #DDDDDD',
                        }}>
                          <span style={{fontWeight:'bold', fontSize:'16px'}}>A. 금월 입고 건수</span><br/><br/>1건<br/><br/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    ...bottomRightDivStyle, margin: '0px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{...chartDiv, float: 'left', width: '100%', height: '250px'}}>
                        <ReactEcharts option={instructionBar}/>
                      </div>
                      <div style={{...chartDiv, float: 'left', width: '100%', height: '250px'}}>
                        <ReactEcharts option={deliveryBar}/>
                      </div>
                    </div>
                    <div style={{
                      ...chartDiv, marginTop: '2vw'
                    }}>
                      <ReactEcharts style={{paddingTop: '20px', height: '350px'}} option={option2}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={rightDivStyle}>
              <div style={todoDiv}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}


export default MainPage;
