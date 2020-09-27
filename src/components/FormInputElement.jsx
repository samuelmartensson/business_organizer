import React from 'react';
import UserKit from '../data/UserKit';

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
      <input onChange={(e) => handleChange(e.target.value)} value={value} />
    </div>
  );
}
