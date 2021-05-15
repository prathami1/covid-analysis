import React, { useState, setState } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Datamap from 'datamaps/dist/datamaps.all.min.js';

class DataMap extends React.Component {
      
      constructor(props) {
        super(props);
        this.state = {
          //states
        };
      }

      componentDidUpdate() {
        this.datamap.updateChoropleth(this.createData());
      }

      render() {
        return (
              <>
                <div id="datamap-container" style={{marginTop: ""}}></div>
              </>
        );
      }

      renderMap(){
        return new Datamap({
          element: ReactDOM.findDOMNode(this),
          scope: 'usa',
          fills: { defaultFill: '#F5F5F5' },
          geographyConfig: {
            highlightOnHover: false,
            borderColor: '#DEDEDE',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            // only change border
            highlightBorderColor: '#B7B7B7',
            popupTemplate: function(geo, data) {
              return ['<div class="hoverinfo" style="color:black">', 
                        '<strong>',
                            geo.properties.name,
                        '</strong>',
                        '<p>',
                          "ICU Capacity Filled: " + data.icuBeds + "%",
                        '</p>',
                        '<p>',
                          "Vaccines Distributed: " + data.vaccinesDistributed,
                        '</p>',
                        '<p>',
                        "Vaccines Administered: " + data.vaccinesAdministered,
                        '</p>',
                      '</div>'
                     ].join('');
            },
          },
          responsive: true
        });
      }

      currentScreenWidth(){
        return window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
      }



    createData() {
      var dataset = {};
      var icuValues = this.props.jsonReturnedValue.map(function (obj) {
        return obj[1];
      });

      // We need to colorize every country based on "numberOfWhatever"
      // colors should be uniq for every value.
      // For this purpose we create palette(using min/max series-value)
      var minValue = Math.min.apply(null, icuValues),
        maxValue = Math.max.apply(null, icuValues);

      // create color palette function
      // color can be whatever you wish
      var paletteScale = d3
        .scaleLinear()
        .domain([minValue, maxValue])
        .range(["#72ed85", "#f25060"]); // green-red color range

        this.props.jsonReturnedValue.forEach(function (item) {
        //
        // item example value ["USA", 70]
        var iso = item[0],
          icu = item[1],
          distributed = item[2],
          administered = item[3];
        dataset[iso] = {vaccinesDistributed: distributed, vaccinesAdministered: administered, icuBeds: icu, fillColor: paletteScale(icu) };
      });
      
      return dataset;
  }
  componentDidMount() {
    const mapContainer = d3.select('#datamap-container');
    const initialScreenWidth = this.currentScreenWidth();
    const containerWidth = (initialScreenWidth < 600) ?
      { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
      { width: '600px', height: '350px' }
    mapContainer.style(containerWidth);
    this.datamap = this.renderMap();
    this.datamap.resize();
    this.datamap.updateChoropleth(this.createData());
    this.datamap.labels({labelColor: 'white'});
    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (this.currentScreenWidth() > 600 && mapContainerWidth !== '600px') {
        d3.select('svg').remove();
        mapContainer.style({
          width: '600px',
          height: '350px'
        });
        this.datamap = this.renderMap();
        this.datamap.resize();
        this.datamap.updateChoropleth(this.createData());
        this.datamap.labels({labelColor: 'white'});
      }
      else if (this.currentScreenWidth() <= 600) {
        d3.select('svg').remove();
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
        });
        this.datamap = this.renderMap();
        this.datamap.resize();
        this.datamap.updateChoropleth(this.initialColor());
        this.datamap.labels({labelColor: 'white'});
      }
    });
  }
} 
export default DataMap;
