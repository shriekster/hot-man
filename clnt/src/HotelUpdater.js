import React from 'react';
import Tippy from '@tippyjs/react';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: ''
    };
  } 

  componentDidMount() {
  }

  render() {
    return (
    <div id='view-add-hotel'
      className='view-add-hotel'>
      <div className='view-add-hotel-info regular'>
        Completează datele hotelului pe care îl administrezi:
      </div>
      <form id='view-update-hotel-form'
        className='view-update-hotel-form'>
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
    );
  }
}

export default Administrare;
