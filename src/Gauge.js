import React, {Component, PropTypes} from 'react';
import {Resizable, ResizableBox} from 'react-resizable';
import 'style!css!react-resizable/css/styles.css';
import Sparkline from 'react-sparkline';
import {merge} from 'lodash';
require('font-awesome-webpack');

export default class Gauge extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    units: PropTypes.string,
    topLabel: PropTypes.bool
  };

  static style = {
    container: {
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: '5px 5px',
      margin: 0,
      color: '#bbb',
      textAlign: 'center',
      lineHeight: 1,
      fontFamily: 'sans-serif'
    },
    active: {
      border: '1px solid rgba(127, 255, 255, 0.25)',
      borderRadius: 4,
      boxShadow: '2px 2px 3px rgba(255, 255, 255, 0.125)',
      backgroundColor: 'rgba(255, 255, 255, 0.125)'
    },
    value: {
      display: 'inline-block',
      fontSize: 48,
      margin: 0,
      overflow: 'hidden'
    },
    units: {
      display: 'inline-block',
      color: '#676b70',
      textAlign: 'right',
      marginTop: -53
    },
    label: {
      color: '#676b70',
      fontSize: '1.25em',
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      bottom: 10,
      left: 0
    },
    topLabel: {
      color: '#676b70',
      fontSize: '1.25em',
      width: '100%',
      textAlign: 'center'
    },
    button: {
      color: '#676b70',
      position: 'absolute',
      bottom: 5,
      left: 5,
      cursor: 'pointer'
    }
  };

  constructor(props) {
    super(props);
    this.state = {reverse: false, showTrendline: true, height: 160, width: 200};
  }

  componentDidMount() {
    this.setState({width: React.findDOMNode(this).offsetWidth});
  }

  componentWillReceiveProps(nextProps) {
    let history = this.state.history || new Array(100).fill(0);

    if(history.length > 100) history.shift();

    history.push(nextProps.value);

    this.setState({
      history: history,
      width: React.findDOMNode(this).offsetWidth
    });
  }

  handleClick = () => {
    if(this.state && this.state.reverse) {
      this.setState({reverse: false});
    } else {
      this.setState({reverse: true});
    }
  }

  onResize = (event, {element, size}) => {
    this.setState({width: size.width, height: size.height});
  }

  setShowTrendline() {
    this.setState({showTrendline: !this.state.showTrendline});
  }

  renderSparkline() {
    const {style} = Gauge;
    const {history, showTrendline, width, height} = this.state;

    if(showTrendline && height > 100) {
      return <Sparkline
        strokeColor={'#C66'}
        strokeWidth={'0.5px'}
        height={height - 100}
        width={width - 12}
        data={history} />;
    } else {
      return null;
    }
  }

  renderObverse() {
    const {label, value, units, topLabel} = this.props;
    const {style} = Gauge;

    if(topLabel) {
      return (
        <div>
          <div style={style.topLabel}>{label}</div>
          <h1 style={style.value}>{value.toFixed(2)}</h1>
          <div style={style.units}>{units}</div>
          {this.renderSparkline()}
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={style.value}>{value.toFixed(2)}</h1>
          <div style={style.units}>{units}</div>
          {this.renderSparkline()}
          <div style={style.label}>{label}</div>
        </div>
      );
    }
  }

  renderReverse() {
    const {style} = Gauge;
    const {showTrendline} = this.state;

    const label = this.props.topLabel ? style.topLabel : style.label;

    return (
      <div>
        <div style={label}>Settings</div>
        <label htmlFor='trendline'>
          <input type='checkbox' name='trendline' checked={showTrendline} onChange={() => this.setShowTrendline()} />
          Show Trendline
        </label>
      </div>
    );
  }

  render() {
    const {reverse, height, width} = this.state;
    const {style} = Gauge;
    const containerStyle = reverse ? merge({}, style.container, style.active) : merge({}, style.container);

    return (
      <Resizable className="box" height={height} width={width} minConstraints={[160, 100]}
        draggableOpts={{grid: [10, 10]}}
        onResize={this.onResize}>
        <div className="box" style={{width: width + 'px', height: height + 'px'}}>
          <div style={containerStyle}>
            {!reverse && this.renderObverse()}
            {reverse && this.renderReverse()}
            <span style={style.button} onClick={this.handleClick}>
              <i className='fa fa-cog'></i>
            </span>
          </div>
        </div>
      </Resizable>
    );
  }
}
