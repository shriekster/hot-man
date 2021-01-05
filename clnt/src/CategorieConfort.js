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

    this.cancel = this.cancel.bind(this);

    this.enableEditing = this.enableEditing.bind(this);

    this.onIconMouseOut = this.onIconMouseOut.bind(this);

    this.onSaveMouseOver = this.onSaveMouseOver.bind(this);

    this.onCancelMouseOver = this.onCancelMouseOver.bind(this);

    this.onDeleteMouseOver = this.onDeleteMouseOver.bind(this);

    this.input = React.createRef();

    this.state = {
      nextValue: this.props.value,

      hasFocus: false,

      placeholder: '',

      showError: false,

      editingHint: '(neutru)',
      hintVisible: false,
      hintOffsetY: 0,

      editing: false || this.props.editing,
      fetching: false,
    };
  }

  // input max length: 16
  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (27 === charCode) {
      this.cancel();
    }

    else

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
        showError: false,
        placeholder: '',
      });
    }
  }

  focus() {
    this.setState({
      hasFocus: true,
    });
  }

  blur(e) {
    this.setState({
      hasFocus: false,
    });
  }

  submit(e) {
    e.preventDefault();
    this.save(this.state.nextValue);
  }

  save() {
    if (this.state.nextValue) {
      this.setState({
        fetching: true,

        editing: false,
      },
      () => {
        this.props.saveItem(this.state.nextValue.trim());
      });
    } else {
      this.setState({
        showError: true,
        placeholder: 'Introdu o valoare',
      }, 
      () => {
        this.input.current.focus();
      });
    }
  }

  delete(value) {
  }

  cancel() {
    if (!this.props.fresh) {
      this.setState({
        nextValue: this.props.value,
        editing: false,
      });
    } else {
      this.props.cancel();
    }
  }

  enableEditing() {
    this.setState({
      editing: true,
    },
    () => {
      this.input.current.focus();
    });
  }

  onIconMouseOut() {
    this.setState({
      hintVisible: false,
    })
  }

  onSaveMouseOver() {
    this.setState({
      editingHint: 'Salvează',
      hintVisible: true,
      hintOffsetY: -12,
    });
  }

  onCancelMouseOver() {
    this.setState({
      editingHint: 'Renunță',
      hintVisible: true,
      hintOffsetY: -12,
    });
  }

  onDeleteMouseOver() {
    this.setState({
      editingHint: 'Șterge',
      hintVisible: true,
      hintOffsetY: 15,
    });
  }

  componentDidMount() {
    if (this.state.editing) {
      this.input.current.focus();
    }
  }

  componentDidUpdate (prevProps, prevState) {  
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
          value={this.state.nextValue}
          onFocus={this.focus}
          onBlur={this.blur}
          placeholder={this.state.placeholder}
          ref={this.input}>
        </input>
      </form>
      {
        this.state.editing  ?
        <Tippy
            content={
              <div className='--editing-hint'>
                <i className='fas fa-caret-left --hint-caret' ></i>
                <span> {this.state.editingHint}</span>
              </div>
            }
            allowHTML={true}
            placement='right'
            arrow={false}
            theme='material-confort'
            offset={[this.state.hintOffsetY, 65]}
            visible={this.state.hintVisible}>
          <div className='--confort-icons-editing'>
            <i className='fas fa-save --save-icon'
              onMouseOver={this.onSaveMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={this.save}></i>
            {
              !this.props.fresh &&
            <i className='fas fa-trash-alt --delete-icon'
              onMouseOver={this.onDeleteMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={this.delete}></i>
            }
            <i className='fas fa-window-close --cancel-icon'
              onMouseOver={this.onCancelMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={this.cancel}></i>
          </div>
        </Tippy>
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
