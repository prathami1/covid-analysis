import React from 'react';

function Jumbotron(props)
{
    return(
          <div className="container">
            <h1 style={{fontFamily: 'Big Shoulders Text', fontSize: '3.3rem', fontWeight: 700, color: '#fff'}}>{props.title}</h1>
            <p style={{fontSize: '1.5rem', color: '#fff'}}>{props.pretag}&nbsp;<a href="https://www.who.int/health-topics/coronavirus#tab=tab_1"><span style={{textDecoration: 'underline', color: '#fff'}}>{props.posttag}</span></a>.</p>
            <a className="border rounded border-dark" href={props.hrefport} style={{color: 'rgba(23,61,99,1) !important', backgroundColor: '#fff !important', borderColor: '#fff !important', fontSize: '1.25rem', padding: '7.5px', textDecoration: 'none'}}>{props.prebutton}
                &nbsp;<span style={{fontWeight: 600}}>{props.name}</span></a>
          </div>
    );
}

export default Jumbotron;