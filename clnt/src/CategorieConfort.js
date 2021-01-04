import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class ConfortUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onInput = this.onInput.bind(this);

    this.focus = this.focus.bind(this);

    this.blur = this.blur.bind(this);

    this.save = this.save.bind(this);

    this.submit = this.submit.bind(this);

    this.delete = this.delete.bind(this);

    this.enableEditing = this.enableEditing.bind(this);

    this.input = React.createRef();

    this.state = {
      nextValue: this.props.value,

      editing: false || this.props.editing,
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

  focus() {
  }

  blur(e) {
    if (!this.state.nextValue){
      this.setState({
        nextValue: this.props.value,
        editing: false,
      });
    } else {
      this.setState({
        editing: false,
      });
    }

    return false;
  }

  submit(e) {
    e.preventDefault();
    this.save(this.state.nextValue);
  }

  save() {
    console.log('save')
    this.setState({
      editing: false,
      fetching: true,
    },
    () => {
      this.props.saveItem(this.state.nextValue.trim());
    });
  }

  delete(value) {
  }

  enableEditing() {
    this.setState({
      editing: true,
    },
    () => {
      this.input.current.focus();
    });
  }

  componentDidMount() {
    if (this.state.editing) {
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
        <input disabled={!this.state.editing}
          type='text'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          className='--confort-value -inline'
          onInput={this.onInput}
          onKeyDown={this.onGenericKeyDown}
          defaultValue={this.state.nextValue}
          /*onFocus={this.focus}*/
          onBlur={this.blur}
          ref={this.input}>
        </input>
      </form>
      {
        this.state.editing  ?
        <div className='--confort-icons-editing'>
          <i className='fas fa-save --save-icon'
                  onClick={this.save}>
                </i>
          <i className='fas fa-trash-alt --delete-icon'
            onMouseDown={() => this.delete()}></i>
        </div>
                            :
        <div className='--confort-icons'>
          <i className='fas fa-edit --edit-icon'
            onClick={this.enableEditing}></i>
        </div>
      }
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
