import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormInputElement from './FormInputElement';

export default function FormPagination({
  inputObjects,
  errors,
  pageNr,
  pageSplit,
}) {
  const [lowerValue, setLowerValue] = useState();
  const [higherValue, setHigherValue] = useState();

  function renderInput(labelValue, stateVariable, setStateVariable) {
    return (
      <FormInputElement
        label={labelValue}
        value={stateVariable}
        handleChange={setStateVariable}
      />
    );
  }
  useEffect(() => {
    const fieldsPerPage = inputObjects.length / pageSplit;
    setLowerValue(fieldsPerPage * pageNr);
    setHigherValue(fieldsPerPage * pageNr + fieldsPerPage);
  }, [pageNr, inputObjects.length, pageSplit]);

  return (
    <>
      {inputObjects.slice(lowerValue, higherValue).map((item, i) => {
        return (
          <InputWrap key={item[0]}>
            {renderInput(item[0], item[1], item[2])}
            {errors[item[0]] && (
              <ErrorMsg key={errors[item[0]]}>{errors[item[0]]}</ErrorMsg>
            )}
          </InputWrap>
        );
      })}
    </>
  );
}
const InputWrap = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  animation: anim 0.3s ease;

  @keyframes anim {
    0% {
      opacity: 0;
      transform: translateY(-7px);
    }
    100% {
      opacity: 1;
    }
  }

  label {
    font-weight: bold;
  }
`;
const ErrorMsg = styled.div`
  color: red;
  font-weight: bold;
  padding: 3px;
  position: absolute;
  bottom: -27px;
  left: 0;
  animation: fade 0.4s;
  transform-origin: center;

  @keyframes fade {
    0% {
      opacity: 0;
    }
    10% {
      transform: translateX(5px);
      opacity: 1;
    }
    20% {
      transform: translateX(-5px);
    }
    30% {
      transform: translateX(5px);
    }

    50% {
      transform: translateX(0px);
    }
    100% {
    }
  }
`;
