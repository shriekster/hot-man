import React from 'react';
import Tippy from '@tippyjs/react';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Administrarea hotelului',
      hotel: ''
    };
  } 

  componentDidMount() {
    const token = this.props.token;

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token
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
          {this.state.hotel.nume || this.state.title}
        </div>
        <hr className='view--separator'/>
        <div id='view-administrare'
          className='view-administrare'>
          {
            this.state.hotel.nume  ?
            <div id='view-manage-hotel'
              className='view-manage-hotel'>
              DA
            </div>     :
            <div id='view-add-hotel'
              className='view-add-hotel'>
              <div className='view-add-hotel-info regular'>
                Completează informațiile referitoare la hotelul pe care îl administrezi:
              </div>
              <form id='view-add-hotel-form'
                className='view-add-hotel-form'>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
                <input>
                </input>
              </form>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Administrare;
