import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

function LineGraph () {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        let date = []

        let positive = []
        let negative = []
        let hospitalizedCurrently = []
        let death = []
        let pending = []
        let hospitalized = []
        let inIcuCurrently = []
        let inIcuCumulative = []
        let onVentilatorCurrently = []
        let onVentilatorCumulative = []
        let totalTestResult = []

        axios.get('/time')
        .then(res => {
            console.log(res)
            for(const i of res.data.dateChecked) {
                date.push(i)
            }
            for(const i of res.data.positive) {
                positive.push(parseInt(i))
            }
            for(const i of res.data.hospitalizedCurrently) {
                hospitalizedCurrently.push(parseInt(i))
            }
            for(const i of res.data.negative) {
                negative.push(parseInt(i))
            }
            for(const i of res.data.death) {
                death.push(parseInt(i))
            }
            for(const i of res.data.pending) {
                pending.push(parseInt(i))
            }
            for(const i of res.data.hospitalized) {
                hospitalized.push(parseInt(i))
            }
            for(const i of res.data.inIcuCurrently) {
                inIcuCurrently.push(parseInt(i))
            }
            for(const i of res.data.inIcuCumulative) {
                inIcuCumulative.push(parseInt(i))
            }
            for(const i of res.data.onVentilatorCurrently) {
                onVentilatorCurrently.push(parseInt(i))
            }
            for(const i of res.data.onVentilatorCumulative) {
                onVentilatorCumulative.push(parseInt(i))
            }
            for(const i of res.data.totalTestResults) {
                totalTestResult.push(parseInt(i))
            }
            setChartData({
                labels: date,
                datasets: [
                    {
                        label: 'Total Test Results Released, Per Day',
                        data: totalTestResult,
                        backgroundColor: ['rgba(255, 20, 147, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Positive Cases Per Day',
                        data: positive,
                        backgroundColor: ['rgba(255, 255, 0, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Negative Cases Per Day',
                        data: negative,
                        backgroundColor: ['rgba(0, 0, 255, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Hospitalizations Per Day',
                        data: hospitalizedCurrently,
                        backgroundColor: ['rgba(124, 252, 0, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Deaths Per Day',
                        data: death,
                        backgroundColor: ['rgba(143 ,188 ,143, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Pending Test Results Per Day',
                        data: pending,
                        backgroundColor: ['rgba(32, 178, 170, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Hospitalized Patients Per Day',
                        data: hospitalized,
                        backgroundColor: ['rgba(95, 158, 160, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Patients that utilized Intensive Care Units, Per Day',
                        data: inIcuCurrently,
                        backgroundColor: ['rgba(138, 43, 226, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Patients that utilized Intensive Care Units, in Total',
                        data: inIcuCumulative,
                        backgroundColor: ['rgba(0, 0, 128, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Patients hospitalized under advanced ventilation, Per Day',
                        data: onVentilatorCurrently,
                        backgroundColor: ['rgba(75, 0, 130, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Patients hospitalized under advanced ventilation, in Total',
                        data: onVentilatorCumulative,
                        backgroundColor: ['rgba(147, 112, 219, 0.6)'],
                        borderWidth: 4
                    }
                ]
            });
        })
    };

    useEffect(() => {
        chart()
    }, [])
    return(
        <div>
            <div style={{height: "650px", width: "1150px"}}>
                <Line 
                    data={chartData}
                    options = {{
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default LineGraph;
