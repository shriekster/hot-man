import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'

class ConfortUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onInput = this.onInput.bind(this);

    this.enableSave = this.enableSave.bind(this);

    this.disableSave = this.disableSave.bind(this);

    this.focus = this.focus.bind(this);

    this.blur = this.blur.bind(this);

    this.save = this.save.bind(this);

    this.submit = this.submit.bind(this);

    this.input = React.createRef();

    this.state = {
      nextValue: this.props.value,
      saveEnabled: false,

      inputClassName: '--confort-value -inline',

      fetching: false,
    };
  }

  // input max length: 16
  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e && e.target.value.length > 15) {
      if(charCode !== 8 && charCode !== 9 && 
          charCode !== 17 && charCode !== 46 && charCode !== 13 && 
          !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      } 
    } 
    return true;
  }

  onInput(e) {
    if (e && e.target) {
      this.setState({
        nextValue: e.target.value,
      });
    }
  }

  enableSave() {
    if (!this.state.saveEnabled) {
      this.setState({
        saveEnabled: true,
      });
    }
  }

  disableSave() {
    if (this.state.saveEnabled) {
      this.setState({
        saveEnabled: false,
      });
    }
  }

  focus() {
    this.setState({
      inputClassName: '--confort-value -inline --value-editing',
    });
  }

  blur() {
    if (this.state.nextValue){

      this.setState({
        inputClassName: '--confort-value -inline'
      });
    } else {

      this.setState({
        nextValue: this.props.value,
        inputClassName: '--confort-value -inline'
      });
    }
  }

  submit(e) {
    e.preventDefault();
    this.save(this.state.nextValue);
  }

  save(value) {
    if (this.state.saveEnabled) {
      this.setState({
        fetching: true,
      },
      () => {
        this.props.saveItem(value);
      });
  }
  }

  componentDidMount() {
    if (this.props.focus) {
      this.input.current.focus();
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.nextValue !== this.state.nextValue) {
      this.setState({
        fetching: false,
      });
    }
  }

  render() {
    return (
    <>
    <div className='--confort-item'>
      <form className='--confort-form'
        onSubmit={this.submit}>
        <span>
          Confort
        </span>
        <input
          type='text'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          className={this.state.inputClassName}
          onInput={this.onInput}
          onKeyDown={this.onGenericKeyDown}
          value={this.state.nextValue}
          onMouseEnter={this.enableSave}
          onFocus={this.focus}
          onMouseLeave={this.disableSave}
          onBlur={this.blur}
          ref={this.input}>
        </input>
        <div>
            <i className='fas fa-save --save-icon'
              onClick={() => {this.save(this.state.nextValue)}}></i>
        </div>
      </form>
      <i className='fas fa-trash-alt --delete-icon'></i>
      <Spinner
        className='--confort-loading'
        width='50px'
        height='50px'
        status='altLoading'
        visibility={this.state.fetching}/>
    </div>

    </>
    );
  }
}

export default ConfortUpdater;
