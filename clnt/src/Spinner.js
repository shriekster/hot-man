import React from 'react';
import loadingAlt from './images/hotel-icon.png'
import spinner from './images/loading.svg';
import searcher from './images/searching.svg'

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    this.onStatusChange = this.onStatusChange.bind(this);

    this.state = {
      classNames: {
        loading: '-spinner-loading',
        searching: '-spinner-searching',
        done: '-spinner-done'
      },

      currentClass: 'pulse loading' //misleading
    };
  }

  
  onStatusChange(status) {
    this.props.onStatusChange(status); //TODO: implement in higher component
  }


  render() {
    let status = this.props.status;
    let currentClass = this.state.classNames[status];
    let src;

    if (currentClass === '-spinner-loading') {
      src = spinner;
    }

    else 

    if (currentClass === '-spinner-searching') {
      src = searcher;
    }

    return (
      <div className='-spinner-container'
        style={{
          visibility: this.props.visibility
                      ? 'visible' : 'hidden'
        }}>

        <img 
        className={currentClass + ' ' + this.props.className} 
        src={src}/>
        
      </div>
    );
  }
}

export default Spinner;
