import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';


export var Login = React.createClass({
  onLoginGithub() {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  },
  onLoginTwitter() {
    var {dispatch} = this.props;

    dispatch(actions.startTwitterLogin());
  },
  render() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Social Login.</p>
              <button className="button" onClick={this.onLoginTwitter}>Login With Twitter</button>
              <button className="button" onClick={this.onLoginGithub}>Login With GitHub</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Login);
