import {REQUEST_SIGN_UP,RECEIVE_SIGN_UP,ERROR_SIGN_UP} from './types';
import {_signUp} from '../../api';
import { browserHistory } from 'react-router'


function requestSignUp() {
  return {
    type: REQUEST_SIGN_UP
  }
}
function errorSignUp(error) {
  return {
    type: ERROR_SIGN_UP,
    error
  }
}
const receiveSignUp = (user) => {
  return {
    type: RECEIVE_SIGN_UP,
    user
  }
};

export const signUp = (params) => {
  return dispatch => {
    dispatch(requestSignUp(params));
    return _signUp().then(function (response) {
      sessionStorage.setItem('user',JSON.stringify(response.data));
      dispatch(receiveSignUp(response.data));
      browserHistory.push('/');
    }).catch(function (ex) {
      dispatch(errorSignUp(ex));
    });
  }
};
