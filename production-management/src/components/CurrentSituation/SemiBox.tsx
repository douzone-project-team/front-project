import React, { Component } from 'react';
import { Box, Grid,MenuItem,Select   } from '@material-ui/core';
import GraphBox from './GraphBox';
import GraphBox2 from './GraphBox2';
import './../../assets/css/Main.css';
import TodoList from './Todolist';

class SemiBox extends Component {
    state = {
        selectedGraph: null,
        status: '지시',
        graphValue:'instruction',
        graphData: [
            { value: 1048, name: '지시 완료' },
            { value: 735, name: '지시 진행중' },
            { value: 580, name: '지시 준비중' }
        ],
        graphData2: [
            { value: 20, name: '7월' },
            { value: 40, name: '8월' },
            { value: 30, name: '9월' },
            { value: 50, name: '10월' },
            { value: 15, name: '11월' }
        ],
    };

    boxData = [
        { number: 1, content: '입고 현황',
            value: 'DX113243', anotherValue:'123',
            semiTitle1:'금일 입고 건수',semiTitle2:'누적 입고 건수' },
        { number: 2, content: '출고 현황',
            value: 'AP112503',anotherValue:'123' ,
            semiTitle1:'금일 입고 건수',semiTitle2:'누적 입고 건수' },
        { number: 3, content: '만료일이 가까운 지시',
            value: 'SS100201',anotherValue:'123',
            semiTitle1:' 임박한 지시',semiTitle2:'임박한 지시'  },
        { number: 4, content: '거래가 많은 거래처',
            value: 'C0056',anotherValue:'123',
            semiTitle1:'금일 입고 건수 ',semiTitle2:'누적 입고 건수'  },
    ];

    handleToggleClick = () => {
        const newStatus = this.state.status === '지시' ? '출고' : '지시';

        this.setState({
            selectedGraph: null,
            status: newStatus,
            graphValue: newStatus === '지시' ? 'instruction' : 'delivery',
            graphData: newStatus === '지시' ? [
                { value: 1048, name: '지시 완료' },
                { value: 735, name: '지시 진행중' },
                { value: 580, name: '지시 준비중' }
            ] : [
                { value: 860, name: '출고 완료' },
                { value: 735, name: '출고 미완료' },
            ],
            graphData2: newStatus === '지시' ? [
                { value: 735, name: '7월' },
                { value: 808, name: '8월' },
                { value: 1048, name: '9월' },
                { value: 735, name: '10월' },
                { value: 580, name: '11월' }
            ] : [
                { value: 600, name: '7월' },
                { value: 700, name: '8월' },
                { value: 700, name: '9월' },
                { value: 1100, name: '10월' },
                { value: 330, name: '11월' }
            ],
        });
    };


    renderData = (index: number, data: { value: string; anotherValue: string; semiTitle1: string; semiTitle2: string }) => {
        const { content } = this.boxData.find(data => data.number === (index + 1)) || { content: 'N/A' };
        let borderColor = '#ffffff';
        let backgroundColor = '';
        switch (index + 1) {
            case 1:
                backgroundColor = '#5C9DF2';
                break;
            case 2:
                backgroundColor = ' #3C70F2';
                break;
            case 3:
                backgroundColor = '#FC4343';
                break;
            case 4:
                backgroundColor = '#FFA500';
                break;
            default:
                backgroundColor = 'lightgray';
        }

        return (
            <Box style={{ width: '100%', marginBottom: '20px' }}>
                <Box style={{
                    position: 'relative',
                    zIndex: '2',
                    backgroundColor,
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    height: '25%',
                    marginBottom: '10px',
                    marginLeft: '10px',
                    color: 'white',
                }}>
                    <h4 style={{ fontSize: '15px', margin: '0%', paddingLeft: '5%', paddingTop: '5px' }}>{content}</h4>
                </Box>
                <Box boxShadow={3} style={{
                    position: 'relative',
                    zIndex: '1',
                    marginTop: '-20px',
                    backgroundColor: '#FFFFFF',
                    height: '100px',
                    padding: '10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    marginLeft: '10px',
                }}>
                    <h4 style={{ marginBottom: '1%' }}>{`${data.semiTitle1} : ${data.value}`}</h4>
                    <hr style={{
                        borderTop: '1px solid lightgray',
                        marginLeft: 0,
                        width: '95%',
                        marginTop: '2px',
                        marginBottom: '2px',
                    }} />
                    <h4 style={{ marginTop: '20px' }}>{`${data.semiTitle2} : ${data.anotherValue}`}</h4>
                </Box>
            </Box>
        );
    };

