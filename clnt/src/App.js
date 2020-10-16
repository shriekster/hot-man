import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import CreateAccount from './CreateAccount';
import './App.css';


/**
 * NOT GOOD!
 * TODO: Lift state from the Login and CreateAccount
 * components up to the App component
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.createAccount = this.createAccount.bind(this);
    this.login = this.login.bind(this);

    this.state = {logIn: true};
  }

  login() {
    this.setState({login: true});
  }

  createAccount() {
    this.setState({login: false});
  }

  render() {
    const logIn = this.state.logIn;
    if (logIn){
      return (
        <div id="App">
          <Login />
        </div>
      );
    }
    return (
      <div id="App">
        <CreateAccount />
      </div>
    );

  }
}

export default App;
