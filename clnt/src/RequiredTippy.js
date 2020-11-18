import React from 'react';
import Tippy from '@tippyjs/react';

class RequiredTippy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tippyContent: 'Obligatoriu',
      spanContent: ' *'
    }
  }

  render() {
    return (
      <Tippy
        className='my-tippy' 
        content={this.state.tippyContent}
        theme='red-material-light'
        hideOnClick={false}
        placement='right'>
        <span className='red bold'>{this.state.spanContent}</span>
      </Tippy> 
    );
  }
}

export default RequiredTippy;
