import React from 'react';
import loading from './images/hotel-loading.svg'

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.onStatusChange = this.onStatusChange.bind(this);

    this.state = {
      classNames: {
        loading: 'pulse loading',
        done: 'rotateOut loading'
      },

      currentClass: 'pulse loading'
    };
  }

  
  onStatusChange(status) {
    this.props.onStatusChange(status); //TODO: implement in higher component
  }


  render() {
    let status = this.props.status;
    let currentClass = this.state.classNames[status];

    return (
      <div className='Form'>
        <img className={currentClass} src={loading} />
      </div>
    );
  }
}

export default Loading;
