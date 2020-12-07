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

    this.state = {
      showUserSettings: false,
      userSettingsClass: '',
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
        nextClass = 'fade--right';
      }

    } else {
      nextView = Rezervari;
    }

    this.setState({
      view: nextView,
      showUserSettings: nextUserSettings,
      userSettingsClass: nextClass
    })
  }

  onSettingsEnter() {
    this.setState({
      userSettingsClass: 'fade--left'
    });
  }

  onSettingsLeave() {
    if (!this.state.showUserSettings) {
      this.setState({
        userSettingsClass: 'fade--right'
      });
    }
  }

  render() {
    let Component = this.state.view;
    
    return (
      <div className='Main'>
        <div className='sidenav'>
          <a href='#'
            onClick={() => this.changeView('Administrare')}>
            <i className='fas fa-building menu-icon'></i> 
            <span className='menu-label'>Administrare</span>
          </a>
          <a href='#'
            onClick={() => this.changeView('Rapoarte')}>
            <i className='fas fa-chart-bar menu-icon'></i> 
            <span className='menu-label'>Rapoarte</span>
          </a>
          <a href='#'
            onClick={() => this.changeView('Plati')}>
            <i className='fas fa-receipt menu-icon'></i> 
            <span className='menu-label'>Plăți</span>
          </a>
          <a href='#'
            onClick={() => this.changeView('Tarife')}>
            <i className='fas fa-coins menu-icon'></i> 
            <span className='menu-label'>Tarife</span>
          </a>
          <a href='#'
            onClick={() => this.changeView('Rezervari')}>
            <i className='fas fa-calendar-plus menu-icon'></i> 
            <span className='menu-label'>Rezervări</span>
          </a>
          <a href='#'
            onClick={() => this.changeView('Solicitari')}>
            <i className='fas fa-clock menu-icon'></i> 
            <span className='menu-label'>Solicitări</span>
          </a>
        </div>

        <div className='content'>
          <div className='user-settings'>
            {true === this.state.showUserSettings ?
            <i className={'fas fa-angle-right user-settings--arrow' + ' ' + this.state.userSettingsClass}></i> :
            <i className={'fas fa-angle-left user-settings--arrow' + ' ' + this.state.userSettingsClass}></i>
            }
            <Tippy
            content={
              <>
                <div className='user-settings--menu'>
                  <div className='user-icon--big--container'>
                    {'operator' === this.props.user.rol ? 
                    <i className='fas fa-user-cog user-icon--big'></i> :
                    <i className='fas fa-user-plus user-icon--big'></i>
                    }
                  </div>
                  <div className='bold'>{this.props.user.grad} {this.props.user.nume} {this.props.user.prenume}</div>
                  <div>{this.props.user.utilizator}</div>
                  <div>{this.props.user.rol}</div>
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
            offset={[0, 18]}
            visible={this.state.showUserSettings}>
              {'operator' === this.props.user.rol ? 
                <i className='fas fa-user-cog user-icon' 
                  onClick={this.toggleUserSettings}
                  onMouseEnter={this.onSettingsEnter}
                  onMouseLeave={this.onSettingsLeave}></i>:
                <i className='fas fa-user-plus user-icon' 
                  onClick={this.toggleUserSettings}
                  onMouseEnter={this.onSettingsHover}
                  onMouseLeave={this.onSettingsLeave}></i>
              }
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
                user={this.props.user}
                token={this.props.token}/>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
