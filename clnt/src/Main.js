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

    this.state = {
      showUserSettings: false,
      userSettingsClass: '',
      menuAdmClass: 'sidenav-a',
      menuRapClass: 'sidenav-a',
      menuPayClass: 'sidenav-a',
      menuTarClass: 'sidenav-a',
      menuRezClass: 'sidenav-a --active-menu',
      menuSolClass: 'sidenav-a',
      components: {
        Administrare: Administrare,
        Setari: Setari,
        Rapoarte: Rapoarte,
        Plati: Plati,
        Tarife: Tarife,
        Rezervari: Rezervari,
        Solicitari: Solicitari,
      },

      view: Rezervari,

      token: this.props.token,
      user: this.props.user,
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

  changeView(component='Rezervari') {
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
      nextView = Rezervari;
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
      view: nextView,
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

  render() {
    let Component = this.state.view;
    
    return (
      <div className='Main'>
        <div className='sidenav'>
          <div className='sidenav-container'>
            <a href='#'
              className={this.state.menuAdmClass}
              onClick={() => this.changeView('Administrare')}>
              <i className='fas fa-building menu-icon'></i> 
              <span className='menu-label'>Administrare</span>
            </a>
            <a href='#'
              className={this.state.menuRapClass}
              onClick={() => this.changeView('Rapoarte')}>
              <i className='fas fa-chart-bar menu-icon'></i> 
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
              <i className='fas fa-calendar-plus menu-icon'></i> 
              <span className='menu-label'>Rezervări</span>
            </a>
            <a href='#'
              className={this.state.menuSolClass}
              onClick={() => this.changeView('Solicitari')}>
              <i className='fas fa-clock menu-icon'></i> 
              <span className='menu-label'>Solicitări</span>
            </a>
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
                    {'operator' === this.props.user.rol ? 
                    <i className='fas fa-user user-icon--big'></i> :
                    <i className='fas fa-user-cog user-icon--big'></i>
                    }
                  </div>
                  <div className='bold'>{this.props.user.grad} {this.props.user.nume} {this.props.user.prenume}</div>
                  <div>
                    <div className='user-settings--attribute'>
                      <i className='fas fa-id-card --attribute-icon'></i> <span className='bold --attribute-text'>{this.props.user.utilizator}</span>
                    </div>
                    <div className='user-settings--attribute'>
                      <i className='fas fa-user-tag --attribute-icon'></i> <span className='bold --attribute-text'>{this.props.user.rol}</span>
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
                onUserUpdate={this.onUserUpdate}
                onChange={this.props.onChange}/>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
