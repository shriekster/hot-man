import React from 'react';
import loadingAlt from './images/hotel-icon.png'

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.onStatusChange = this.onStatusChange.bind(this);

    this.state = {
      classNames: {
        loading: 'pulse loading',
        altLoading: 'rotate altLoading',
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
      <div 
        style={{
          visibility: this.props.visibility
                      ? 'visible' : 'hidden'
        }}
        className={'' || this.props.className}>
        <img 
          className={currentClass} 
          src={loadingAlt}
          width={this.props.width}
          height={this.props.height} />
      </div>
    );
  }
}

export default Spinner;
