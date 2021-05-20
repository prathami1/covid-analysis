import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

function LineGraph () {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        let date = []

        let deathIncrease = []
        let hospitalizedIncrease = []
        let negativeIncrease = []
        let positiveIncrease = []
        let totalTestResultsIncrease = []

        axios.get('/time')
        .then(res => {
            console.log(res)
            for(const i of res.data.dateChecked) {
                date.push(i)
            }
            for(const i of res.data.deathIncrease) {
                deathIncrease.push(parseInt(i))
            }
            for(const i of res.data.hospitalizedIncrease) {
                hospitalizedIncrease.push(parseInt(i))
            }
            for(const i of res.data.negativeIncrease) {
                if(i < 0)
                {
                    negativeIncrease.push((parseInt(i))*-1)
                }
                negativeIncrease.push(parseInt(i))
            }
            for(const i of res.data.positiveIncrease) {
                positiveIncrease.push(parseInt(i))
            }
            for(const i of res.data.totalTestResultsIncrease) {
                totalTestResultsIncrease.push(parseInt(i))
            }
            setChartData({
                labels: date,
                datasets: [
                    {
                        label: 'Increases in Deaths, Per Day',
                        data: deathIncrease,
                        backgroundColor: ['rgba(255, 182, 193, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Increases in Hospitalization, Per Day',
                        data: hospitalizedIncrease,
                        backgroundColor: ['rgba(139, 69, 19, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Increases in Negative Cases, Per Day',
                        data: negativeIncrease,
                        backgroundColor: ['rgba(222, 184, 135, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Increases in Positive Cases, Per Day',
                        data: positiveIncrease,
                        backgroundColor: ['rgba(192, 192, 192, 0.6)'],
                        borderWidth: 4
                    },
                    {
                        label: 'Increases in Total Test Results Released, Per Day',
                        data: totalTestResultsIncrease,
                        backgroundColor: ['rgba(50, 168, 82, 0.6)'],
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
