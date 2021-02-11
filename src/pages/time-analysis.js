//framework
import React, { useState, useEffect } from 'react';

//assets
import '../App.css';
import StatCard from '../components/StatCard';
import Button from '../components/Button'
import Footer from '../components/Footer'
import MiniHead from '../components/MiniHead'
import Jumbotron from '../components/Jumbotron'
import Search from '../components/Search'
import Loading from '../components/Loading'


//graphs
import LineGraph from '../components/graph-templates/LinePositive'
import PieGraph from '../components/graph-templates/pie'

function Time() {
  //connecting flask with react
  const [data, setData] = useState(null);
  const stats = []
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
      stats.push(
      //format of displaying data (StatCard)
      <StatCard
        first = "Positive Cases:"
        title = {data.positive[0]}
        second = "Negative Cases:"
        author = {data.negative[0]}
        date = "As of Today"
      />
      )
      refresh.push(
        <Footer
          preref = "Last Updated:"
          refresh = {data.dateChecked[0]}
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
                {stats}
              </div>
              <p></p>
              <MiniHead 
                minihead = "Master Graph"
              />
              <p>Master graph of the Coronavirus, with a Time Series Analysis on everything one can imagine (regarding the Coronavirus). Documentation of each element is described below.</p>
              <LineGraph />
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
