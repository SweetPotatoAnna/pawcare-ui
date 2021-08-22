import React, { Component } from 'react';
import { TOKEN_KEY } from '../constants/constants';

import Header from './Header';
import Main from './Main';

class App extends Component {
  state = {
    // signedIn: localStorage.getItem(TOKEN_KEY) ? true : false
    signedIn: TOKEN_KEY ? true : false
    // signedIn: true,
  };

  render() {
    const signedInSuccess = (token) => {
      this.setState({signedIn: true});
      localStorage.setItem(TOKEN_KEY, token); // improve by add a hash function.
    }
    
    const signedOutSuccess = () => {
      this.setState({signedIn: false});
      localStorage.removeItem(TOKEN_KEY);
    }

    const { signedIn } = this.state;
    return (
      <div>
        <Header signedIn={signedIn} signedOutSuccess={signedOutSuccess}/>
        <Main signedIn={signedIn} signedInSuccess={signedInSuccess}/>
      </div>
    );
  }
}

export default App;
