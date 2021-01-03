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
    this.setState({
      saveEnabled: true,
      inputClassName: '--confort-value -inline --value-editing'
    });
  }

  disableSave() {
    if (this.state.nextValue){

      this.setState({
        saveEnabled: false,
        inputClassName: '--confort-value -inline'
      });
    } else {

      this.setState({
        nextValue: this.props.value,
        saveEnabled: false,
        inputClassName: '--confort-value -inline'
      });
    }
  }

  submit(e) {
    e.preventDefault();
    this.save(this.state.nextValue);
  }

  save(value) {
    this.setState({
      fetching: true,
    },
    () => {
      this.props.saveItem(value);
    });
  }

  componentDidMount() {
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
        <Tippy
          content={
            <div>
              <i className='fas fa-save --save-icon'
                onClick={() => {this.save(this.state.nextValue)}}></i>
            </div>
          }
          allowHTML={true}
          interactive={true}
          interactiveBorder={10}
          visible={this.state.saveEnabled}
          placement='right'
          arrow={false}
          theme='material-confort'
          offset={[0, 20]}>
          <input
            type='text'
            autoComplete='off'
            autoCorrect='off'
            spellCheck={false}
            className={this.state.inputClassName}
            onInput={this.onInput}
            onKeyDown={this.onGenericKeyDown}
            value={this.state.nextValue}
            onFocus={this.enableSave}
            onBlur={this.disableSave}
            ref={this.input}>
          </input>
        </Tippy>
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
