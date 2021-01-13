import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class CategorieSpatiu extends React.Component {
  constructor(props) {
    super(props);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onTextKeyDown = this.onTextKeyDown.bind(this);

    this.onInput = this.onInput.bind(this);

    this.onText = this.onText.bind(this);

    this.focus = this.focus.bind(this);

    this.textFocus = this.textFocus.bind(this);

    this.blur = this.blur.bind(this);

    this.textBlur = this.textBlur.bind(this);

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

  // input max length: 64
  onTextKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (27 === charCode) {
      this.cancel();
    }

    else

    if (e && e.target.value.length > 63) {
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
   this.props.input(this.props.index, e.target.value, 'denumire');
  }

  onText(e) {
    this.props.input(this.props.index, e.target.value, 'detalii');
  }

  focus() {
    this.props.focus(this.props.index, 'input', true);
  }

  textFocus() {
    this.props.focus(this.props.index, 'textarea', true);
  }

  blur(e) {
    this.props.focus(this.props.index, 'input', false);
  }

  textBlur(e) {
    this.props.focus(this.props.index, 'textarea', false);
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
    console.log(this.props)
    if (this.props.isEditing) {
      
      if (this.props.inputIsFocused) {
        this.input.current.focus();
        console.log('INPUT FOCUS')
      }

      else

      if (this.props.textareaIsFocused) {
        this.textArea.current.focus();
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
            <input disabled={!this.props.isEditing}
              type='text'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              className='--denumire-text'
              onInput={this.onInput}
              onKeyDown={this.onGenericKeyDown}
              value={this.props.value}
              //defaultValue={this.state.nextValue}
              onFocus={this.focus}
              onBlur={this.blur}
              ref={this.input}>
            </input>
          </Tippy>
        </Tippy>
        </div>

        <div className='--spatiu-detalii'>
          <span>
            Detalii
          </span>
          <textarea disabled={!this.props.isEditing}
            className='--detalii-text'
            autoComplete='off'
            autoCorrect='off'
            spellCheck={false}
            className='--detalii-text'
            onInput={this.onText}
            onKeyDown={this.onTextKeyDown}
            value={this.props.details}
            onFocus={this.textFocus}
            onBlur={this.textBlur}
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
