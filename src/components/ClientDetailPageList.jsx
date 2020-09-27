import React from 'react';
import styled from 'styled-components';

export default function ClientDetailPageList({ client }) {
  return (
    <>
      <h1>{client.name}</h1>
      <ListWrap>
        <li>
          <span>Org. Nr</span>
          <span>{client.organisationNr}</span>
        </li>
        <li>
          <span>Reference</span>
          <span>{client.reference}</span>
        </li>
        <li>
          <span>Payment Term</span>
          <span>{client.paymentTerm}</span>
        </li>
        <li>
          <span>Website</span>
          <a target="_blank" rel="noopener noreferrer" href={client.website}>
            {client.website}
          </a>
        </li>
        <li>
          <span>Email</span>
          <span>{client.email}</span>
        </li>
        <li>
          <span>Phone Number</span>
          <span>{client.phoneNumber}</span>
        </li>
        <li>
          <span>VAT Nr</span>
          <span>{client.vatNr}</span>
        </li>
      </ListWrap>
    </>
  );
}
const ListWrap = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  min-width: 250px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
    padding-top: 1rem;
    font-size: calc(0.5rem + 2vw);

    @media (min-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;
