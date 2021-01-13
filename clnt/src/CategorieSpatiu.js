import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class CategorieSpatiu extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onInput = this.onInput.bind(this);

    this.onText = this.onText.bind(this);

    this.focus = this.focus.bind(this);

    this.textFocus = this.textFocus.bind(this);

    this.submit = this.submit.bind(this);

    this.onIconMouseOut = this.onIconMouseOut.bind(this);

    this.onSaveMouseOver = this.onSaveMouseOver.bind(this);

    this.onCancelMouseOver = this.onCancelMouseOver.bind(this);

    this.onDeleteMouseOver = this.onDeleteMouseOver.bind(this);

    this.input = React.createRef();
    this.textArea = React.createRef();

    this.state = {
      editingHint: '',
      hintVisible: false,
      hintOffsetY: 0,
    };
  }

  // Cancel editing when the Escape key is pressed
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    // Escape was pressed 
    if (27 === charCode) {
      this.props.cancel(this.props.index);
    }
    /*
    else

    if (e && e.target.value.length > 63) {
      if(charCode !== 8 && charCode !== 9 && 
          charCode !== 17 && charCode !== 46 && charCode !== 13 && 
          !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      } 
    } 
    */

    return true;
  }

  onInput(e) { 
   this.props.input(this.props.index, 'denumire', e.target.value, e.target.selectionStart);
  }

  onText(e) {
    this.props.input(this.props.index, 'detalii', e.target.value, e.target.selectionStart);
  }

  focus(e) {
    this.props.focus(this.props.index, 'input', true, e.target.selectionStart);
  }

  textFocus(e) {
    this.props.focus(this.props.index, 'textarea', true, e.target.selectionStart);
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
    if (this.props.isFresh) {

      this.setState({
        editingHint: 'Salvează',
        hintVisible: true,
        hintOffsetY: -4,
      });

    } else {

      this.setState({
        editingHint: 'Salvează',
        hintVisible: true,
        hintOffsetY: -15,

      });
    }
  }

  onCancelMouseOver() {
    if (this.props.isFresh) {
      
      this.setState({
        editingHint: 'Renunță',
        hintVisible: true,
        hintOffsetY: -4,
      });

    } else {

      this.setState({
        editingHint: 'Renunță',
        hintVisible: true,
        hintOffsetY: -15,
      });

    }
  }

  onDeleteMouseOver() {
    this.setState({
      editingHint: 'Șterge',
      hintVisible: true,
      hintOffsetY: 12,
    });
  }

  componentDidMount() {

    if (this.props.isEditing) {
      
      if (this.props.inputIsFocused) {
        this.input.current.focus();
        this.input.current.selectionStart = this.props.inputCaretPosition;
        this.input.current.selectionEnd = this.props.inputCaretPosition;
      }

      else

      if (this.props.textareaIsFocused) {
        this.textArea.current.focus();
        this.textArea.current.selectionStart = this.props.textareaCaretPosition;
        this.textArea.current.selectionEnd = this.props.textareaCaretPosition;
      }

    }
  }

  componentDidUpdate (prevProps, prevState) {  
  }

  render() {
    return (
    <>
    <div className='--spatiu-item'>
      <div className='--spatiu-inner'>
      <form className='--spatiu-form'
        onSubmit={this.submit}>
        <div className='--spatiu-denumire'>
          <span>
            Denumire
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
          offset={[0, 10]}
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
            offset={[0, 10]}
            visible={this.props.showError}>
            <input
              maxLength={64}
              disabled={!this.props.isEditing}
              type='text'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              className='--denumire-text'
              onInput={this.onInput}
              onKeyDown={this.onKeyDown}
              value={this.props.value}
              onClick={this.focus}
              ref={this.input}>
            </input>
          </Tippy>
        </Tippy>
        </div>

        <div className='--spatiu-detalii'>
          <span>
            Detalii
          </span>
          <textarea
            maxLength={256}
            disabled={!this.props.isEditing}
            className='--detalii-text'
            autoComplete='off'
            spellCheck={false}
            className='--detalii-text'
            onInput={this.onText}
            onKeyDown={this.onKeyDown}
            value={this.props.details}
            onClick={this.textFocus}
            ref={this.textArea}>
          </textarea>
      </div>
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
            offset={[this.state.hintOffsetY, 5]}
            visible={this.state.hintVisible}>
          <div className='--icons-editing'>
            <div className='--save-and-cancel'>
              <i className='fas fa-save -save-icon'
                onMouseOver={this.onSaveMouseOver}
                onMouseOut={this.onIconMouseOut}
                onClick={() => {this.props.save(this.props.index)}}></i>
              <i className='fas fa-window-close -cancel-icon'
                onMouseOver={this.onCancelMouseOver}
                onMouseOut={this.onIconMouseOut}
                onClick={() => this.props.cancel(this.props.index)}></i>
            </div>
            {
              !this.props.isFresh &&
              <div className='--delete'>
                <i className='fas fa-trash-alt -delete-icon'
                  onMouseOver={this.onDeleteMouseOver}
                  onMouseOut={this.onIconMouseOut}
                  onClick={() => this.props.delete(this.props.index)}></i>
              </div>
            }

          </div>
        </Tippy>
                            :
        <div className='--icons-editing'>
          <i className='fas fa-edit -edit-icon'
            onClick={() => { this.props.edit(this.props.index) }}></i>
        </div>
      }
      </div>
      <Spinner
        status='loading'
        visibility={this.props.isFetching}/>
    </div>

    </>
    );
  }
}

export default CategorieSpatiu;