    render() {
        return (
            <Grid container spacing={3} style={{ display: 'flex', marginTop:'1%' }}>
                <Grid item xs={9} style={{paddingLeft:'50px'}}>
                    <Box style={{ display: 'flex', marginTop:'5px'}}>
                        <Grid style={{display:'flex',width:'100%',marginLeft:'-10px'}}>
                            {this.boxData.map((data, index) => this.renderData(index, { value: data.value, anotherValue: data.anotherValue, semiTitle1: data.semiTitle1, semiTitle2: data.semiTitle2 }))}
                        </Grid>
                    </Box>
                    <Box borderRadius={10} boxShadow={3}  style={{ paddingTop: '1px', height: '520px', backgroundColor: '#FFFFFF',
                    width:'99.15%'}}>
                            <Select
                                value={this.state.status}
                                onChange={this.handleToggleClick}
                                style={{
                                    color: 'black', backgroundColor: '#F0F0F0', borderRadius: '10px', width: '10%',
                                    boxShadow: '10px', textAlign: 'center',marginLeft:'88%'
                                }}>
                                <MenuItem value="지시">지시 현황</MenuItem>
                                <MenuItem value="출고">출고 현황</MenuItem>
                            </Select>

                        <Box style={{ height: '3px', backgroundColor: this.state.status === '지시' ? '#3C70F2' : '#FFA500' }} />
                        <Box style={{ display: 'flex', paddingLeft: '35px', paddingTop:'50px' }}>
                            {this.state.selectedGraph || <GraphBox2 data={this.state.graphData2} graphValue={this.state.graphValue} />}
                            {this.state.selectedGraph || <GraphBox data={this.state.graphData} graphValue={this.state.graphValue} />}
                        </Box>
                    </Box>
                </Grid>
                <Box>
                <Box borderRadius={10} boxShadow={3} style={{ marginTop: '15px', width: '330px', height: '450px', backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                    <Box style={{backgroundColor:'#5C9DF2', borderTopLeftRadius:'10px',borderTopRightRadius:'10px',height:'5%'}}>
                    </Box>
                    <img src={require("../../images/logo.png")} alt="Logo" style={{ width: '120px', height: '20px', marginLeft: '100px',marginTop:'40px' }} />
                    <img src={require("../../images/pic.png")} alt="EmpPic" style={{ width: '100px', height: '100px', marginLeft: '110px',marginTop:'40px' }} />
                    <Box style={{backgroundColor:'#5C9DF2',height:'45%',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                        <h3 style={{ fontSize: '18px',  marginLeft: '40%', paddingTop:'20px'}}>황정민</h3>
                        <Box style={{display:'flex'}}>
                            <img src={require("../../images/email.png")} alt="email" style={{ width: '10%', height: '10%', marginLeft: '20%',marginTop:'3%' }} />
                            <p style={{ fontSize: '16px', marginLeft: '5%' }}>asd@asd.com</p>
                        </Box>
                        <Box style={{display:'flex'}}>
                            <img src={require("../../images/phone.png")} alt="phone" style={{ width: '10%', height: '10%', marginLeft: '20%',marginTop:'3%' }} />
                            <p style={{ fontSize: '16px', marginLeft: '5%' }}>010-3213-4424</p>
                        </Box>
                    </Box>
                </Box>
                    <TodoList />
                </Box>
            </Grid>
        );
    }
}

export default SemiBox;