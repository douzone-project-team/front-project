import React, {Component} from 'react';
import {Avatar, Box, Grid} from '@material-ui/core';
import GraphBox from './GraphBox';
import GraphBox2 from './GraphBox2';
import './../../assets/css/Main.css';
import TodoList from './Todo/Todolist';
import {Email, Phone, SupervisorAccount} from "@material-ui/icons";
import BusinessIcon from '@material-ui/icons/Business';
const userDiv = { // 유저 box div
    width:'229.5%',
    height:'18%s',
    borderRadius: '5px',
/*    backgroundColor: 'white',*/
    marginTop: '5%',
    marginLeft: '0%',
    marginRight: '1%',
/*    boxShadow: '0 0 3px 1px #DDDDDD',*/
    display: 'flex',
}

class SemiBox extends Component {
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
            semiTitle3: '누적 입고 건수',
            semiTitle4: '누적 출고 건수',
            image: require(`../../images/instruction.png`)
        },
        {
            number: 2,
            content: '만료일에 가까운 지시',
            value: 'DX2234',
            anotherValue: 'DF2232',
            semiTitle1: '1',
            semiTitle2: '2',
            semiTitle3: '',
            semiTitle4: '',
            image: require(`../../images/notime.png`)
        },
        {
            number: 3,
            content: '거래처 현황',
            value: 'SS100201',
            anotherValue: '123',
            semiTitle1: ' 임박한 지시',
            semiTitle2: '임박한 지시',
            semiTitle3: '',
            semiTitle4: '',
            image: require(`../../images/customer.png`)
        },
    ];

    renderData = (index: number, data: {
        value: string;
        anotherValue: string;
        semiTitle1: string;
        semiTitle2: string
        semiTitle3: string
        semiTitle4: string
        image: any;
    }) => {
        const { content, image } = this.boxData.find(data => data.number === (index + 1)) || { content: 'N/A', image: '' };
        let borderColor = '#ffffff';
        let backgroundColor = '#516377';
        const iconComponent = content === '거래처 현황' ?
            <BusinessIcon style={{ fontSize: '35px', marginLeft:'10px',marginRight: '10px' }} /> : <img src={data.image} style={{ width: '35px', height: '35px', verticalAlign: 'middle', marginLeft: '10px' }} />;
        return (
            <Box boxShadow={3} style={{
                width: '93%',
                marginTop: '5%',
                borderBottomLeftRadius: '3px',
                borderBottomRightRadius: '3px',
                marginBottom: '4%',
            }}>
                <Box style={{
                    position: 'relative',
                    zIndex: '2',
                    backgroundColor,
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                    height: '45px',
                    marginBottom: '10px',
                    color: 'white',
                    paddingTop: '1%',
                    display: 'flex',
                }}>
                    {iconComponent}
                    <h4 style={{ fontSize: '15px', margin: '0%', paddingLeft: '2%', paddingTop: '8px' }}>{content}</h4>
                </Box>
                <Box style={{
                    position: 'relative',
                    zIndex: '1',
                    marginTop: '-27px',
                    backgroundColor: '#F9FDFF',
                    height: 'auto',
                    padding: '5px',
                    marginLeft: '10px',
                    borderBottomRightRadius: '5px',

                }}>
                    <h4 style={{ marginLeft: '10px' }}>
                        <span style={{ marginRight: '5px', color: '#8FE3B7', fontSize: '20px' }}>●</span>
                        {`${data.semiTitle1} : ${data.value}`}
                    </h4>
                    <h4 style={{ marginLeft: '10px' }}>
                        <span style={{ marginRight: '5px', color: '#F77D93', fontSize: '20px' }}>●</span>
                        {`${data.semiTitle2} : ${data.anotherValue}`}
                    </h4>
                    {data.semiTitle3 && (
                        <h4 style={{ marginLeft: '10px' }}>
                            <span style={{ marginRight: '5px', color: '#67AED9', fontSize: '20px' }}>●</span>
                            {`${data.semiTitle3} : ${data.anotherValue}`}
                        </h4>
                    )}
                    {data.semiTitle4 && (
                        <h4 style={{ marginLeft: '10px' }}>
                            <span style={{ marginRight: '5px', color: 'Yellow', fontSize: '20px' }}>●</span>
                            {`${data.semiTitle4} : ${data.anotherValue}`}
                        </h4>
                    )}
                </Box>
            </Box>
        );
    };

    render() {
        const instructionColors = ['#8FE3B7', '#8f9de3', '#c8dded']; // 지시 색상
        const deliveryColors = ['#F77D93', '#dccbce', '#98FB98']; // 출고 색상
        return (
            <Box style={{display: 'flex'}}>
                <Grid container spacing={2} style={{width:'100%',height:'100%',display:'flex'}} >
                    <Grid item xs={4} style={{width:'30%', marginLeft:'1%'}}>
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
                        style={{color: '#444444', fontSize: '27px', fontWeight: 'bold'}}>이주빈 사원님&nbsp;
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
                        <Box style={{width: '80%', height: 'auto', marginTop:'-1.5%'}}>
                            {this.boxData.map((data, index) =>
                                this.renderData(index, {
                                    value: data.value,
                                    anotherValue: data.anotherValue,
                                    semiTitle1: data.semiTitle1,
                                    semiTitle2: data.semiTitle2,
                                    semiTitle3: data.semiTitle3,
                                    semiTitle4: data.semiTitle4,
                                    image: data.image,
                                })
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={6} style={{marginTop:'2%',paddingTop:'10%',marginLeft:'-7%'}}>
                        <Box style={{ display: 'flex', width:'97.8%',height:'35%' }}>
                            <Box boxShadow={3} style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: '5px' }}>
                                <GraphBox data={this.state.instructionData} labelText="지시 상태" colors={instructionColors} />
                            </Box>
                            <Box boxShadow={3} style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', marginLeft: '2%', borderRadius: '5px' }}>
                                <GraphBox data={this.state.deliveryData} labelText="출고 상태" colors={deliveryColors} />
                            </Box>
                        </Box>
                        <Box boxShadow={3} style={{height:'59%',width:'97.8%', marginTop:'2.5%', backgroundColor:'#FFFFFF',
                            borderRadius:'5px'}}>
                            <GraphBox2 data={this.state.graphData2} />
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box boxShadow={3} style={{ display: 'flex', width:'280%',height:'95%',
                        backgroundColor:'#FFFFFF', marginTop:'21%', borderRadius:'5px'}}>
                                <Box style={{marginTop:'5%'}}>
                                    <TodoList></TodoList>
                                </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default SemiBox;