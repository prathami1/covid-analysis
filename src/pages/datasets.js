//framework
import React, { useState, useEffect } from 'react';

//assets
import '../App.css';
import DescriptionCard from '../components/DescriptionCard';
import Button from '../components/Button'
import Footer from '../components/Footer'
import MiniHead from '../components/MiniHead'
import Jumbotron from '../components/Jumbotron'
import Search from '../components/Search'
import Loading from '../components/Loading'

function Datasets() {
  //connecting flask with react
  const [data, setData] = useState(null);
  const items = []
  useEffect(() => {
    fetch('/data')
      .then(res => res.json())
        .then(data => {setData(data);});   
    },
  []);
  //checks if data in dictionary format is fetched from flask before displaying data
  if(data) 
  {
    console.log(data)
    for (const i in data.title) {
      items.push(
      //format of displaying data (DescriptionCard)
      <DescriptionCard
        heading = {data.heading[i]}
        imgsrc = {data.org_img[i]}
        title = {data.title[i]}
        author = {data.author[i]}
        description = {data.note[i]}
        date = {data.date[i]}
        source = {data.author[i]}
        href = {data.href[i]}
      />
      )
    }
    //main page function portion
    return(
      <div>
        <div className="jumbotron rounded-0" style={{border: 'none!important', background: 'linear-gradient(-30deg, #B5FF33 0%, #2EA707 100%)', height: '315px'}}>
          <Jumbotron 
            title = "Coronavirus Datasets"
            pretag = "A central hub for all data on the"
            posttag = "Coronavirus"
            hrefport = 'https://prathami1.studio'
            prebutton = 'Built By'
            name = "Pratham Inamdar"
          />
          <Search 
            searchtag=" Search Datasets"
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
              minihead = "Popular Datasets"
            />
            {/*<p>
              <Button 
                precat="By"
                category="Nation"
                href = "/"
              />
              <a> </a>
              <Button 
                precat="By"
                category="Cases"
                href = "/"
              />
              <a> </a>
              <Button 
                precat="By"
                category="Deaths"
                href = "/"
              />
            </p>*/}
            {/*variable that displays data from what was fetched from flask*/}
            {items}
          </div>
        <Footer
          href="https://data.gov"
          source="data.gov"
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

export default Datasets;
