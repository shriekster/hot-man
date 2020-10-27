import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import './css/App.css';
import './css/all.min.css';


/**
 * Controls the app components
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
    
    // The props are defined here (onChange)
    return (
      <div className='App'>
        <Component onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
