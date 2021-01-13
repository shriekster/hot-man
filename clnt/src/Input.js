import React from 'react';


class Input extends React.Component {
  constructor(props) {
    super(props);

    //this.state = {}
  }

  render() {
    return (
      <input
        maxLength={this.props.maxLength || 512}
        tabIndex={this.props.tabIndex || '0'}
        onKeyDown={this.props.onKeyDown}
        list={this.props.list}
        className={this.props.className}
        type={this.props.type} 
        name={this.props.name}
        id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onInput={this.props.onInput}
        autoFocus={this.props.autoFocus}/>
    );
  }
}

export default Input;
