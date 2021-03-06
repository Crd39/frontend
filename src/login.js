import React from 'react';

import { url } from './app.js';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '',
                    password: ''};
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value,
                    password: this.state.password});
    }
  
    handlePasswordChange(event) {
        this.setState({username: this.state.username,
                    password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => (response.json()))
        .then((info) => {
            if(info.status === 'succeed') {
                window.localStorage['token'] = info.token;
                console.log('login succeed');
                console.log('token: ' + info.token);
                window.location.replace('/')
            }
            else {
                console.log('login failed');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

  render() {
    return (
      <div>
        <div>login</div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>
          <div>
            name:
              <input type="text" value={this.state.username} onChange={(event) => this.handleUsernameChange(event)} />
          </div>
          <div>
            password:
            <input type="text" value={this.state.password} onChange={(event) => this.handlePasswordChange(event)} />
          </div>
        </label>
        <input type="submit" value="submit" />
        </form>
        <div>
          <button onClick = {() => { window.location.replace('/signup') }}>
            signup
          </button>
        </div>
      </div>
    )
  }
}
