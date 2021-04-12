//framework
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//assets
import '../App.css';
import Button from '../components/Button'
import Footer from '../components/Footer'
import MiniHead from '../components/MiniHead'
import Jumbotron from '../components/Jumbotron'
import Search from '../components/Search'
import Loading from '../components/Loading'
import Stats from '../components/CurrentStats'


//graphs
import LineGraph from '../components/graph-templates/LinePositive'
import PieGraph from '../components/graph-templates/pie'
import Derivative from '../components/graph-templates/RateOfChange'

function Time() {
  //connecting flask with react
  const [data, setData] = useState(null);
  const refresh = []
  useEffect(() => {
    fetch('/time')
      .then(res => res.json())
        .then(data => {setData(data);});   
    },
  []);
  //checks if data in dictionary format is fetched from flask before displaying data
  if(data) 
  {
    console.log(data)
      refresh.push(
        <Footer
          preref = "Last Updated:"
          refresh = {data.refresh}
          href="https://covidtracking.com"
          source="The Covid Tracking Project"
        />
      )

    return(
        <div>
          <div className="jumbotron rounded-0" style={{border: 'none!important', background: 'linear-gradient(-30deg, #B5FF33 0%, #2EA707 100%)', height: '315px'}}>
            <Jumbotron 
              title = "Time Series Analysis"
              pretag = "A time series analysis on the"
              posttag = "Coronavirus"
              hrefport = 'https://prathami1.studio'
              prebutton = 'Built By'
              name = "Pratham Inamdar"
            />
            <Search 
              searchtag=" Search Nations"
            />
            </div>
            
            <div className="container">
              <Button
                precat="Datasets"
                href="/"
              />
              <a> </a>
              <Button
                precat="Time Series Analysis"
                href="/time-series-analysis"
              />
              <a> </a>
              <Button
                precat="News"
                href="/news"
              />
              <a> </a>
              <Button
                precat="Vaccine"
                href="/vac"
              />
              <p></p>
              <MiniHead 
                minihead = "Case Statistics"
              />
              <div className="scrolling-wrapper">
              <Stats />
              </div>
              <p></p>
              <MiniHead 
                minihead = "General Statistics"
              />
              <p>A graph of the general statistics regarding the Coronavirus Pandemic, showcasing general trendlines and basic case statistics over time.</p>
              <LineGraph />
              <MiniHead 
                minihead = "Derivative of General Statistics"
              />
              <p>A graph of the rate of change of the most common case statistics, such as the rate of change in positive cases per day.</p>
              <Derivative />
            </div>
            <div>
            </div>
            {refresh}
        </div>
    );
  }
  //else if data was not fetched in time (aka the 1 ms before fetching data)
  else
  {
    //loading animation
    return(
      <Loading />
    );
  }
}

export default Time;