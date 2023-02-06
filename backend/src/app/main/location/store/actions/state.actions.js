import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_STATES = '[LOCATION COUNTRY_STATE] GET_STATES';
export const STATES_CHANGE_PAGE = '[LOCATION COUNTRY_STATE] STATES_CHANGE_PAGE';
export const STATES_INFO = '[LOCATION COUNTRY_STATE] STATES_INFO';
export const SET_STATES = '[LOCATION COUNTRY_STATE]  SET_STATES';

export const SET_COUNTRY_ID = '[LOCATION COUNTRY_STATE APP]  SET_COUNTRY_ID';

export const LOADING_STATES = '[LOCATION COUNTRY_STATE] LOADING_STATES';
export const LOADING_STATE_INFO = '[LOCATION COUNTRY_STATE]  LOADING_STATE_INFO';
export const LOADING_STATE_CREATE = '[LOCATION COUNTRY_STATE]  LOADING_STATE_CREATE';

export function getStates(country_id, page) {

    return (dispatch) => {
        let filters = { 'page[number]': page.current_page };
        if(page.filters){
            page.filters.forEach(function(element) {
                let filter_name = 'filter['+element.value.filterType + '-' + element.id +']';
                let filter_value = element.value.filterValue;
                if(filter_value.length > 0){
                    filters[filter_name] = filter_value;
                }
            });
        }
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/location/states/${country_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_STATES,
                    payload: response.data.result,
                });
                dispatch(setCountryId(country_id));
                dispatch(loadingStates(false));
            }
        );
    }
}

export function changeStatesPage(page) {
    return {
        type      : STATES_CHANGE_PAGE,
        payload   : page,
    }
}

export function setCountryId(country_id) {
    return {
        type      : SET_COUNTRY_ID,
        payload   : country_id,
    }
}


export function removeFromStates(item_id){
    return (dispatch, getState) => {
        const page = getState().LocationApp.state.page;
        const country_id = getState().LocationApp.state.country_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/location/states/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getStates(country_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getStateInfo(state_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/location/states/show/${state_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: STATES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingStateInfo(false));
        });
    }
}


export function createState(item){
    return (dispatch, getState) => {
        const page = getState().LocationApp.state.page;
        const country_id = getState().LocationApp.state.country_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/location/states/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(country_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingStateCreate(false));
        });
    }
}


export function updateStateItem(item){

    return (dispatch, getState) => {
        const page = getState().LocationApp.state.page;
        const country_id = getState().LocationApp.state.country_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/location/states/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(country_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingStateInfo(false));
        });
    }
}


export function loadingStates(status) {
    return {
        type      : LOADING_STATES,
        payload   : status,
    }
}

export function loadingStateInfo(status) {
    return {
        type      : LOADING_STATE_INFO,
        payload   : status,
    }
}

export function loadingStateCreate(status) {
    return {
        type      : LOADING_STATE_CREATE,
        payload   : status,
    }
}

