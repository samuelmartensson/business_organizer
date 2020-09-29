import React from 'react';
import UserKit from '../data/UserKit';
import styled from 'styled-components';

export default function FormInputElement({ label, handleChange, value }) {
  const userKit = new UserKit();
  return (
    <div className="input-wrap">
      <label htmlFor={label}>
        {/* Insert space after capital letter */}
        {userKit.capitalizeFirstLetter(
          (label = label.replace(/([A-Z])/g, ' $1').trim())
        )}
        *
      </label>
      <Input onChange={(e) => handleChange(e.target.value)} value={value} />
    </div>
  );
}
const Input = styled.input`
  padding: 15px;
  border: none;
  border-radius: 2rem;
  background: #eaeaea;
`;
