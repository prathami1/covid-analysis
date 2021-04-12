import React, { useState, useEffect } from 'react';

import MasterStats from '../components/MasterStats'
import Loading from '../components/Loading'

function CurrentStats(props)
{
    const [data, setData] = useState(null);
  const stats = []
  useEffect(() => {
    fetch('/float')
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
      <MasterStats
        caseHead = "Global Cases:"
        cases = {data.cases}
        deathHead = "Global Deaths:"
        deaths = {data.deaths}
        recHead = "Global Recoveries:"
        recovered = {data.recovered}
        source = "Source:"
        author = "worldometers.info"
        update = {data.refresh}
      />
      )
    return(
        <div>
            {stats}
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


export default CurrentStats;