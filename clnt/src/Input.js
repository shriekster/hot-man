import React from 'react';


class Input extends React.Component {
  constructor(props) {
    super(props);
    
    this.onChange = this.onChange.bind(this);
    this.onInvalid = this.onInvalid.bind(this);

    this.state = {
      backgroundColor: 'whitesmoke'
    }
  }

  onChange() {
    this.setState({
      backgroundColor: 'whitesmoke'
    })
  }

  onInvalid() {
    this.setState({
      backgroundColor: '#D72C25'
    })
  }

  onVisibilityChange() {
    this.props.onVisibilityChange();
  }

  render() {
    console.log(this.props.className)
    return (
      <input
      className={this.props.className}
      style={{backgroundColor: this.state.backgroundColor}}
      type={this.props.type} 
      name={this.props.name}
      placeholder={this.props.placeholder}
      required={this.props.required || true} 
      onChange={this.onChange}
      onInvalid={this.onInvalid}
    />
    );
  }
}

export default Input;
