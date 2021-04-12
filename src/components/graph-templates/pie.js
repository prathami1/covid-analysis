import React, { useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

function PieGraph () {

    const [chartData, setChartData] = useState({})

    const chart = () => {
        let negative = []
        let positive = []

        axios.get('/time')
        .then(res => {
            console.log(res)
            negative.push(parseInt(res.data.negative[0]))
            positive.push(parseInt(res.data.positive[0]))     
            setChartData({
                datasets: [
                    {
                        label: ['Positive Cases', 'Negative Cases'],
                        data: [positive, negative],
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

export default PieGraph;