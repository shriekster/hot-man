import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class SpatiuCazare extends React.Component {
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
    this.inputN = React.createRef();

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

    // Enter was pressed
    // Why? Because a form won't submit on enter when there are at least 
    // 2 input fields
    if (13 === charCode) {
      this.props.save(this.props.index);
    }

    return true;
  }

  onInput(e) { 
   this.props.input(this.props.index, 'denumire', e.target.value, e.target.selectionStart, e.target.selectionEnd);
  }

  onText(e) {
    this.props.input(this.props.index, 'locuri', e.target.value, e.target.selectionStart, e.target.selectionEnd);
  }

  focus(e) {
    this.props.focus(this.props.index, 'input', true, e.target.selectionStart, e.target.selectionEnd);
  }

  textFocus(e) {
    this.props.focus(this.props.index, 'textarea', true, e.target.selectionStart, e.target.selectionEnd);
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
      
    if (this.props.inputIsFocused) {
      this.input.current.focus();
      this.input.current.selectionStart = this.props.inputCaretPosition;
      this.input.current.selectionEnd = this.props.inputCaretPositionEnd;//??
    }

    else

    if (this.props.textareaIsFocused) {
      this.inputN.current.focus();
      this.inputN.current.selectionStart = this.props.textareaCaretPosition;
      this.inputN.current.selectionEnd = this.props.textareaCaretPositionEnd;//??
    }

  }

  componentDidUpdate (prevProps, prevState) {  
  }

  render() {
    return (
    <>
    <div className='--pat-item'>
      <div className='--spatiu-inner'>
      {
        this.props.isChecked      ?
        <div className='--icons-editing'>
          <i className='far fa-check-square -check-icon'
            onClick={() => { this.props.toggleChecked(this.props.index) }}></i>
        </div>
                                  :
        <div className='--icons-editing'>
          <i className='far fa-square -check-icon'
            onClick={() => { this.props.toggleChecked(this.props.index) }}></i>
        </div>
      }
      <form
        id='--pat-form' 
        className='--pat-form'
        onSubmit={this.submit}>
        <div className='--pat-field'>
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
          offset={[0, 140]}
          visible={this.props.showNameWarning}>
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
            visible={this.props.showNameError}>
            <input
              maxLength={64}
              type='text'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              className='--pat-text'
              onInput={this.onInput}
              onKeyDown={this.onKeyDown}
              value={this.props.etaj}
              onClick={this.focus}
              ref={this.input}>
            </input>
          </Tippy>
        </Tippy>
        </div>

        <div className='--pat-field'>
          <span>
            Număr de locuri
          </span>
          <Tippy
            content={
              <>
                <span><i className='fas fa-exclamation-circle'></i> Introdu numărul de locuri</span>
              </>
            }
            allowHTML={true}
            placement='right'
            arrow={false}
            theme='red-material-warning'
            offset={[0, 140]}
            visible={this.props.showNumberWarning}>
            <Tippy
              content={
                <>
                  <span><i className='fas fa-minus-circle'></i> Număr invalid</span>
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              offset={[0, 140]}
              visible={this.props.showNumberError}>
              <input
                maxLength={10}
                type='text'
                className='--pat-text'
                autoComplete='off'
                spellCheck={false}
                onInput={this.onText}
                onKeyDown={this.onKeyDown}
                value={this.props.numar}
                onClick={this.textFocus}
                ref={this.inputN}>
              </input>
            </Tippy>
          </Tippy>
        </div>
      </form>

      </div>
      <Spinner
        status='loading'
        visibility={this.props.isFetching}/>
    </div>

    </>
    );
  }
}

export default SpatiuCazare;
