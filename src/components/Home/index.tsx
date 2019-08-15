import React, { Component } from 'react';

export default class Home extends Component {
  componentDidMount() {
    const accountBtn: any = document.querySelector('#check-account');
    accountBtn.addEventListener('click', () => {
      fetch('/api/account')
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
    });
  }
  render() {
    return (
      <div id="Home">
        <div className="login">
          <a href="/auth/google">Google Login</a>
        </div>
        <button id="check-account">Account 정보 확인 (console)</button>
      </div>
    );
  }
}
