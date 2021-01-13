import React, { Suspense } from 'react';
import Spinner from './Spinner';

import './css/App.css';
/*Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com */
import './css/all.min.css';
/* Tippy.js related */
import './css/tippy.css';
import './css/custom-material.css';

const Login = React.lazy(() => import('./Login'));
const Signup = React.lazy(() => import('./Signup'));
/*
const Signup = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./Signup")), 10000);
  });
});
*/
const Forgot = React.lazy(() => import('./Forgot'));
const Main = React.lazy(() => import('./Main'));

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
        Forgot: Forgot,
        Main: Main
      },
      
      toRender: Login,

      token: '0',

      user: '##'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(toRender, token='0', user='##') {
    let Component = toRender;
    
    if (Object.keys(this.state.components).includes(toRender)) {

      this.setState({
        toRender: this.state.components[toRender],
        token: token,
        user: user
      });

    } else {
      
      this.setState({
        toRender: Login,
        token: '0',
        user: '##'
      });
      
    }
  }

  render() {
    let Component = this.state.toRender;
    let className = (Component === Login) || (Component === Signup) || (Component === Forgot) ? 'App --with-background-image' : 'App';

    // The props are defined here (onChange)
    return (
      <div className={className}>
        <Suspense 
          fallback={
            <Spinner
              className='-spinner'
              status='loading' 
              visibility={true}/>
          }>
          <Component 
            onChange={this.onChange}
            token={this.state.token}
            user={this.state.user} />
        </Suspense>
      </div>
    );
  }
}

export default App;
