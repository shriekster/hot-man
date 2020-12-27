import React, { Suspense } from 'react';
import Tippy from '@tippyjs/react';

import Spinner from './Spinner';

import Administrare from './Administrare';
import Setari from './Setari';
import Rapoarte from './Rapoarte';
import Plati from './Plati';
import Tarife from './Tarife';
import Rezervari from './Rezervari';
import Solicitari from './Solicitari';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.toggleUserSettings = this.toggleUserSettings.bind(this);

    this.closeUserSettings = this.closeUserSettings.bind(this);

    this.signOut = this.signOut.bind(this);

    this.changeView = this.changeView.bind(this);

    this.onSettingsEnter = this.onSettingsEnter.bind(this);

    this.onSettingsLeave = this.onSettingsLeave.bind(this);

    this.onUserUpdate = this.onUserUpdate.bind(this);

    this.onHotelUpdate = this.onHotelUpdate.bind(this);

    this.state = {
      showUserSettings: false,
      userSettingsClass: '',

      menuAdmClass: 'sidenav-a',
      menuRapClass: 'sidenav-a',
      menuPayClass: 'sidenav-a',
      menuTarClass: 'sidenav-a',
      menuRezClass: 'sidenav-a',
      menuSolClass: 'sidenav-a',

      hiddenMenuClass: '',

      components: {
        Administrare: Administrare,
        Setari: Setari,
        Rapoarte: Rapoarte,
        Plati: Plati,
        Tarife: Tarife,
        Rezervari: Rezervari,
        Solicitari: Solicitari,
      },

      defaultComponent: Administrare,
      defaultComponentName: 'Administrare',

      token: this.props.token,
      user: this.props.user,
      hotel: '',
    };
  }

  toggleUserSettings() {
    this.setState({
      showUserSettings: !this.state.showUserSettings
    });
  }

  closeUserSettings() {
    this.setState({
      showUserSettings: false
    });
  }

  signOut() {
    this.props.onChange('Login');
  }

  changeView(component=this.state.defaultComponentName) {
    let nextView = component;
    let nextUserSettings = this.state.showUserSettings;
    let nextClass = this.state.userSettingsClass;

    if(Object.keys(this.state.components).includes(nextView)) {
      nextView = this.state.components[component];

      if (Setari === nextView) {
        nextUserSettings = false;
        nextClass = '';
      }

    } else {
      nextView = Administrare;
      nextClass = '';
    }

    let nextMenuAdmClass = 'sidenav-a';
    let nextMenuRapClass = 'sidenav-a';
    let nextMenuPayClass = 'sidenav-a';
    let nextMenuTarClass = 'sidenav-a';
    let nextMenuRezClass = 'sidenav-a';
    let nextMenuSolClass = 'sidenav-a';

    switch(component) {
      case 'Administrare': {
        nextMenuAdmClass += ' --active-menu'
        break;
      }

      case 'Rapoarte': {
        nextMenuRapClass += ' --active-menu'
        break;
      }

      case 'Plati': {
        nextMenuPayClass += ' --active-menu'
        break;
      }

      case 'Tarife': {
        nextMenuTarClass += ' --active-menu'
        break;
      }

      case 'Rezervari': {
        nextMenuRezClass += ' --active-menu'
        break;
      }

      case 'Solicitari': {
        nextMenuSolClass += ' --active-menu'
        break;
      }
    }

    this.setState({
      defaultComponent: nextView,
      showUserSettings: nextUserSettings,
      userSettingsClass: nextClass,
      menuAdmClass: nextMenuAdmClass,
      menuRapClass: nextMenuRapClass,
      menuPayClass: nextMenuPayClass,
      menuTarClass: nextMenuTarClass,
      menuRezClass: nextMenuRezClass,
      menuSolClass: nextMenuSolClass,
    })
  }

  onSettingsEnter() {
    this.setState({
      userSettingsClass: '--opened'
    });
  }

  onSettingsLeave() {
    if (!this.state.showUserSettings) {
      this.setState({
        userSettingsClass: ''
      });
    }
  }

  onUserUpdate(token, user) {
    if (token && user) {
      this.setState({
        token: token,
        user: user,
      });
    }
  }

  onHotelUpdate(hotel) {
    if (hotel) {
      this.setState({
        hotel: hotel,
        hiddenMenuClass: '',
      })
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'read',
      })
    };

    fetch('http://localhost:3001/main/administrare', requestOptions)
    .then(response => response.json())
    .then(who => {
      if ('empty' === who.status) {
        if (who.hotel && !who.hotel.nume) { //
          this.setState({
            hiddenMenuClass: '--hidden-menu',
            defaultComponent: Administrare,
            defaultComponentName: 'Administrare',
            menuAdmClass: 'sidenav-a --active-menu',
          });
        } 
      } else 
      if ('valid' === who.status) {
        if (who.hotel && who.hotel.nume) {
          this.setState({
            hiddenMenuClass: '',
            hotel: who.hotel,
            defaultComponent: Rezervari,
            defaultComponentName: 'Rezervari',
            menuRezClass: 'sidenav-a --active-menu',
          });
        }
      } else 
      if ('denied' === who.status) {
        this.signOut();
      }
    });
  }


  render() {
    let Component = this.state.defaultComponent;
    
    return (
      <div className='Main'>
        <div className='sidenav'>
          <div className='sidenav-container'>
            <a href='#'
              className={this.state.menuAdmClass} 
              onClick={() => this.changeView('Administrare')}>
              <i className='fas fa-hotel menu-icon'></i> 
              <span className='menu-label'>Administrare</span>
            </a>
            <div className={this.state.hiddenMenuClass}>
              <a href='#'
                className={this.state.menuRapClass}
                onClick={() => this.changeView('Rapoarte')}>
                <i className='fas fa-file-invoice menu-icon'></i> 
                <span className='menu-label'>Rapoarte</span>
              </a>
              <a href='#'
                className={this.state.menuPayClass}
                onClick={() => this.changeView('Plati')}>
                <i className='fas fa-receipt menu-icon'></i> 
                <span className='menu-label'>Plăți</span>
              </a>
              <a href='#'
                className={this.state.menuTarClass}
                onClick={() => this.changeView('Tarife')}>
                <i className='fas fa-coins menu-icon'></i> 
                <span className='menu-label'>Tarife</span>
              </a>
              <a href='#'
                className={this.state.menuRezClass}
                onClick={() => this.changeView('Rezervari')}>
                <i className='fas fa-calendar-alt menu-icon'></i> 
                <span className='menu-label'>Rezervări</span>
              </a>
              <a href='#'
                className={this.state.menuSolClass}
                onClick={() => this.changeView('Solicitari')}>
                  <i className='fas fa-clock menu-icon'></i> 
                  <span className='menu-label'>Solicitări<span className='menu-label-counter'>0</span></span>
              </a>
            </div>
          </div>
        </div>

        <div className='content'>
          <div className='user-settings'>
            <span id='--settings-arrow'>
            {true === this.state.showUserSettings ?
            <i className={'fas fa-caret-right user-settings--arrow' + ' ' + this.state.userSettingsClass}></i> :
            <i className={'fas fa-caret-left user-settings--arrow' + ' ' + this.state.userSettingsClass}></i>
            }
            </span>
            <Tippy
            content={
              <>
                <div className='user-settings--menu'>
                  <div className='user-icon--big--container'>
                    <i className='fas fa-user-cog user-icon--big'></i>
                  </div>
                  <div className='bold'>{this.state.user.grad + ' ' + this.state.user.nume + ' ' + this.state.user.prenume}</div>
                  <div>
                    <div className='user-settings--attribute'>
                      <i className='fas fa-user-tag --attribute-icon'></i> <span className='bold --attribute-text'>{this.state.user.utilizator}</span>
                    </div>
                  </div>
                  <hr className='user-settings--separator'/>
                  <div className='user-settings--manage'>
                    <button
                      id='settings-button'
                      className='manage-user'
                      onClick={() => this.changeView('Setari')}>
                      Setări
                    </button>
                  </div>
                  <hr className='user-settings--separator'/>
                  <div className='user-settings--sign--out'>
                    <button
                      className='sign-out' 
                      onClick={this.signOut}>
                      Deconectare
                    </button>
                  </div>
                </div>
              </>
            }
            allowHTML={true}
            placement='left'
            arrow={false}
            theme='blue-material-thin'
            interactive={true}
            offset={[0, 4]}
            visible={this.state.showUserSettings}>
              <span id='user-icon' className='user-icon'>
                <i className='fas fa-user-circle --uicon' 
                  onClick={this.toggleUserSettings}
                  onMouseEnter={this.onSettingsEnter}
                  onMouseLeave={this.onSettingsLeave}></i>
              </span>
            </Tippy>
          </div>
          <div className='view'>
            <Suspense 
              fallback=
              {
                <Spinner 
                status='altLoading'
                visibility={true}/>
              }>
              <Component 
                user={this.state.user}
                token={this.state.token}
                hotel={this.state.hotel}
                onUserUpdate={this.onUserUpdate}
                onChange={this.props.onChange}
                changeMenu={this.changeView}
                onHotelUpdate={this.onHotelUpdate}/>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
