import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class CategorieConfort extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

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
      hasFocus: false,

      editingHint: '',
      hintVisible: false,
      hintOffsetY: 0,
    };
  }

  // Cancel editing when the Escape key is pressed
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    // Escape key was pressed
    if (27 === charCode) {
      this.props.cancel(this.props.index);
    }

    return true;
  }

  onInput(e) {
   this.props.input(this.props.index, e.target.value, e.target.selectionStart); //??
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
    this.props.save(this.props.index);
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
      this.input.current.selectionStart = this.props.caretPosition; //??
      this.input.current.selectionEnd = this.props.caretPosition; //??
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
            <input
              maxLength={16}
              disabled={!this.props.isEditing}
              type='text'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              className='--confort-value -inline'
              onInput={this.onInput}
              onKeyDown={this.onKeyDown}
              value={this.props.value}
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
              onClick={() => {this.props.save(this.props.index)}}></i>
            {
              !this.props.isFresh &&
            <i className='fas fa-trash-alt --delete-icon'
              onMouseOver={this.onDeleteMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={() => this.props.delete(this.props.index)}></i>
            }
            <i className='fas fa-window-close --cancel-icon'
              onMouseOver={this.onCancelMouseOver}
              onMouseOut={this.onIconMouseOut}
              onClick={() => this.props.cancel(this.props.index)}></i>
          </div>
        </Tippy>
                            :
        <div className='--confort-icons'>
          <i className='fas fa-edit --edit-icon'
            onClick={() => { this.props.edit(this.props.index) }}></i>
        </div>
      }
      <Spinner
        className='--confort-loading'
        status='loading'
        visibility={this.props.isFetching}/>
    </div>

    </>
    );
  }
}

export default CategorieConfort;
