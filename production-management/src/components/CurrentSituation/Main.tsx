import React, {Component} from 'react';
import {Box} from '@material-ui/core';
import GraphBox from './GraphBox';
import GraphBox2 from './GraphBox2';
import './../../assets/css/Main.css';
import TodoList from './Todo/Todolist';
import BusinessIcon from '@material-ui/icons/Business';

const containerStyle = { // 최상위 div
    display: 'flex',
    height:'91vh',
    marginTop:'9vh'
};

const leftBoxStyle = {
    width: '75%',
    marginLeft: '7%',
    marginTop: '1%',
};
const rightBoxStyle = {
    width: '25%',
};
const LeftTopStyle = {
    height: '15vh',
    width: '65vw',
    display: 'flex',
};
const LeftShortStyle = {
    height: '60vh',
    display: 'flex'
};
const GraphBoxStyle = {
    width: '42.2vw',
    height: '60vh'
};
const todoBoxStyle = {
    width: '27vw',
    height:'60vh',
    marginLeft: '0.8vw',
};
const userDiv = {
    width: '229.5%',
    height: '18%',
    borderRadius: '5px',
    /*    backgroundColor: 'white',*/
    marginTop: '5%',
    marginLeft: '0%',
    marginRight: '1%',
    /*    boxShadow: '0 0 3px 1px #DDDDDD',*/
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

    boxData = [
        {
            number: 1,
            content: '입출고 현황',
            value: '14건',
            anotherValue: '10건',
            semiTitle1: '금일 입고 건수',
            semiTitle2: '금일 출고 건수',
            image: require(`../../images/instruction.png`)
        },
        {
            number: 2,
            content: '만료일에 가까운 지시',
            value: 'DX2234',
            anotherValue: 'DF2232',
            semiTitle1: '1',
            semiTitle2: '2',
            // image: require(`../../images/notime.png`)
        },
        {
            number: 3,
            content: '거래처 현황',
            value: 'SS100201',
            anotherValue: '123',
            semiTitle1: ' 임박한 지시',
            semiTitle2: '임박한 지시',
            // image: require(`../../images/customer.png`)
        },
    ];

    renderData = (index: number, data: {
        value: string;
        anotherValue: string;
        semiTitle1: string;
        semiTitle2: string
        image: any;
    }) => {
        const {content, image} = this.boxData.find(data => data.number === (index + 1)) || {content: 'N/A', image: ''};
        let backgroundColor = '#516377';
        const iconComponent = content === '거래처 현황' ?
            <BusinessIcon style={{fontSize: '35px', marginLeft: '10px', marginRight: '10px'}}/> : <img src={data.image}
                                                                                                       style={{
                                                                                                           width: '35px',
                                                                                                           height: '35px',
                                                                                                           verticalAlign: 'middle',
                                                                                                           marginLeft: '10px'
                                                                                                       }}/>;
        return (
            <Box boxShadow={3} style={{
                width: '100%',
                borderBottomLeftRadius: '3px',
                borderBottomRightRadius: '3px',
                marginRight: '20px',
                height: '100%'
            }}>
                <Box style={{
                    position: 'relative',
                    zIndex: '2',
                    backgroundColor,
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                    height: '45px',
                    color: 'white',
                    paddingTop: '1%',
                    display: 'flex',
                }}>
                    {iconComponent}
                    <h4 style={{fontSize: '15px', margin: '0%', paddingLeft: '2%', paddingTop: '8px'}}>{content}</h4>
                </Box>
                <h4 style={{marginLeft: '10px', marginTop: '10px'}}>
                    <span style={{marginRight: '5px', color: '#8FE3B7', fontSize: '20px'}}>●</span>
                    {`${data.semiTitle1} : ${data.value}`}
                </h4>
                <h4 style={{marginLeft: '10px', marginTop: '20px'}}>
                    <span style={{marginRight: '5px', color: '#F77D93', fontSize: '20px'}}>●</span>
                    {`${data.semiTitle2} : ${data.anotherValue}`}
                </h4>
            </Box>
        );
    };

    render() {
        const instructionColors = ['#8FE3B7', '#8f9de3', '#c8dded']; // 지시 색상
        const deliveryColors = ['#F77D93', '#dccbce', '#98FB98']; // 출고 색상
        return (
            <div style={containerStyle}>
                <div style={leftBoxStyle}>
                    <div style={LeftTopStyle}>
                        <Box style={{width: '100%', height: 'auto', display: 'flex'}}>
                            {this.boxData.map((data, index) =>
                                this.renderData(index, {
                                    value: data.value,
                                    anotherValue: data.anotherValue,
                                    semiTitle1: data.semiTitle1,
                                    semiTitle2: data.semiTitle2,
                                    image: data.image,
                                })
                            )}
                        </Box>
                    </div>
                    <div style={LeftShortStyle}>
                        <div style={GraphBoxStyle}>
                            <div>
                                <h1 style={{color:'#2C436D'}}>입출고 현황</h1>
                                <h4 style={{marginTop:'-15px',marginLeft:'1%', color:'gray'}}>입출고 현황을 나타냅니다.</h4>
                            </div>
                            <div style={{height: '50%'}}>
                                <Box boxShadow={3} style={{
                                    height: '100%', width: '100%', backgroundColor: '#FFFFFF',
                                    borderRadius: '5px'
                                }}>
                                    <GraphBox2 data={this.state.graphData2}/>
                                </Box>
                            </div>
                            <div style={{display: 'flex', height: '40%', marginTop: '3%'}}>
                                <Box boxShadow={3} style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '5px'
                                }}>
                                    <GraphBox data={this.state.instructionData} labelText="지시"
                                              colors={instructionColors}/>
                                </Box>
                                <Box boxShadow={3} style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#FFFFFF',
                                    marginLeft: '2%',
                                    borderRadius: '5px'
                                }}>
                                    <GraphBox data={this.state.deliveryData} labelText="출고" colors={deliveryColors}/>
                                </Box>
                            </div>
                        </div>
                        <div style={todoBoxStyle}>
                            <div>
                                <h1 style={{color:'#2C436D'}}>TODO</h1>
                                <h4 style={{marginTop:'-15px',marginLeft:'1%', color:'gray'}}>Todo를 나타냅니다.</h4>
                            </div>
                            <TodoList></TodoList>
                        </div>
                    </div>
                    <div style={rightBoxStyle}>

                    </div>

                </div>
            </div>
        );
    }
}

export default Main;