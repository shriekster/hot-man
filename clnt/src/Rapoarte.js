import React from 'react';
import Tippy from '@tippyjs/react';

import HotelCreator from './HotelCreator';
import HotelUpdater from './HotelUpdater';
import RapoarteOverview from './RapoarteOverview';

class Rapoarte extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  } 

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div id='rapoarte-title'
          className='rapoarte-title'>
          Rapoarte
        </div>
        <hr className='view--separator'/>
        <div id='view-rapoarte'
          className='view-rapoarte'>
          <RapoarteOverview
            token={this.props.token}
            hotel={this.props.hotel}
            user={this.props.user}
            onChange={this.props.onChange} /> 
        </div>
      </div>
    );
  }
}

export default Rapoarte;
