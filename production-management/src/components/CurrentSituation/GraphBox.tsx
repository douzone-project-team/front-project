// GraphBox 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';

interface GraphBoxProps {
    data: { value: number; name: string }[];
    graphValue: string;
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
        const { data, graphValue } = this.props;
        const chartDom = this.chartRef.current;

        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const option = {
                    color: graphValue === 'delivery' ? ['#FFA500', '#FC6363', '#3C70F2'] : ['#3C70F2', '#7B9AEE', 'rgba(120,200,255,1)'],
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
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
        return <div ref={this.chartRef} style={{ width: '100%', height: '400px' }} />;
    }
}

export default GraphBox;
