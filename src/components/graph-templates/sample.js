import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import Loading from '../Loading'

function LineGraph () {

    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState({})
    const date = []
    const positive = []

    useEffect(() => {
      fetch('/time')
        .then(res => res.json())
          .then(data => {setData(data);});   
      }, []);
    //checks if data in dictionary format is fetched from flask before displaying data
    if(data) 
    {
        console.log(data)
        for(const i of data.date) 
        {
            date.push(parseInt(i.date))
            positive.push(parseInt(i.positive))
        }
        setChartData({
            labels: date,
            datasets: [
                {
                    label: 'Positive Cases',
                    data: positive,
                    backgroundColor: ['rgba(176, 243, 0, 0.6)'],
                    borderWidth: 4
                }
            ]
        });
    return(
        <div>
            <div style={{height: "1150px", width: "1150px"}}>
                <Line 
                    data = {chartData}
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
    else
    {
        return(
            <Loading />
        );
    }

}

export default LineGraph;
