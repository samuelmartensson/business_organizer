import styled from 'styled-components';

export const BoxShadowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;
export const LoggedOutFormContainer = styled.div`
  height: 100vh;
  display: grid;
  background: linear-gradient(45deg, #909090, #3e3e77);
  place-items: center;
`;
export const LoggedOutFormBtn = styled.button`
  border-radius: 100px;
  border: none;
  background: purple;
  cursor: pointer;
  padding: 1rem 4rem;
  color: white;
  font-size: 1.15rem;
  display: block;
  margin: 18px auto;
`;
