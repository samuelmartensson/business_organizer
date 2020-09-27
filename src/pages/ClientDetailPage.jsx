import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import UserKit from '../data/UserKit';
import FormContainer from '../components/FormContainer';
import ClientDetailPageList from '../components/ClientDetailPageList';
import ClientDetailPageBtns from '../components/ClientDetailPageBtns';
import { BoxShadowContainer } from '../style/globalStyle';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function ClientDetailPage(props) {
  const userKit = new UserKit();
  const [isUpdate, setIsUpdate] = useState(false);
  const [client, setClient] = useState(null);
  const { customerList, fetchClients } = useContext(UserContext);

  const id = props.match.params.id;
  let history = useHistory();

  useEffect(() => {
    if (customerList === null) {
      fetchClients();
    } else {
      getClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerList]);

  useEffect(() => {
    if (client) document.title = 'Clients - ' + client.name;
  }, [client]);

  function getClient() {
    const activeClient = customerList.filter(
      (client) => client.id === parseInt(id)
    );
    setClient(activeClient[0]);
  }
  function handleDelete() {
    let answer = window.confirm('Are you sure?');

    if (answer) {
      userKit
        .deleteCustomer(client.id)
        .then((res) => res)
        .then((data) => {
          fetchClients();
          history.push('/home');
        });
    }
  }

  return (
    <OuterContainer>
      {client && (
        <>
          {isUpdate ? (
            <FormContainer
              mode="update"
              id={id}
              clientDetails={client}
              setIsUpdate={setIsUpdate}
              fetchClients={fetchClients}
            />
          ) : (
            <Container>
              <ClientDetailPageList client={client} />
              <ClientDetailPageBtns
                handleDelete={handleDelete}
                setIsUpdate={setIsUpdate}
              />
            </Container>
          )}
        </>
      )}
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  max-width: 600px;
  padding: 1rem;
  margin: 0 auto;
`;

const Container = styled(BoxShadowContainer)`
  padding: 1rem;
  margin: 1rem auto;
`;
