// GraphBox2 컴포넌트

import React, { Component, ReactNode, RefObject, createRef } from 'react';
import * as echarts from 'echarts';

interface GraphBoxProps {
    data: { value: number; name: string }[];
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

        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const option: echarts.EChartsOption = {
                /*                title: {
                                    left: 'left',
                                    text: '월별 현황',
                                    textStyle: {
                                        color: '#516377'
                                    }
                                },*/
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top:'bottom'
                },
                tooltip: {},
                dataset: {
                    dimensions: ['product', '지시', '출고' ],
                    source: [
                        { product: '2일  전', '지시': 43.3, '출고': 85.8 },
                        { product: '어제', '지시': 83.1, '출고': 73.4},
                        { product: '오늘', '지시': 86.4, '출고': 65.2},
                        { product: '내일', '지시': 86.4, '출고': 65.2 },
                        { product: '2일 후', '지시': 72.4, '출고': 53.9 }
                    ]
                },

                xAxis: { type: 'category' },
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#7378C2'
                        }
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: '#F77D93'
                        }
                    }
                ]
            }
            myChart.setOption(option);
        }
    }

    render(): ReactNode {
        return <div ref={this.chartRef} style={{ width: '100%', height: '100%' }} />;

    }
}

export default GraphBox2;