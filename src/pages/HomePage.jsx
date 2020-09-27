import React, { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import CustomerList from '../components/CustomerList';
import FormContainer from '../components/FormContainer';
import styled from 'styled-components';

export default function HomePage() {
  const { customerList, fetchClients } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Dashboard - Admin';
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <TwoColumnLayout>
          <FormContainer mode="create" fetchClients={fetchClients} />
          <CustomerList customerList={customerList} />
        </TwoColumnLayout>
      </Container>
    </>
  );
}

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: 0 1rem;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const Container = styled.div`
  h1 {
    text-align: center;
  }
`;
