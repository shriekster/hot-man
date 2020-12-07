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
      cnp: '',
      grad: '',
      nume: '',
      prenume: '',
      user: '',
      pass: '',
      rol: '0',
      showCnpError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUserError: false,
      showPassError: false,
      showCnpWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showRolWarning: false,
      showPassInfo: true,
      roluri: [
        {value: 'operator', label: <span><i className='fas fa-user-cog'></i> Operator</span>},
        {value: 'manager', label: <span><i className='fas fa-user-plus'></i> Manager</span>},
      ],
      rolInfo: {
        '0': {
          innerHTML: <div><i className='fas fa-info-circle'></i> Selectează rolul</div>
        },
        operator: {
          innerHTML: 
          <div>
            <div>Operatorul este persoana cu drepturi de administrare a hotelului.</div>
            <div>Acesta poate să:
              <ul>
                <li>&#x02713; adauge hoteluri (în aplicație)</li>
                <li>&#x02713; adauge și să șteargă spații de cazare</li>
                <li>&#x02713; adauge și să șteargă categorii de confort, de paturi, de spații de cazare și altele</li>
                <li>&#x02713; adauge turiști și să rezerve camere</li>
                <li>&#x02713; efectueze operațiunile de plată (în numerar)</li>
                <li>&#x02713; își administreze propriul cont (datele personale)</li>
              </ul>
            </div>
          </div>
        },
        manager: {
          innerHTML: 
          <div>
            <div>Managerul este persoana cu drepturi de administrare a hotelului și a personalului acestuia.</div>
            <div>Acesta poate, în plus față de un operator, să:
              <ul>
                <li>&#x02713; administreze conturile operatorilor (dezactivarea contului sau promovarea în rolul de manager)</li>
              </ul>
            </div>
          </div>
        }
      },
      rolIndex: '0',
      rolOffsetX: 0,
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
        charCode !== 17 && charCode !== 46 && 
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e.target.value.length > 12) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && 
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

    if (e.target.value.length > 64) {
      if(charCode !== 8 && charCode !== 9 && 
         charCode !== 17 && charCode !== 46 && 
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
      showCnpError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUserError: false,
      showPassError: false,
      showCnpWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showRolWarning: false,
      showRolInfo: false,
      showPassInfo: true,
      rolOffsetX: 0,
      showError: false,
    });

    if (optional && optional !== undefined) {
      if (optional.id === 'grad' && optional.action === 'select-option') {
        this.setState({
          grad: optional.value.trim()
        });
      }
      else
      if (optional.id === 'rol' && optional.action === 'select-option') {
        this.setState({
          rol: optional.value.trim(),
          rolIndex: optional.value.trim(),
        });
      }
    }

    if (e != null){
      switch(e.target.id) {
        case 'cnp': {
          if (e.target.value.length > 13) {
            e.preventDefault();
          }
          else {
            this.setState({
              cnp: e.target.value.trim()
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

        case 'rol': {
          //this.setState({
          //  rol: e.target.value,
          //  rolIndex: e.target.value,
          //});
          break;
        }
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
 
    let cnp = this.state.cnp;
    let grad = this.state.grad;
    let nume = this.state.nume;
    let prenume = this.state.prenume;
    let user = this.state.user;
    let pass = this.state.pass;
    let rol = this.state.rol;

    let valid = (cnp !== '' && 
                 grad !== '' &&
                 nume !== '' &&
                 prenume !== '' &&
                 user !== '' &&
                 pass !== '' &&
                 rol !== '0');

    if (valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnp: cnp,
          grad: grad,
          nume: nume,
          prenume: prenume,
          user: user,
          pass: pass,
          rol: rol
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

            if (false === signup.grad || 
                false === signup.rol) {
              signedUp = false;
              this.setState({
                showError: true, /* improbable, but not impossible */ 
              });
            } else { /*  */

              if (false === signup.cnp) {
                signedUp = false;
                this.setState({
                  showCnpError: true,
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
      console.log(window.titlebar)
      if (cnp === '') {
        this.setState({
          showCnpWarning: true
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

      if (rol === '0') {
        this.setState({
          rolOffsetX: 130,
          showRolWarning: true
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
          autoCorrect='off'>
          <div className='Form-field'>
            <label htmlFor='cnp'>
              Cod numeric personal
              <RequiredTippy
                content='Câmp obligatoriu - 13 cifre' />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> CNP invalid
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showCnpError}>
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
                      <i className='fas fa-exclamation-circle'></i> Introdu CNP
                    </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  visible={this.state.showCnpWarning}>
                  <span className='legacy' tabIndex='0'>
                    <Input
                    onKeyDown={this.onKeyDown}
                    className='fixed-height'
                    type='text' 
                    name='cnp'
                    id='cnp'
                    placeholder='Introdu CNP'
                    onInput={this.onInput}/>
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
              onInput={this.onInput}
              onKeyDown={this.onGenericKeyDown}
              visibility='visible' 
              asterisk={true}
              displayWarning={this.state.showPassWarning}
              displayInfo={this.state.showPassInfo}
              displayError={this.state.showPassError}
              displayRolWarning={this.state.showRolWarning}
              eyeOffset={[0 + 25 * this.state.showPassWarning, 20]}
              eyePlacement={this.state.showPassWarning ? 'right-start' : 'right'}
              eyeArrow={true}/>
          </div>
          <div className='Form-field'>
            <label htmlFor='rol'>
              Rol
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
            <Tippy
              hideOnClick={false}
              allowHTML={true}
              interactive={true}
              maxWidth={300}
              offset={[10, this.state.rolOffsetX]}
              content=
              {
                <>
                <div
                  id='style-1'
                  style={{
                    height: 'auto',
                    maxHeight: '15vh',
                    overflowY: 'auto'
                    }}>
                  {this.state.rolInfo[this.state.rolIndex].innerHTML}
                </div>
                </>
              }
              placement='right'
              theme='blue-material-light'>
                <span className='legacy' tabIndex='0'>
                <Select
                  onInputChange={(inputValue, action) => this.onInput(null, {id: 'rol', value: inputValue, action: action.action})}
                  onChange={(inputValue,action) => this.onInput(null, {id: 'rol', value: inputValue.value, action: action.action})}
                  maxMenuHeight={100}
                  placeholder='Selectează...'
                  noOptionsMessage={(msg) => 'Nu există'}
                  className='select-container'
                  classNamePrefix='select' 
                  options={this.state.roluri} />
                </span>
            </Tippy>
            </div>
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
              Ai deja un cont? <span onClick={() => this.props.onChange('Login')} className='Form-hint bold glow'>Conectează-te</span>.
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
