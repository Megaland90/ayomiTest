import React, { Component } from 'react';

import Login from './Login'
import Profil from './Profil'

class App extends Component {

  render() {

    let route = {
        '/' : Login,
        '/profil' : Profil
    }
    console.log(window.location.pathname);
    var Page = route[window.location.pathname];
    return (
        <Page/>
    );
  }
}

export default App;
