import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ClientDetailPageBtns({ handleDelete, setIsUpdate }) {
  return (
    <LinkWrapper>
      <Link to="/home">
        <i className="fas fa-arrow-left"></i>
        <span>Back</span>
      </Link>
      <button onClick={() => setIsUpdate(true)}>
        <i className="fas fa-pen"></i>
        <span>Edit</span>
      </button>
      <button to="/home" onClick={handleDelete}>
        <i className="fas fa-minus-circle"></i>
        <span>Delete</span>
      </button>
    </LinkWrapper>
  );
}
const LinkWrapper = styled.div`
  display: flex;
  gap: 1rem;

  a,
  button {
    cursor: pointer;
    border: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    width: 90px;
    background: purple;
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1rem;
    position: relative;
    transition-duration: 100ms;
    span {
      transition-duration: 100ms;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      opacity: 0;
    }
    i {
      transition-duration: 100ms;
    }
    &:hover {
      i {
        transform: translateX(-20px);
      }
      span {
        opacity: 1;
        transform: translate(-20%, -50%);
      }
    }
  }
`;
