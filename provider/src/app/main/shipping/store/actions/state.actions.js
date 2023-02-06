import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_STATES = '[SHIPPING APP] GET_STATES';
export const STATES_CHANGE_PAGE = '[SHIPPING APP] STATES_CHANGE_PAGE';
export const STATES_INFO = '[SHIPPING APP] STATES_INFO';
export const SET_STATES = '[SHIPPING APP]  SET_STATES';

export const SET_CARRIER_ID = '[SHIPPING APP]  SET_CARRIER_ID';

export const LOADING_STATES = '[SHIPPING APP] LOADING_STATES';
export const LOADING_STATE_INFO = '[SHIPPING APP]  LOADING_STATE_INFO';
export const LOADING_STATE_CREATE = '[SHIPPING APP]  LOADING_STATE_CREATE';



export const GET_COUNTRIES = '[SHIPPING APP] GET_COUNTRIES';
export const GET_COUNTRY_STATES = '[SHIPPING APP] GET_COUNTRY_STATES';

export function getStates(shipping_carrier_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/states/${shipping_carrier_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_STATES,
                    payload: response.data.result,
                });
                dispatch(setCarrierId(shipping_carrier_id));
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

export function setCarrierId(carrier_id) {
    return {
        type      : SET_CARRIER_ID,
        payload   : carrier_id,
    }
}


export function removeFromStates(item_id){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.state.page;
        const carrier_id = getState().ShippingApp.state.carrier_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/shipping/states/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getStates(carrier_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getStateInfo(state_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/states/show/${state_id}`);
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
        const page = getState().ShippingApp.state.page;
        const carrier_id = getState().ShippingApp.state.carrier_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/states/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(carrier_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingStateCreate(false));
        });
    }
}


export function updateStateItem(item){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.state.page;
        const carrier_id = getState().ShippingApp.state.carrier_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/states/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getStates(carrier_id, page));
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

