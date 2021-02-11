import React from 'react';

function MiniHead(props)
{
    return(
        <h1 style={{fontFamily: 'Big Shoulders Text'}}><strong>{props.minihead}</strong></h1>
    );
}

export default MiniHead;