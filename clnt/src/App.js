import React, { Suspense } from 'react';
import Loading from './Loading';

import './css/App.css';
/*Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com */
import './css/all.min.css';
/* Tippy.js related */
import './css/tippy.css';
import './css/custom-material.css';

const Login = React.lazy(() => import('./Login'));
const Signup = React.lazy(() => import('./Signup'));
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
    let className = (Component === Login) || (Component === Signup) ? 'App --with-background-image' : 'App';
    
    // The props are defined here (onChange)
    return (
      <div className={className}>
        <Suspense fallback={<Loading status='loading'/>}>
          <Component onChange={this.onChange}/>
        </Suspense>
      </div>
    );
  }
}

export default App;
