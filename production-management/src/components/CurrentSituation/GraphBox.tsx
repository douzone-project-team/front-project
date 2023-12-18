// GraphBox 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';
import './font.css';

interface GraphBoxProps {
    data: { value: number; name: string }[];
    labelText: string;
    colors: string[];
}

class GraphBox extends Component<GraphBoxProps> {
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
        const { data, labelText, colors } = this.props;
        const chartDom = this.chartRef.current;

        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const option = {
                color: colors,
                title: {
                    left: '8',
                    text: labelText + ' 현황',
                    textStyle: {
                        fontFamily: 'S-CoreDream-3Light',
                        fontSize: '1.5em',
                        fontWeight: '600',
                        color: '#4D4D4D',
                    },
                    top: 15,
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'left',
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
                                fontWeight: 'bold',
                            },
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
