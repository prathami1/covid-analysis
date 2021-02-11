import React from 'react';

function Button(props)
{
    return(
        <a className="border rounded border-dark" href={props.href} style={{color: '#fff !important', backgroundColor: '#000 !important', borderRadius: '10px !important', borderColor: '#fff !important', fontSize: '1.25rem', padding: '7px', textDecoration: 'none'}}>
            {props.precat}&nbsp;<span style={{fontWeight: 600}}>{props.category}</span></a>
    );
}

export default Button;