import React, { useState } from 'react';
import FormKit from '../data/FormKit';
import UserKit from '../data/UserKit';
import { BoxShadowContainer } from '../style/globalStyle';
import styled from 'styled-components';
import FormPagination from './FormPagination';

export default function FormContainer({
  mode,
  id,
  clientDetails,
  setIsUpdate,
  fetchClients,
}) {
  const pageSplit = 2;
  const userKit = new UserKit();
  const formKit = new FormKit();
  const [pageNr, setPageNr] = useState(0);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(clientDetails ? clientDetails.name : '');
  const [email, setEmail] = useState(clientDetails ? clientDetails.email : '');
  const [organisationNr, setOrganisationNr] = useState(
    clientDetails ? clientDetails.organisationNr : ''
  );
  const [vatNr, setVatNr] = useState(clientDetails ? clientDetails.vatNr : '');
  const [reference, setReference] = useState(
    clientDetails ? clientDetails.reference : ''
  );
  const [paymentTerm, setPaymentTerm] = useState(
    clientDetails ? clientDetails.paymentTerm : ''
  );
  const [website, setWebsite] = useState(
    clientDetails ? clientDetails.website : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    clientDetails ? clientDetails.phoneNumber : ''
  );
  const inputObjects = [
    ['name', name, setName],
    ['organisationNr', organisationNr, setOrganisationNr],
    ['email', email, setEmail],
    ['reference', reference, setReference],
    ['paymentTerm', paymentTerm, setPaymentTerm],
    ['website', website, setWebsite],
    ['phoneNumber', phoneNumber, setPhoneNumber],
    ['vatNr', vatNr, setVatNr],
  ];
  function clearInputs() {
    inputObjects.forEach((input) => {
      input[2]('');
    });
  }
  function createCustomer(payload) {
    userKit
      .createCustomer(payload)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText + ' Check your inputs');
        }
      })
      .then((data) => {
        fetchClients();
        clearInputs();
        setPageNr(0);
      })
      .catch((err) => alert(err));
  }
  function updateCustomer(payload, id) {
    userKit
      .updateCustomer(payload, id)
      .then((res) => res.json())
      .then((data) => {
        fetchClients();
        setIsUpdate(false);
      });
  }
  function handleCustomer() {
    const payload = {
      name,
      organisationNr,
      paymentTerm,
      phoneNumber,
      reference,
      vatNr,
      website,
      email,
    };
    formKit.validate(
      payload,
      () => {
        setErrors({});
        switch (mode) {
          case 'create':
            createCustomer(payload);
            break;
          case 'update':
            updateCustomer(payload, id);
            break;
          default:
            break;
        }
      },
      (errors) => {
        setErrors(errors);
      }
    );
  }
  function nextStep() {
    const fieldsPerPage = inputObjects.length / pageSplit;
    const payload = inputObjects
      .slice(fieldsPerPage * pageNr, fieldsPerPage * pageNr + fieldsPerPage)
      .reduce((result, item, index) => {
        result[item[0]] = item[1];
        return result;
      }, {});
    formKit.validate(
      payload,
      () => {
        setErrors({});
        setPageNr((prevState) => prevState + 1);
      },
      (errors) => {
        setErrors(errors);
      }
    );
  }

  return (
    <div>
      <h2>{userKit.capitalizeFirstLetter(mode)} client</h2>
      <FormWrapper>
        <FormPagination
          inputObjects={inputObjects}
          errors={errors}
          pageSplit={pageSplit}
          pageNr={pageNr}
        />
        <ButtonWrap>
          {mode === 'update' && (
            <Button primary onClick={() => setIsUpdate(false)}>
              Close
            </Button>
          )}
          {pageNr !== 0 && (
            <Button onClick={() => setPageNr((prevState) => prevState - 1)}>
              Back
            </Button>
          )}

          {pageNr === pageSplit - 1 ? (
            <Button onClick={handleCustomer}>
              {userKit.capitalizeFirstLetter(mode)}
            </Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </ButtonWrap>
      </FormWrapper>
    </div>
  );
}
const FormWrapper = styled(BoxShadowContainer)`
  min-height: 550px;
  display: grid;
  width: 100%;
  place-items: center;
  input {
    padding: 5px;
  }
  .input-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
  button {
    padding: 1rem 2rem;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;
const ButtonWrap = styled.div`
  margin: auto 0;
  display: flex;
  gap: 1rem;
  grid-column: 1/-1;
`;
const Button = styled.button`
  background: ${(props) => (props.primary ? 'purple' : '#77dd97')};

  &:hover {
    background: ${(props) => (props.primary ? '#5a045a' : '#59b977')};
  }
`;
