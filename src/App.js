import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer.jsx';
import Keycloak from 'keycloak-js';
import { QUERY_USER_ROLE_API, DEV2 } from './Constants.js';
import './config/axios-interceptors';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }
  componentDidMount() {

    // for test purpose only
    const keycloak = Keycloak({
      "realm": "Theme-Testing",
      "url": "https://keycloak.devops.easy2easiest.com/auth",
      "ssl-required": "external",
      "clientId": "config-monster",
      "public-client": true,
      "confidential-port": 0
    })

    // actual
    // const keycloak = Keycloak({
    //   "realm": "master",
    //   "url": "https://keycloak.devops.easy2easiest.com/auth",
    //   "ssl-required": "external",
    //   "clientId": "configmonster",
    //   "public-client": true,
    //   "confidential-port": 0

    // })

    console.log('keycloak : ', keycloak);


    keycloak.init({ onLoad: 'login-required' }).success(authenticated => {

      keycloak.loadUserProfile().success((profile) => {
        console.log("before entering post userrole", profile)
        fetch(QUERY_USER_ROLE_API, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": profile.username,
          })
        }).then(response => {

          if (response.body !== null && response.status === 200) {

            return response.json()
          } else {
            console.log("cannot get data")
            return { "role_audit": 0 }
            // throw new Error(response.status);
          }
        }).then(data => {
          console.log("current user role = ?",data[0].role_audit)
          this.setState({
            user: profile,
            userRole: data[0].role_audit == null ? 0:data[0].role_audit,
            keycloak: keycloak,
            authenticated: authenticated
          });

        }).catch((error) => {
          console.log('error: ' + error);
          this.setState({
            user: profile,
            userRole: 2,
            keycloak: keycloak,
            authenticated: authenticated
          });
        });
        console.log("check user profile ", profile)

      }).error((err) => {
        console.log('Failed to load User Profile : ', err);
      });

    })
  }

  logout = () => {
    this.state.keycloak.logout({ 'clientId': 'configmonster' });
  }
  render() {

    return (

      <div className="container">

        {this.state.authenticated ?

             <Route render={(props) => (<HomeContainer {...props} logout={this.logout} userRole={this.state.userRole} username={this.state.user.username}/>)} /> : <div></div>

        }
      </div>
    );
  }
}

export default App;
