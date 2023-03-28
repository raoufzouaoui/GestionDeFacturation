const BASE_URL = 'http://localhost:5000';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const FACTURE_URL = BASE_URL + '/api/factures';
export const CREATE_FACTURE_URL = FACTURE_URL + '/create';
export const UPDATE_FACTURE_URL = FACTURE_URL + '/update/';
export const EDIT_FACTURE_URL = FACTURE_URL + '/edit/';
export const DELETE_FACTURE_URL = FACTURE_URL + '/delete/';
export const GET_ALL_FACTURE_URL = FACTURE_URL + '/';
export const GET_ALL_FACTURE_FOR_CURRENT_USER_URL = FACTURE_URL + '/email';
export const GET_FACTURE_BY_ID_URL = FACTURE_URL + '/facture' + '/id';
export const PAY_FACTURE = FACTURE_URL + '/pay';
