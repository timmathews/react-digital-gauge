import React, {Component, PropTypes} from 'react';
import Gauge from './Gauge';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      labels: ['Speed over Ground', 'Apparent Wind Speed', 'True Wind Speed', 'Speed through Water',
               'House Battery Voltage', 'Shore Power Voltage', 'Shore Power Current', 'House Battery Current',
               'Refrigerator Temperature', 'Freezer Temperature'],
      units: ['kts', 'kts', 'kts', 'kts', 'VDC', 'VAC', 'A', 'A', '°F', '°F']
    };

    setInterval(this.updateState, 500);
  }

  updateState = () => {
    let values = [];
    let state = this.state.values;
    for(let i = 0; i < 10; ++i) {
      values.push(getRandomWalk(90, 135, state[i] * 10, 10) / 10);
    }
    this.setState({values: values});
  }

  render() {
    return (
      <div style={{display:'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        <Gauge value={this.state.values[0]} units={this.state.units[0]} label={this.state.labels[0]} topLabel={false}/>
        <Gauge value={this.state.values[1]} units={this.state.units[1]} label={this.state.labels[1]} topLabel={false}/>
        <Gauge value={this.state.values[2]} units={this.state.units[2]} label={this.state.labels[2]} topLabel={false}/>
        <Gauge value={this.state.values[3]} units={this.state.units[3]} label={this.state.labels[3]} topLabel={false}/>
        <Gauge value={this.state.values[4]} units={this.state.units[4]} label={this.state.labels[4]} topLabel={false}/>
        <Gauge value={this.state.values[5]} units={this.state.units[5]} label={this.state.labels[5]} topLabel={false}/>
        <Gauge value={this.state.values[6]} units={this.state.units[6]} label={this.state.labels[6]} topLabel={false}/>
        <Gauge value={this.state.values[7]} units={this.state.units[7]} label={this.state.labels[7]} topLabel={false}/>
        <Gauge value={this.state.values[8]} units={this.state.units[8]} label={this.state.labels[8]} topLabel={false}/>
        <Gauge value={this.state.values[9]} units={this.state.units[9]} label={this.state.labels[9]} topLabel={false}/>
      </div>
    );
  }
}

function getRandomWalk(min, max, last, delta) {
  var x = getRandomInt(0, delta);
  var d = getRandomInt(0, 1);
  if(d == 1 && last + x < max || last - x < min) {
    return last + x;
  } else if(d == 0 && last - x > min || last + x > max) {
    return last - x;
  } else {
    return last;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
