import React, { useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import UserKit from './data/UserKit';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ClientDetailPage from './pages/ClientDetailPage';
import RegisterPage from './pages/RegisterPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

function App() {
  const userKit = new UserKit();
  const [isLoggedIn, setIsLoggedIn] = useState(userKit.getToken() !== '');
  const [userCredentials, setUserCredentials] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  let history = useHistory();

  function handleSignOut() {
    setIsLoggedIn(false);
    userKit.setToken('');
  }

  function fetchClients() {
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      userKit
        .getLoggedInUser()
        .then((res) => res.json())
        .then((data) => setUserCredentials(data));
    } else {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <UserContext.Provider
        value={{ userCredentials, customerList, setCustomerList, fetchClients }}
      >
        {isLoggedIn && <Header handleSignOut={handleSignOut} />}
        <Switch>
          <Route path="/home">
            {isLoggedIn ? <HomePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/register">
            <RegisterPage signOut={handleSignOut} />
          </Route>
          <Route
            path="/client/:id"
            render={(props) => {
              return <ClientDetailPage {...props} />;
            }}
          ></Route>
          <Route path="/">
            {isLoggedIn ? (
              <Redirect to="/home" />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )}
          </Route>
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
