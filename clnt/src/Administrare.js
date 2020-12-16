import React from 'react';
import Tippy from '@tippyjs/react';

import HotelCreator from './HotelCreator';
import HotelUpdater from './HotelUpdater';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: ''
    };
  } 

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token
      })
    };

    fetch('http://localhost:3001/main/administrare', requestOptions)
    .then(response => response.json())
    .then(who => {
      this.setState({
        hotel: who.hotel,
      });
    });
  }

  render() {
    return (
      <div>
        <div id='administrare-title'
          className='administrare-title'>
          Administrarea hotelului
        </div>
        <hr className='view--separator'/>
        <div id='view-administrare'
          className='view-administrare'>
          {
            this.state.hotel.nume  ?
            <HotelCreator
              token={this.props.token} /> :
            <HotelUpdater
              token={this.props.token} />
          }
        </div>
      </div>
    );
  }
}

export default Administrare;
