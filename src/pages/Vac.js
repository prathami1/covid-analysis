//framework
import React, { useState, useEffect } from 'react';

//assets
import '../App.css';
import StatCard from '../components/StatCard'
import Button from '../components/Button'
import Footer from '../components/Footer'
import MiniHead from '../components/MiniHead'
import Jumbotron from '../components/Jumbotron'
import Loading from '../components/Loading'

//graphs
import VacGraph from '../components/graph-templates/vacBar'

function Vac() {
  //connecting flask with react
  const [data, setData] = useState(null);
  const stats = []
  useEffect(() => {
    fetch('/vac')
      .then(res => res.json())
        .then(data => {setData(data);});   
    },
  []);
  //checks if data in dictionary format is fetched from flask before displaying data
  if(data) 
  {
    console.log(data)
    for (const i in data.state) {
      stats.push(
      //format of displaying data (DescriptionCard)
      <StatCard
        first = "1st Dose:"
        title = {data.totalFirst[i]}
        second = "Region:"
        author = {data.region[i]}
        date = {data.state[i]}
      />
      )
    }
    //main page function portion
    return(
      <div>
        <div className="jumbotron rounded-0" style={{border: 'none!important', background: 'linear-gradient(-30deg, #B5FF33 0%, #2EA707 100%)', height: '260px'}}>
          <Jumbotron 
            title = "Coronavirus Vaccine"
            pretag = "A central hub for all vaccine data on the"
            posttag = "Coronavirus"
            hrefport = 'https://prathami1.studio'
            prebutton = 'Built By'
            name = "Pratham Inamdar"
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
              minihead = "Vaccine Statistics"
            />
            <p>COVID-19 Vaccine Distribution Allocations from Pfizer (a leading provider for vaccinations), by jurisdiction.</p>
            {/*variable that displays data from what was fetched from flask*/}
            <div className="scrolling-wrapper">
              {stats}
            </div>
            <p></p>
            <MiniHead 
              minihead = "Vaccine Doses"
            />
            <p>COVID-19 Vaccine Distribution Allocations graphed, by jurisdiction.</p>
            <VacGraph />
          </div>
        <Footer
          href="https://covid.cdc.gov/"
          source="cdc.gov"
        />
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

export default Vac;