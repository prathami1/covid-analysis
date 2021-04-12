import React, { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

function LineGraph () {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        let doses = []
        let state = []

        axios.get('/vac')
        .then(res => {
            console.log(res)
            for(const i of res.data.state) {
                state.push(i)
            }
            for(const i of res.data.totalFirst) {
                doses.push(parseInt(i))
            }
            setChartData({
                labels: state,
                datasets: [
                    {
                        label: 'Vaccine Shippments',
                        data: doses,
                        strokeColor: ['rgba(176, 243, 0, 0.6)'],
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
            <div style={{height: "650", width: "1150px"}}>
                <Bar 
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