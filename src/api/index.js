import axios from 'axios';
const URL = 'http://94.130.172.45:8000/api/v1';
export default class API {
  constructor() {}


  logIn(authData) {
    return axios.post(`${URL}/token/`, authData);
  }

  checkToken(token) {
    return axios.post(`${URL}/token/verify/`, token);
  }


  getCompaniesList() {
    return axios.get(`${URL}/companies/`);
  }

  getCompany(id) {
    return axios.get(`${URL}/companies/${id}`);
  }

  addCompany(company) {
    return axios.post(`${URL}/companies/`, company);
  }

  updateCompany(id, company) {
    return axios.put(`${URL}/companies/${id}/`, company);
  }

  deleteCompany(id) {
    return axios.delete(`${URL}/companies/${id}`);
  }

  addBankData(id, data) {
    return axios.post(`${URL}/companies/${id}/bank_details/`, data);
  }

  updateBankData(companyId, id, data) {
    return axios.put(`${URL}/companies/${companyId}/bank_details/${id}/`, data);
  }

  deleteBankData(companyId, id) {
    return axios.delete(`${URL}/companies/${companyId}/bank_details/${id}/`);
  }
}
