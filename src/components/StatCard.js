import React from 'react';

function StatCard(props) {
    return(
        <div className="card">
        <div className="col-sm-6 col-lg-4 item" style={{paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Inria Sans!important'}}>{props.first}
            <h3 className="name" style={{marginTop: '10px', fontFamily: 'Big Shoulders Text!important', fontWeight: 'bold', marginBottom: '4px'}}>
              {props.title}</h3>
              </div>
            <div className="col-sm-6 col-lg-4 item" style={{paddingTop: '5px', paddingBottom: '15px', fontFamily: 'Inria Sans!important'}}>{props.second}
            <p className="description" style={{marginBottom: '4px'}}>
              <strong>{props.author}</strong></p>
            <span className="badge badge-primary" style={{backgroundColor: 'rgb(0,0,0)', fontSize: '16px'}}>{props.date}</span><span className="badge badge-primary" style={{backgroundColor: 'rgb(0,0,0)', fontSize: '16px', marginLeft: '8px'}}>{props.source}</span>
            </div>
          </div>
    );
}

export default StatCard;