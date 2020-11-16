import React from 'react';
import Tippy from '@tippyjs/react';

class RequiredTippy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Tippy
        className='my-tippy' 
        content='Obligatoriu'
        theme='red-material-light'
        hideOnClick={false}
        placement='right'>
        <span className='red bold'> *</span>
      </Tippy> 
    );
  }
}

export default RequiredTippy;
