import React from 'react';


class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);

    this.timerID = 0;

    this.state = {
      start: 'fas fa-hourglass-start',
      half: 'fas fa-hourglass-half',
      end: 'fas fa-hourglass-end',

      seconds: 'seconds',
      secondsFill: 'seconds-fill'
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
    let timeout = this.props.timeout;

    /** Minutes and seconds */
    let mins = `0${Math.floor(timeout / 60)}`;
    let secs = timeout % 60 < 10 ? `0${timeout % 60}` : timeout % 60;

    /** Hourglass */
    let hourglass;
    let seconds = this.state.seconds;
    let secondsFill = this.state.secondsFill;
    
    if (timeout > 65) {
      hourglass = this.state.start;
    } else
    if (10 < timeout && timeout <= 65) {
      hourglass = this.state.half;
    } else {
      hourglass = this.state.end + ' warned';
    }

    let percent = Math.fround(((120 - timeout) / 120) * 100);

    return (
      <span className='countdown bold'>
          <span><i className={hourglass +' stopwatch red'}></i></span> 
          <span className={seconds}>
            {`${mins}:${secs}`}
            <span className={secondsFill}
              style={{width: `${percent}%`}}>{`${mins}:${secs}`}</span>
          </span>
          
      </span>
    );
  }
}

export default Countdown;
