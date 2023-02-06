import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_STATES = '[PAYMENT APP] GET_STATES';
export const STATES_CHANGE_PAGE = '[PAYMENT APP] STATES_CHANGE_PAGE';
export const STATES_INFO = '[PAYMENT APP] STATES_INFO';
export const SET_STATES = '[PAYMENT APP]  SET_STATES';

export const SET_METHOD_ID = '[PAYMENT APP]  SET_METHOD_ID';

export const LOADING_STATES = '[PAYMENT APP] LOADING_STATES';
export const LOADING_STATE_INFO = '[PAYMENT APP]  LOADING_STATE_INFO';
export const LOADING_STATE_CREATE = '[PAYMENT APP]  LOADING_STATE_CREATE';



export const GET_COUNTRIES = '[PAYMENT APP] GET_COUNTRIES';
export const GET_COUNTRY_STATES = '[PAYMENT APP] GET_COUNTRY_STATES';

export function getStates(payment_payment_method_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/payment/states/${payment_payment_method_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_STATES,
                    payload: response.data.result,
                });
                dispatch(setMethodId(payment_payment_method_id));
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

export function setMethodId(payment_method_id) {
    return {
        type      : SET_METHOD_ID,
        payload   : payment_method_id,
    }
}


export function removeFromStates(item_id){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.state.page;
        const payment_method_id = getState().PaymentApp.state.payment_method_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/payment/states/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getStates(payment_method_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getStateInfo(state_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/payment/states/show/${state_id}`);
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
        const page = getState().PaymentApp.state.page;
        const payment_method_id = getState().PaymentApp.state.payment_method_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/payment/states/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(payment_method_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingStateCreate(false));
        });
    }
}


export function updateStateItem(item){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.state.page;
        const payment_method_id = getState().PaymentApp.state.payment_method_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/payment/states/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(payment_method_id, page));
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

export function getCountries() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/countries/json`);
        request.then((response) => {

                dispatch({
                    type   : GET_COUNTRIES,
                    payload: response.data.result,
                });
            }
        );
    }
}


export function getCountryStates(country_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/states/json/${country_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_COUNTRY_STATES,
                    payload: response.data.result,
                });
            }
        );
    }
}

