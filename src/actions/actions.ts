import axios from 'axios';
import moment from 'moment';
import * as actionTypes from './actionTypes';

const baseUrl = 'http://api-staging.qualitykitchen.co';

export function checkDevice(deviceName: string): (dispatch: Function) => void {
  const url = `${baseUrl}/operation/lookup/${deviceName}`;
  return function(dispatch: Function): void {
    dispatch({
      type: actionTypes.DEVICE_REGISTRATION_LOADING,
      response: {
        deviceName
      }
    });

    axios.get(url)
      .then(response => {
        dispatch({
          type: actionTypes.DEVICE_REGISTRATION_SUCCESS,
          response
        });

        const operationId = response.data.id;
        fetchTasks(operationId, dispatch);
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: actionTypes.DEVICE_REGISTRATION_ERROR
        });
      });
  };
}

function fetchTasks(operationId: string, dispatch: Function) {
  const due = moment().format('L');
  const url = `${baseUrl}/operations/${operationId}/tasks?due=${due}`;

  dispatch({
      type: actionTypes.FETCH_TASKS_LOADING
    });

  axios.get(url)
    .then(response => {
      dispatch({
        type: actionTypes.FETCH_TASKS_SUCCESS,
        response
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_TASKS_ERROR
      });
    });
}

export function signIn(operationId: string, code: string): (dispatch: Function) => void {
  const url = `${baseUrl}/operations/${operationId}/sign-in`;

  return function(dispatch: Function): void {
    dispatch({
      type: actionTypes.FETCH_USER_LOADING
    });

    axios.post(url, {
      employeeCode: code
    })
      .then(response => {
        dispatch({
          type: actionTypes.FETCH_USER_SUCCESS,
          response
        });
      })
      .catch(e => {
        dispatch({
          type: actionTypes.FETCH_USER_ERROR
        });
      });
  }
}

export function signOut(): (dispatch: Function) => void {
  return function(dispatch: Function): void {
    dispatch({
      type: actionTypes.SIGN_OUT
    });
  }
}

export function userCheckedIn(taskGroups: string[]): (dispatch: Function) => void {
  return function(dispatch: Function): void {
    dispatch({
      type: actionTypes.USER_CHECKED_IN,
      taskGroups
    });
  }
}
