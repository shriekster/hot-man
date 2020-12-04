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
          <a href='#about'>Administrare</a>
          <a href='#services'>Services</a>
          <a href='#clients'>Clients</a>
          <a href='#contact'>Contact</a>
          <a href='#contact'>Search</a>
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
          <h2>Sidebar Dropdown</h2>
          <p>Click on the dropdown button to open the dropdown menu inside the side navigation.</p>
          <p>This sidebar is of full height (100%) and always shown.</p>
          <p>Some random text..</p>
        </div>
      </div>
    );
  }
}

export default Main;
