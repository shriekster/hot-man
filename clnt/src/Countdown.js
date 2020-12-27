import React from 'react';


class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);

    this.timerID = 0;

    this.state = {
      //
    }
  }

  tick() {
    if (this.props.timeout > 0) {
      this.props.updateTimeout(this.props.timeout - 1);
    }
  }

  componentDidMount() {
    if(!this.timerID) {
      this.timerID = setInterval(() => 
        this.tick(), 
        1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <span className='countdown bold'>
          <span><i className='fas fa-stopwatch stopwatch red'></i></span> 
          <span className='seconds red'>{this.props.timeout}</span>
          
      </span>
    );
  }
}

export default Countdown;
