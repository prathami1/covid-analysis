//framework
import React, { useState, useEffect } from 'react';

//assets
import '../App.css';
import NewsCard from '../components/NewsCard'
import Button from '../components/Button'
import Footer from '../components/Footer'
import MiniHead from '../components/MiniHead'
import Jumbotron from '../components/Jumbotron'
import Search from '../components/Search'
import Loading from '../components/Loading'

function News() {
    //connecting flask with react
    const [data, setData] = useState(null);
    const news = []
    useEffect(() => {
      fetch('/news')
        .then(res => res.json())
          .then(data => {setData(data);});   
      },
    []);
    //checks if data in dictionary format is fetched from flask before displaying data
    if(data) 
    {
      console.log(data)
      for (const i in data.title) {
        news.push(
        //format of displaying data (DescriptionCard)
        <NewsCard
            imgsrc = {data.img_url[i]}
            title = {data.title[i]}
            author = {data.author[i]}
            description = {data.notes[i]}
            date = {data.date[i]}
            source = {data.website[i]}
            href = {data.url[i]}
        />
        )
      }
      //main page function portion
      return(
        <div>
          <div className="jumbotron rounded-0" style={{border: 'none!important', background: 'linear-gradient(-30deg, #B5FF33 0%, #2EA707 100%)', height: '315px'}}>
            <Jumbotron 
              title = "News on the Coronavirus"
              pretag = "A central hub for all news on the"
              posttag = "Coronavirus"
              hrefport = 'https://prathami1.studio'
              prebutton = 'Built By'
              name = "Pratham Inamdar"
            />
            <Search 
              searchtag=" Search News"
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
                minihead = "Recent News"
              />
              {/*variable that displays data from what was fetched from flask*/}
              <div className="row projects">
                  {news}
              </div>
                </div>
          <Footer
            href="https://newsapi.org"
            source="newsapi.org"
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
  
  export default News;