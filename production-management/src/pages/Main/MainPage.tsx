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
        </Layout>
    );
  }
}


export default MainPage;
