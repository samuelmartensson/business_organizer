const ROOT_URL = 'https://frebi.willandskill.eu/';

export default class {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async register(
    firstName,
    lastName,
    email,
    password,
    organisationName,
    organisationKind
  ) {
    const url = `${ROOT_URL}auth/users/`;
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };
    return this.getPostFetch(url, payload);
  }

  async activateUser(uid, token) {
    const url = `${ROOT_URL}auth/users/activate/`;
    const payload = { uid, token };
    return this.getPostFetch(url, payload);
  }

  async login(email, password) {
    const url = `${ROOT_URL}api-token-auth/`;
    const payload = { email, password };
    return this.getPostFetch(url, payload);
  }

  async getLoggedInUser() {
    const url = `${ROOT_URL}api/v1/me`;
    return fetch(url, {
      headers: this.getPrivateHeaders(this.getToken()),
    });
  }
  async getCustomerList() {
    const url = `${ROOT_URL}api/v1/customers`;
    return fetch(url, {
      headers: this.getPrivateHeaders(this.getToken()),
    });
  }
  async createCustomer(payload) {
    const url = `${ROOT_URL}api/v1/customers`;
    return fetch(url, {
      method: 'POST',
      headers: this.getPrivateHeaders(this.getToken()),
      body: JSON.stringify(payload),
    });
  }
  async deleteCustomer(id) {
    const url = `${ROOT_URL}api/v1/customers/${id}/`;
    return fetch(url, {
      method: 'DELETE',
      headers: this.getPrivateHeaders(this.getToken()),
    });
  }
  async updateCustomer(payload, id) {
    const url = `${ROOT_URL}api/v1/customers/${id}/`;
    return fetch(url, {
      method: 'PUT',
      headers: this.getPrivateHeaders(this.getToken()),
      body: JSON.stringify(payload),
    });
  }
  getPostFetch(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  getPublicHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }
  getPrivateHeaders(token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  getToken() {
    return localStorage.getItem('BUSINESS_TOKEN');
  }

  setToken(token) {
    localStorage.setItem('BUSINESS_TOKEN', token);
  }
}
