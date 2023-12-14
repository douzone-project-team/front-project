// GraphBox2 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';
import {BarGraph} from "../../object/Main/main-object";

interface GraphBoxProps {/*
    data: { value: number; name: string }[];*/
    data: BarGraph;

}

class GraphBox2 extends React.Component<GraphBoxProps> {
    private chartRef: RefObject<HTMLDivElement>;

    constructor(props: GraphBoxProps) {
        super(props);
        this.chartRef = createRef();
    }

    componentDidMount() {
        this.initializeChart();
    }

    componentDidUpdate() {
        this.initializeChart();
    }

    initializeChart() {
        const { data } = this.props;
        const chartDom = this.chartRef.current;
        const { deliveryData, instructionData } = data
        if (chartDom && data) {
            const myChart = echarts.init(chartDom);

            deliveryData.map(dd =>(dd));
            instructionData.map((id=>(id)));

            const option: echarts.EChartsOption = {
                /* title: {
                    left: 'left',
                    text: '월별 현황',
                    textStyle: {
                        color: '#516377'
                    }
                },*/

                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    top: 'bottom',
                },
                tooltip: {},

                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        data: deliveryData.map(dd =>(dd.date))
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '지시',
                        type: 'bar',
                        barWidth:'30',
                        barGap: 0,
                        emphasis: {
                            focus: 'series'
                        },
                        data:instructionData.map(dd =>(dd.count))
                    },

                    {
                        name: '출고',
                        type: 'bar',
                        barWidth:'30',
                        emphasis: {
                            focus: 'series'
                        },
                        data:deliveryData.map(dd =>(dd.count))
                    }
                ]
            };
            myChart.setOption(option);
        }
    }


    render(): ReactNode {
        return <div ref={this.chartRef} style={{ width: '100%', height: '100%' }} />;

    }
}

export default GraphBox2;
