import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class CategorieConfort extends React.Component {
  constructor(props) {
    super(props);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onInput = this.onInput.bind(this);

    this.focus = this.focus.bind(this);

    this.blur = this.blur.bind(this);

    this.submit = this.submit.bind(this);

    this.onIconMouseOut = this.onIconMouseOut.bind(this);

    this.onSaveMouseOver = this.onSaveMouseOver.bind(this);

    this.onCancelMouseOver = this.onCancelMouseOver.bind(this);

    this.onDeleteMouseOver = this.onDeleteMouseOver.bind(this);

    this.input = React.createRef();

    this.state = {
      nextValue: this.props.value,

      hasFocus: false,

      editingHint: '',
      hintVisible: false,
      hintOffsetY: 0,
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
      }, 
      () => {
        this.props.input(this.props.value, this.state.nextValue);
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
    this.props.save(this.props.isFresh, this.props.value, this.state.nextValue);
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
    if (this.props.isEditing) {
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
        <Tippy
          content={
            <>
              <span><i className='fas fa-exclamation-circle'></i> Introdu denumirea categoriei</span>
            </>
          }
          allowHTML={true}
          placement='right'
          arrow={false}
          theme='red-material-warning'
          offset={[0, 140]}
          visible={this.props.showWarning}>
          <Tippy
            content={
              <>
                <span><i className='fas fa-minus-circle'></i> Denumire invalidă</span>
              </>
            }
            allowHTML={true}
            placement='right'
            arrow={false}
            theme='red-material-warning'
            offset={[0, 140]}
            visible={this.props.showError}>
            <input disabled={!this.props.isEditing}
              type='text'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              className='--confort-value -inline'
              onInput={this.onInput}
              onKeyDown={this.onGenericKeyDown}
              //value={this.state.nextValue}
              defaultValue={this.state.nextValue}
              onFocus={this.focus}
              onBlur={this.blur}
              ref={this.input}>
            </input>
          </Tippy>
        </Tippy>
      </form>
      {
        this.props.isEditing  ?
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
            offset={[this.state.hintOffsetY, 55]}
            visible={this.state.hintVisible}>
          <div className='--confort-icons-editing'>
            <i className='fas fa-save --save-icon'
              onMouseOver={this.onSaveMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={() => {this.props.save(this.props.isFresh, this.props.value, this.state.nextValue)}}></i>
            {
              !this.props.isFresh &&
            <i className='fas fa-trash-alt --delete-icon'
              onMouseOver={this.onDeleteMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={() => this.props.delete(this.props.value)}></i>
            }
            <i className='fas fa-window-close --cancel-icon'
              onMouseOver={this.onCancelMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={() => this.props.cancel(this.props.value)}></i>
          </div>
        </Tippy>
                            :
        <div className='--confort-icons'>
          <i className='fas fa-edit --edit-icon'
            onClick={() => { this.props.edit(this.props.value) }}></i>
        </div>
      }
      <Spinner
        className='--confort-loading'
        width='50px'
        height='50px'
        status='altLoading'
        visibility={this.props.isFetching}/>
    </div>

    </>
    );
  }
}

export default CategorieConfort;
