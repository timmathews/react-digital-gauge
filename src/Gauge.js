import React, {Component, PropTypes} from 'react';
import Sparkline from 'react-sparkline';

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
    this.state = {reverse: false};
    this.mounted = false;
  }

  componentDidMount() {
    this.setState({width: React.findDOMNode(this).offsetWidth});
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    let history = this.state.history || [];

    if(history.length > 100) history.shift();

    history.push(nextProps.value);

    this.setState({history:history});
  }

  handleClick() {
    if(this.state && this.state.reverse) {
      this.setState({reverse: false});
    } else {
      this.setState({reverse: true});
    }
  }

  renderObverse() {
    const {label, value, units} = this.props;
    const {style} = Gauge;

    var width = this.state.width - 12;

    if(this.mounted) {
      width = React.findDOMNode(this).offsetWidth;
    }

    return (
      <div>
        <h1 style={style.value}>{value.toFixed(2)}</h1>
        <div style={style.units}>{units}</div>
        <Sparkline strokeColor={style.container.color} height={40}
          width={width} data={this.state.history} />
        <div style={style.label}>{label}</div>
      </div>
    );
  }

  renderReverse() {
    return <h1>Reverse</h1>;
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
