import React from 'react';
import Tippy from '@tippyjs/react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.toggleUserSettings = this.toggleUserSettings.bind(this);

    this.signOut = this.signOut.bind(this);



    this.state = {
      showUserSettings: false,
    };
  }

  toggleUserSettings() {
    this.setState({
      showUserSettings: !this.state.showUserSettings
    });
  }

  signOut() {
    this.props.onChange('Login');
  }

  render() {
    console.log(this.props.user)
    return (
      <div className='Main'>
        <div className='sidenav'>
          <a href='#'>
            <i className='fas fa-building menu-icon'></i> 
            <span className='menu-label'>Administrare</span>
          </a>
          <a href='#'>
            <i className='fas fa-chart-bar menu-icon'></i> 
            <span className='menu-label'>Rapoarte</span>
          </a>
          <a href='#'>
            <i className='fas fa-receipt menu-icon'></i> 
            <span className='menu-label'>Plăți</span>
          </a>
          <a href='#'>
            <i className='fas fa-coins menu-icon'></i> 
            <span className='menu-label'>Tarife</span>
          </a>
          <a href='#'>
            <i className='fas fa-calendar-plus menu-icon'></i> 
            <span className='menu-label'>Rezervări</span>
          </a>
          <a href='#'>
            <i className='fas fa-clock menu-icon'></i> 
            <span className='menu-label'>Solicitări</span>
          </a>
        </div>

        <div className='content'>
          <div className='user-settings'>
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
                      className='manage-user'>
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
            visible={this.state.showUserSettings}>
              {'operator' === this.props.user.rol ? 
                <i className='fas fa-user-cog user-icon' 
                  onClick={this.toggleUserSettings}></i> :
                <i className='fas fa-user-plus user-icon' 
                  onClick={this.toggleUserSettings}></i>
              }
            </Tippy>
          </div>
          <h2>Hotelitary</h2>
          <p>Aici se vor caza persoanele...</p>
          <p>Aici sperăm să oferim satisfacția atât turiștilor...</p>
          <p>... cât și operatorilor și managerilor!</p>
        </div>
      </div>
    );
  }
}

export default Main;
