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
      <div>
        <form id='view-create-hotel-form'
          className='view-create-hotel-form'>
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
