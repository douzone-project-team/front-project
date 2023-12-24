// GraphBox2 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';
import { BarGraph } from '../../object/Main/main-object';

interface GraphBoxProps {
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
        window.addEventListener('resize', this.resizeChart);
    }

    componentDidUpdate() {
        this.initializeChart();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeChart);
    }

    resizeChart = () => {
        const chartRefCurrent = this.chartRef.current;
        if (chartRefCurrent) {
            const myChart = echarts.getInstanceByDom(chartRefCurrent);
            if (myChart) {
                myChart.resize();
            }
        }
    };

    initializeChart() {
        const { data } = this.props;
        const chartDom = this.chartRef.current;
        const { deliveryData, instructionData } = data;
        if (chartDom && data) {
            const myChart = echarts.init(chartDom);

            const option: echarts.EChartsOption = {
                color:['#5f639d', '#5fb45f'],
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
                        data: deliveryData.map((dd) => dd.date),
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '지시',
                        type: 'bar',
                        barWidth: '30',
                        barGap: 0,
                        emphasis: {
                            focus: 'series',
                        },
                        data: instructionData.map((dd) => dd.count),
                    },
                    {
                        name: '출고',
                        type: 'bar',
                        barWidth: '30',
                        emphasis: {
                            focus: 'series',
                        },
                        data: deliveryData.map((dd) => dd.count),
                    },
                ],
            };
            myChart.setOption(option);
        }
    }

    render(): ReactNode {
        return <div ref={this.chartRef} style={{ width: '100%', height: '100%' }} />;
    }
}

export default GraphBox2;
