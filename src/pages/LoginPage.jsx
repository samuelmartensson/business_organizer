import React, { useEffect, useState } from 'react';
import UserKit from '../data/UserKit';
import { LoggedOutFormContainer, LoggedOutFormBtn } from '../style/globalStyle';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginPage({ setIsLoggedIn }) {
  const userKit = new UserKit();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  let history = useHistory();
  let searchString = history.location.search;
  let urlParams = new URLSearchParams(searchString);

  const [uid, setUid] = useState(urlParams.get('uid'));
  const [token, setToken] = useState(urlParams.get('token'));

  useEffect(() => {
    document.title = 'Sign in';
  }, []);

  function handleLogin() {
    userKit
      .login(loginEmail, loginPassword)

      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          userKit.setToken(data.token);
          setIsLoggedIn(true);
          history.push('/home');
        } else {
          alert('Invalid credentials');
        }
      });
  }
  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null);
      setToken(null);
      history.push('/login');
    });
  }
  return (
    <LoggedOutFormContainer>
      {uid && token ? (
        <div>
          <h2>Activate Account</h2>
          <button onClick={handleActivateUser}>Activate my account</button>
        </div>
      ) : (
        <SignInContainer>
          <h2>Sign In</h2>
          <InnerWrap>
            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                placeholder="example@email.com"
                onChange={(e) => setLoginEmail(e.target.value)}
                value={loginEmail}
                type="email"
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                type="password"
                onKeyUp={(e) => handleKeyUp(e)}
              />
            </div>
            <LoggedOutFormBtn onClick={handleLogin}>Sign in</LoggedOutFormBtn>
            <div className="register">
              No account? <Link to="/register">Register here</Link>
            </div>
          </InnerWrap>
        </SignInContainer>
      )}
    </LoggedOutFormContainer>
  );
}

const InnerWrap = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background: white;
  width: 100%;
`;
const SignInContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0.5rem;
  h2 {
    font-size: 40px;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    margin: 0;
  }
  input {
    padding: 8px;
  }
  .input-wrap {
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    width: 100%;
  }
  label {
    font-weight: bold;
  }

  .register {
    text-align: center;
  }
`;
