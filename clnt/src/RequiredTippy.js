import React from 'react';
import Tippy from '@tippyjs/react';

class RequiredTippy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tippyContent: 'Câmp obligatoriu',
      spanContent: ' *'
    }
  }

  render() {
    return (
      <Tippy
        className='my-tippy' 
        content={this.props.content || this.state.tippyContent}
        theme='red-material-light'
        hideOnClick={false}
        placement='right-end'>
        <span className='red bold'>{this.state.spanContent}</span>
      </Tippy> 
    );
  }
}

export default RequiredTippy;
