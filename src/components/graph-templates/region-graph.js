import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
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
                state.push(parseInt(i))
            }
            for(const i of res.data.totalFirst) {
                doses.push(parseInt(i))
            }
            setChartData({
                labels: state,
                datasets: [
                    {
                        label: 'Positive Cases',
                        data: doses,
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