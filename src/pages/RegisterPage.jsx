import React, { useState, useEffect } from 'react';
import UserKit from '../data/UserKit';
import { LoggedOutFormContainer, LoggedOutFormBtn } from '../style/globalStyle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function RegisterPage({ signOut }) {
  const userKit = new UserKit();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgKind, setOrgKind] = useState('');
  const [hasRegistered, setHasRegistered] = useState(false);

  const inputObjects = [
    ['First Name', firstName, setFirstName],
    ['Last Name', lastName, setLastName],
    ['Email', email, setEmail],
    ['Password', password, setPassword, 'password'],
    ['Org. Name', orgName, setOrgName],
    ['Org. Kind', orgKind, setOrgKind],
  ];

  function handleRegister() {
    userKit.register(firstName, lastName, email, password, orgName, orgKind);
    setHasRegistered(true);
  }

  function renderInput(
    index,
    placeholder,
    stateVariable,
    setStateVariable,
    type = 'text'
  ) {
    return (
      <InputWrap key={index}>
        <label>{placeholder}</label>
        <input
          required
          type={type}
          placeholder={placeholder}
          value={stateVariable}
          onChange={(e) => setStateVariable(e.target.value)}
        />
      </InputWrap>
    );
  }

  useEffect(() => {
    document.title = 'Register';
  }, []);
  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <LoggedOutFormContainer>
      <InnerWrap>
        <h2>Register</h2>
        {!hasRegistered ? (
          <InputContainer>
            {inputObjects.map((item, i) => {
              return renderInput(i, item[0], item[1], item[2], item[3]);
            })}
            <LoggedOutFormBtn onClick={handleRegister}>
              Register
            </LoggedOutFormBtn>
            <Link to="/">Back to sign in</Link>
          </InputContainer>
        ) : (
          <h1>Check your email at {email}</h1>
        )}
      </InnerWrap>
    </LoggedOutFormContainer>
  );
}

const InnerWrap = styled.div`
  width: 100%;
  max-width: 500px;
  h2 {
    margin: 0;
    align-self: flex-start;
    font-size: 2rem;
    color: white;
  }
`;
const InputWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  width: 100%;

  label {
    font-weight: bold;
    color: purple;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
  background: white;

  input {
    padding: 8px;
  }
`;
