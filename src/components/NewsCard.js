import React from 'react'; 

function NewsCard(props)
    {
        return(
            <div className="col-sm-6 col-lg-4 item" style={{paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Inria Sans!important'}}>{props.heading}
            <img className="img-fluid" src={props.imgsrc} style={{borderRadius: '6px'}} alt={props.title} />
            <h3 className="name" style={{marginTop: '10px', fontFamily: 'Big Shoulders Text!important', fontWeight: 'bold', marginBottom: '4px'}}>
              {props.title}</h3>
            <p className="description" style={{marginBottom: '4px'}}>
              <strong>{props.author}</strong></p>
            <p className="description" style={{marginBottom: '8px'}}>{props.description} &nbsp;<a href={props.href} style={{color: '#0056b3!important'}}>Read
                more <i className="fas fa-chevron-right" /></a></p>
            <span className="badge badge-primary" style={{backgroundColor: 'rgb(0,0,0)', fontSize: '16px'}}>{props.date}</span><span className="badge badge-primary" style={{backgroundColor: 'rgb(0,0,0)', fontSize: '16px', marginLeft: '8px'}}>{props.source}</span>
            <hr />
          </div>
        );
    }

    export default NewsCard;