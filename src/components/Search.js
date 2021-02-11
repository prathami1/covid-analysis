import React from 'react';

function Search(props)
{
    return(
        <div className="container wrap">
            <p className="search">
                <input type="text" className="searchTerm" placeholder={props.searchtag} />
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search" />
                    </button>
            </p>
        </div>
    );
}

export default Search;