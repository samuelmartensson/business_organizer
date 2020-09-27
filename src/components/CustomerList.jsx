import React from 'react';
import { BoxShadowContainer } from '../style/globalStyle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function CustomerList({ customerList }) {
  return (
    <div>
      <h2>Clients {customerList && `(${customerList.length})`}</h2>
      <Container>
        {customerList &&
          customerList.map((customerItem, i) => {
            return (
              <ListItem key={i}>
                <Link to={`/client/${customerItem.id}`}>
                  <h3>{customerItem.name}</h3>
                  <div>
                    <span>Org. Nr: </span>
                    <span>{customerItem.organisationNr}</span>
                  </div>
                  <div>
                    <span>Reference: </span>
                    <span>{customerItem.reference}</span>
                  </div>
                </Link>
              </ListItem>
            );
          })}
      </Container>
    </div>
  );
}

const Container = styled(BoxShadowContainer)`
  height: 550px;
  overflow-y: auto;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid purple;
  padding-left: 1rem;
  margin: 0.5rem;
  width: 100%;
  animation: anim 0.5s ease;

  @keyframes anim {
    0% {
      opacity: 0;
      transform: translateY(-7px);
    }
    100% {
      opacity: 1;
    }
  }

  h3 {
    margin: 0;
  }

  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  }
`;
