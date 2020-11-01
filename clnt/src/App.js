import React, { Suspense } from 'react';
import Signup from './Signup';
import Main from './Main';
import './css/App.css';

/*!
 * Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
import './css/all.min.css';

const Login = React.lazy(() => import('./Login'));





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
        <Suspense fallback={<div className='Form'>Se încarcă...</div>}>
          <Component onChange={this.onChange}/>
        </Suspense>
      </div>
    );
  }
}

export default App;
