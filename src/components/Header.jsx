import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';

export default function Header({ handleSignOut }) {
  const { userCredentials } = useContext(UserContext);

  function renderUserInfo() {
    return (
      <InfoWrapper>
        <span>
          {userCredentials.firstName} {userCredentials.lastName}
        </span>
        <span>{userCredentials.email}</span>
      </InfoWrapper>
    );
  }

  return (
    <HeaderContainer>
      {userCredentials && renderUserInfo()}
      <button onClick={handleSignOut}>Sign out</button>
    </HeaderContainer>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(0.5rem + 1.5vw);
  background: purple;
  color: white;
  button {
    border: 2px solid white;
    border-radius: 50px;
    background: none;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition-duration: 80ms;
    &:hover {
      background: white;
      color: purple;
    }
    @media (min-width: 500px) {
      padding: 1rem 2rem;
    }
  }
`;
