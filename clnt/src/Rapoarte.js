import React from 'react';
import Tippy from '@tippyjs/react';

class Rapoarte extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: '',
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
        <div>Rapoarte</div>
        <hr className='view--separator'/>
      </div>
    );
  }
}

export default Rapoarte;
