import React from 'react';


class Input extends React.Component {
  constructor(props) {
    super(props);
    
    //this.onInput = this.onInput.bind(this);
    //this.onInvalid = this.onInvalid.bind(this);

    //this.state = {}
  }
/*
  onInput(e) {
    e.target.setCustomValidity('TEST');

  }

  onInvalid(e) {
    e.target.setCustomValidity('TEST');
  }
*/

  render() {
    return (
      <input
        className={this.props.className}
        type={this.props.type} 
        name={this.props.name}
        id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onInput={this.props.onInput}
        //onInvalid={this.onInvalid}
      />
    );
  }
}

export default Input;
