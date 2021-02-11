import React, { useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

function LineGraph () {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        let negative = []
        let positive = []

        axios.get('/time')
        .then(res => {
            console.log(res)
            for(const i of res.data.negative) {
                negative.push(parseInt(i))
            }
            for(const i of res.data.positive) {
                positive.push(parseInt(i))     
            }
            setChartData({
                labels: negative,
                datasets: [
                    {
                        label: 'Positive Cases',
                        data: positive,
                        backgroundColor: ['rgba(176, 243, 0, 0.6)'],
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
            <div style={{height: "1150px", width: "1150px"}}>
                <Pie 
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
                                        display: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
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