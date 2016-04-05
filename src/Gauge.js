import React, {Component, PropTypes} from 'react';
import Sparkline from 'react-sparkline';
require('font-awesome-webpack');

export default class Gauge extends Component {
  static propTypes = {
    label: PropTypes.string.required,
    value: PropTypes.number.required,
    units: PropTypes.string,
    topLabel: PropTypes.bool
  };

  static style = {
    container: {
      position: 'relative',
      minWidth: 100,
      maxWidth: 200,
      minHeight: 100,
      border: '1px solid black',
      borderRadius: 4,
      boxShadow: '2px 2px 3px #383838',
      padding: '5px 5px',
      margin: 0,
      backgroundColor: '#484848',
      color: '#eee',
      textAlign: 'center',
      lineHeight: 1,
      fontFamily: 'sans-serif'
    },
    value: {
      fontSize: '3em',
      margin: 0,
      overflow: 'hidden'
    },
    units: {
      textAlign: 'right',
      marginTop: -5
    },
    label: {
      fontSize: '1.75em',
      width: '100%',
      maxWidth: 200,
      textAlign: 'center',
      marginTop: 15
    },
    button: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      cursor: 'pointer'
    }
  };

  constructor(props) {
    super(props);
    this.state = {reverse: false, showTrendline: true};
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

  handleClick() {
    if(this.state && this.state.reverse) {
      this.setState({reverse: false});
    } else {
      this.setState({reverse: true});
    }
  }

  setShowTrendline() {
    this.setState({showTrendline:!this.state.showTrendline});
  }

  renderSparkline() {
    const {style} = Gauge;
    const {history, showTrendline, width} = this.state;

    if(showTrendline) {
      return <Sparkline strokeColor={style.container.color} height={40}
          width={width - 12} data={history} />
    } else {
      return null;
    }
  }

  renderObverse() {
    const {label, value, units} = this.props;
    const {style} = Gauge;

    return (
      <div>
        <h1 style={style.value}>{value.toFixed(2)}</h1>
        <div style={style.units}>{units}</div>
        {this.renderSparkline()}
        <div style={style.label}>{label}</div>
      </div>
    );
  }

  renderReverse() {
    const {style} = Gauge;
    const {showTrendline} = this.state;

    return (
      <div>
        <h1 style={style.label}>Settings</h1>
        <label for='cbx'><input type='checkbox' name='cbx' checked={showTrendline} onChange={() => this.setShowTrendline()} /> Show Trendline</label>
      </div>
    );
  }

  render() {
    const {reverse} = this.state;
    const {style} = Gauge;

    return (
      <div style={style.container}>
        {!reverse && this.renderObverse()}
        {reverse && this.renderReverse()}
        <span style={style.button} onClick={()=>this.handleClick()}>
          <i className='fa fa-cog'></i>
        </span>
      </div>
    );
  }
}
