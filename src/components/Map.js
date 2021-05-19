import React, { useState, setState } from 'react';
import DataMap from '../components/graph-templates/DataMap';

class Map extends React.Component {
    state = {
      jsonReturnedValue: [],
    }

  componentDidMount() {
    fetch('/map')
          .then(response => response.json())
          .then(data => {this.setState({ jsonReturnedValue: data})})
          .catch(err => {console.log(err);});
  };

  render () {
    return(
      <div className="App">
      <DataMap jsonReturnedValue={this.state.jsonReturnedValue}/>
      </div>
    )
  };
}

export default Map;
