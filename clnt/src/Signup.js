import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Input from './Input';
import Spinner from './Spinner';
import PasswordInput from './PasswordInput';
import RequiredTippy from './RequiredTippy';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.state = {
      loc: '',
      grad: '',
      nume: '',
      prenume: '',
      user: '',
      pass: '',
      showLocError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUserError: false,
      showPassError: false,
      showLocWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showPassInfo: true,

      grade: [
        {value: 'P.c.c.', label: 'Personal civil contractual'},
        {value: 'F.p.', label: 'Funcționar public'},
        {value: 'Sold.', label: 'Soldat'},
        {value: 'Frt.', label: 'Fruntaș'},
        {value: 'Cap.III', label: 'Caporal clasa a III-a'},
        {value: 'Cap.II', label: 'Caporal clasa a II-a'},
        {value: 'Cap.I', label: 'Caporal clasa I'},
        {value: 'Sg.', label: 'Sergent'},
        {value: 'Sg.maj.', label: 'Sergent major'},
        {value: 'Plt.', label: 'Plutonier'},
        {value: 'Plt.maj.', label: 'Plutonier major'},
        {value: 'Plt.adj.', label: 'Plutonier adjutant'},
        {value: 'Plt.adj.pr.', label: 'Plutonier adjutant principal'},
        {value: 'M.m.V', label: 'Maistru militar clasa a V-a'},
        {value: 'M.m.IV', label: 'Maistru militar clasa a IV-a'},
        {value: 'M.m.III', label: 'Maistru militar clasa a III-a'},
        {value: 'M.m.II', label: 'Maistru militar clasa a II-a'},
        {value: 'M.m.I', label: 'Maistru militar clasa I'},
        {value: 'M.m.p.', label: 'Maistru militar principal'},
        {value: 'Slt.', label: 'Sublocotenent'},
        {value: 'Asp.', label: 'Aspirant'},
        {value: 'Lt.', label: 'Locotenent'},
        {value: 'Cpt.', label: 'Căpitan'},
        {value: 'Mr.', label: 'Maior'},
        {value: 'Lt.cdor.', label: 'Locotenent-comandor'},
        {value: 'Lt.col.', label: 'Locotenent-colonel'},
        {value: 'Cpt.cdor.', label: 'Căpitan-comandor'},
        {value: 'Col.', label: 'Colonel'},
        {value: 'Cdor.', label: 'Comandor'},
      ],
      fetching: false,
      showError: false,
      toLogin: false,
    };
  }

  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 &&
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e.target.value.length > 13) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 &&
        !(charCode >= 37 && charCode <= 40))  {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  // input max length: 64
  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e.target.value.length > 63) {
      if(charCode !== 8 && charCode !== 9 && 
         charCode !== 17 && charCode !== 46 && charCode !== 13 &&
         !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  /**
   * 
   * @param e event object 
   * @param optional an object which stores the virtual ID and the value of the 'event' generator
   */
  onInput(e, optional) {

    this.setState({
      showLocError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUserError: false,
      showPassError: false,
      showLocWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showPassInfo: true,
      showError: false,
    });

    if (optional && optional !== undefined) {
      if (optional.id === 'grad' && optional.action === 'select-option') {
        this.setState({
          grad: optional.value.trim()
        });
      }
    }

    if (e != null){
      switch(e.target.id) {
        case 'loc': {
          if (e.target.value.length > 13) {
            e.preventDefault();
          }
          else {
            this.setState({
              loc: e.target.value.trim()
            });
          }
          break;
        }

        case 'grad': {
          //this.setState({
          //  grad: e.target.value.trim()
          //});
          break;
        }

        case 'nume': {
          this.setState({
            nume: e.target.value.trim()
          });
          break;
        }

        case 'prenume': {
          this.setState({
            prenume: e.target.value.trim()
          });
          break;
        }

        case 'user': {
          this.setState({
            user: e.target.value.trim()
          });
          break;
        }

        case 'pass': {
          this.setState({
            pass: e.target.value.trim()
          });
          break;
        }
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
 
    let loc = this.state.loc;
    let grad = this.state.grad;
    let nume = this.state.nume;
    let prenume = this.state.prenume;
    let user = this.state.user;
    let pass = this.state.pass;

    let valid = (loc !== '' && 
                 grad !== '' &&
                 nume !== '' &&
                 prenume !== '' &&
                 user !== '' &&
                 pass !== '');

    if (valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loc: loc,
          grad: grad,
          nume: nume,
          prenume: prenume,
          user: user,
          pass: pass
        })
      };

      this.setState({fetching: true}, () => {
        fetch('http://localhost:3001/signup', requestOptions)
        .then(response => response.json())
        .then(signup => {
          let signedUp = false;

          this.setState({
            fetching: false
          });
          
          if (signup && undefined !== signup) {
            signedUp = true;

            if (false === signup.grad) {
              signedUp = false;
              this.setState({
                showError: true, /* improbable, but not impossible */ 
              });
            } else { /*  */

              if (false === signup.loc) {
                signedUp = false;
                this.setState({
                  showLocError: true,
                });
              }

              if (false === signup.nume) {
                signedUp = false;
                this.setState({
                  showNumeError: true,
                });
              }

              if (false === signup.prenume) {
                signedUp = false;
                this.setState({
                  showPrenumeError: true,
                });
              }

              if (false === signup.user) {
                signedUp = false;
                this.setState({
                  showUserError: true,
                });
              }

              if (false === signup.pass) {
                signedUp = false;
                this.setState({
                  showPassError: true,
                });
              }
            }
          } else {
            signedUp = false;
            this.setState({
              showError: true,
            });
          }

          if(signedUp) { /* Successfully registered */
            this.setState({
              toLogin: true
            })
          }
        })
        .catch(error => {
          console.log(error); // dev mode only!

          this.setState({
            fetching: false,
            showError: true,
          });
        });
      });

    } else {
      //console.log(window.titlebar)
      if (loc === '') {
        this.setState({
          showLocWarning: true
        });
      }

      if (grad === '') {
        this.setState({
          showGradWarning: true
        });
      }

      if (nume === '') {
        this.setState({
          showNumeWarning: true
        });
      }

      if (prenume === '') {
        this.setState({
          showPrenumeWarning: true
        });
      }

      if (user === '') {
        this.setState({
          showUserWarning: true
        });
      }

      if (pass === '') {
        this.setState({
          showPassWarning: true,
          //showPassInfo: false
        });
      }
    }
  }

  render() {
    return (
      <>
      {
      !this.state.toLogin &&
      <div className='Form'>
        <form 
          onSubmit={this.handleSubmit}
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}>
          <div className='Form-field'>
            <label htmlFor='loc'>
              Locul nașterii
              <RequiredTippy
                content='Câmp obligatoriu - necesar pentru resetarea parolei' />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> Localitate invalidă
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showLocError}>
              <Tippy
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Selectează gradul
                  </>
                }
                offset={[75, 10]}
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showGradWarning}>
                <Tippy
                  content={
                    <>
                      <i className='fas fa-exclamation-circle'></i> Introdu locul nașterii
                    </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  visible={this.state.showLocWarning}>
                  <span className='legacy' tabIndex='0'>
                    <Input
                    tabIndex='1'
                    onKeyDown={this.onGenericKeyDown}
                    className='fixed-height'
                    type='text' 
                    name='loc'
                    id='loc'
                    placeholder='Introdu locul nașterii'
                    onInput={this.onInput}
                    autoFocus={true}/>
                  </span>
                </Tippy>
              </Tippy>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='grad'>
              Grad
              <RequiredTippy />
            </label>
            <div className='Form-name'>
              <Select
                tabIndex='2'
                onInputChange={(inputValue, action) => this.onInput(null, {id: 'grad', value: inputValue, action: action.action})}
                onChange={(inputValue,action) => this.onInput(null, {id: 'grad', value: inputValue.value, action: action.action})}
                maxMenuHeight={100}
                placeholder='Selectează...'
                noOptionsMessage={(msg) => 'Nu există'}
                className='select-container'
                classNamePrefix='select' 
                options={this.state.grade} />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='nume'>
              Nume
              <RequiredTippy />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> Nume invalid
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showNumeError}>
              <Tippy
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu numele
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showNumeWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input 
                  tabIndex='3'
                  onKeyDown={this.onGenericKeyDown}
                  className='fixed-height'
                  type='text' 
                  name='nume'
                  id='nume'
                  placeholder='Introdu numele'
                  onInput={this.onInput}/>
                </span>
              </Tippy>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='prenume'>
              Prenume
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> Prenume invalid
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showPrenumeError}>
              <Tippy
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu prenumele
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showPrenumeWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input 
                  tabIndex='4'
                  onKeyDown={this.onGenericKeyDown}
                  className='fixed-height'
                  type='text' 
                  name='prenume'
                  id='prenume'
                  placeholder='Introdu prenumele'
                  onInput={this.onInput}/>
                </span>
              </Tippy>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
              <RequiredTippy 
                content='Câmp obligatoriu - minim 3 caractere'/> 
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> Utilizator invalid sau indisponibil
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showUserError}>
              <Tippy
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu utilizatorul
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showUserWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input
                  tabIndex='5'
                  onKeyDown={this.onGenericKeyDown}
                  className='fixed-height'
                  type='text' 
                  name='user'
                  id='user'
                  placeholder='Alege un nume de utilizator'
                  onInput={this.onInput}/>
                </span>
              </Tippy>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <PasswordInput
              tabIndex='6'
              onInput={this.onInput}
              onKeyDown={this.onGenericKeyDown}
              visibility='visible' 
              asterisk={true}
              displayWarning={this.state.showPassWarning}
              displayInfo={this.state.showPassInfo}
              displayError={this.state.showPassError}
              eyeOffset={[0 + 25 * this.state.showPassWarning, 20]}
              eyePlacement={this.state.showPassWarning ? 'right-start' : 'right'}
              eyeArrow={true}/>
          </div>
          <div className='Form-field'>
          <Tippy
            allowHTML={true}
            content={
              <>
                <i className='fas fa-times-circle'></i> Eroare! Încearcă din nou.
              </>
            }
            placement='bottom'
            arrow={false}
            theme='red-material-warning'
            visible={this.state.showError}>
            <button>Creează cont</button>
          </Tippy>
          </div>
          <Spinner 
            status='altLoading'
            visibility={this.state.fetching}/>
        </form>
        <div className='Form-field Form-text centered-text'>
              <div>Ai deja un cont? </div>
              <Tippy
                content='Conectează-te'
                placement='right'
                offset={[0, 20]}
                theme='material-login-hints'>
                <div onClick={() => this.props.onChange('Login')} className='Form-hint-login bold glow-blue'>
                  <i className='fas fa-sign-in-alt -user-icon-login'></i>
                </div>
              </Tippy>
        </div>
      </div>
      }
      {
        this.state.toLogin &&
        <div className='Form'>
          <div className='Form-field Form-text centered-text bold staticPulse'>
              Contul tău a fost creat, 
              <span className='blue'> {this.state.user}</span>!
              <div onClick={() => this.props.onChange('Login')} className='Form-hint bold'>
                Conectează-te
              </div>
          </div>
        </div>
      }
      </>
    );
  }
}

export default Signup;
