import React from 'react';

function Footer(props)
{
    return(
        <footer style={{marginTop: '60px'}}>
          <div className="container text-center">
          <p className="lead" style={{fontWeight: 600}}>{props.preref} {props.refresh}
            </p>
          <p className="lead" style={{fontWeight: 500, marginBottom: '0px'}}>Powered by&nbsp;
            <a href={props.href} style={{color: '#0056b3!important'}}>{props.source}</a></p>
            <p className="lead" style={{fontWeight: 600}}>© 2021 Pratham Inamdar
            </p>
          </div>
        </footer>
    );
}

export default Footer;