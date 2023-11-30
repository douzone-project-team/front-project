// GraphBox2 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';

interface GraphBoxProps {
    data: { value: number; name: string }[];
    graphValue: string;
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
        const { data, graphValue } = this.props;
        const chartDom = this.chartRef.current;

        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const option: echarts.EChartsOption = {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0, color: graphValue === 'delivery' ? '#FFA500' : '#3C50F2', // 시작 색상
                        },
                        {
                            offset: 1, color: graphValue === 'delivery' ? '#FFD700' : '#84A5ED', // 종료 색상
                        },
                    ],
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                xAxis: {
                    type: 'category',
                    data: data.map((item) => item.name),
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Value',
                        type: 'bar',
                        barWidth: 40,
                        data: data.map((item) => item.value),
                    },
                ],
            };

            myChart.setOption(option);
        }
    }

    render(): ReactNode {
        return <div ref={this.chartRef} style={{ width: '100%', height: '400px' }} />;
    }
}

export default GraphBox2;
