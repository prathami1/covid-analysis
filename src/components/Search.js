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

const searchBar = document.getElementById("searchBar");
const filteredCharacters = hpCharacters.filter(character => { return true; });
const filteredCharacters = hpCharacters.filter(character => {
  return (
    character.name.includes(searchString) ||
    character.house.includes(searchString)
  );
});
searchBar.addEventListener("keyup", e => {
  const searchString = e.target.value;
  const filteredCharacters = hpCharacters.filter(character => {
    return (
      character.name.includes(searchString) ||
      character.house.includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});
const searchString = e.target.value.toLowerCase();
const filteredCharacters = hpCharacters.filter(character => {
  return (
    character.name.toLowerCase().includes(searchString) ||
    character.house.toLowerCase().includes(searchString)
  );
});

export default Search;
