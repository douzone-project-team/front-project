// GraphBox 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';

interface GraphBoxProps {
    data: { value: number; name: string }[];
    labelText: string;
    colors: string[]; // 새로운 프로퍼티: 그래프의 색상 배열
}

class GraphBox extends Component<GraphBoxProps> {
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
        const { data, labelText, colors } = this.props;
        const chartDom = this.chartRef.current;

        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const option = {
                color: colors, // 색상을 외부에서 전달받은 배열로 설정
                title: {
                    /*                    left: 'left',
                                        text: labelText+" 현황",
                                        textStyle: {
                                            color: '#516377'
                                        }*/
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'left'
                },
                series: [
                    {
                        name: labelText,
                        type: 'pie',
                        radius: ['65%', '85%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'black',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 30,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false,
                        },
                        data: data || [],
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

export default GraphBox;