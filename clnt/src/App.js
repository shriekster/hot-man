import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import './App.css';


/**
 * NOT GOOD!
 * TODO: Lift state from the Login and CreateAccount
 * components up to the App component
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    // components: an array of possible ('defined') components
    // toRender: the component to be rendered, without
    // the props (!)
    this.state = {

      components: {
        Login: Login, 
        Signup: Signup, 
        Main: Main
      },
      
      toRender: Login
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(toRender) {
    let Component = toRender;
    if (Object.keys(this.state.components).includes(toRender)) {
      
      this.setState({
        toRender: this.state.components[toRender]
      });
    } else {
      
      this.setState({
        toRender: Login
      });
    }
  }

  render() {
    let Component = this.state.toRender;
    
    return (
      <div id='App'>
        <Component onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
