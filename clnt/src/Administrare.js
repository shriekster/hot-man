import React from 'react';
import Tippy from '@tippyjs/react';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotel: '(empty)',
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

    fetch('http://localhost:3001/main/hotel', requestOptions)
    .then(response => response.json())
    .then(who => {
      console.log(who)
      this.setState({
        hotel: who.hotel,
      });
    });
  }

  render() {
    return (
      <div>
        <div>Administrare</div>
        <hr className='view--separator'/>
      <div>{this.state.hotel}</div>
      </div>
    );
  }
}

export default Administrare;
