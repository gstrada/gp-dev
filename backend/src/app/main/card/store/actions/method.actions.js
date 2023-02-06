import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_METHODS = '[PAYMENT APP] GET_METHODS';
export const METHODS_CHANGE_PAGE = '[PAYMENT APP] METHODS_CHANGE_PAGE';
export const METHODS_INFO = '[PAYMENT APP] METHODS_INFO';
export const SET_METHODS = '[PAYMENT APP]  SET_METHODS';

export const LOADING_METHODS = '[PAYMENT APP] LOADING_METHODS';
export const LOADING_METHOD_INFO = '[PAYMENT APP]  LOADING_METHOD_INFO';
export const LOADING_METHOD_CREATE = '[PAYMENT APP]  LOADING_METHOD_CREATE';

export function getMethods(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/payment/methods`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_METHODS,
                    payload: response.data.result,
                });
                dispatch(loadingMethods(false));
            }
        );
    }
}


export function changeMethodsPage(page) {
    return {
        type      : METHODS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromMethods(item_id){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.method.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/payment/methods/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getMethods(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getMethodInfo(method_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/payment/methods/${method_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: METHODS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingMethodInfo(false));
        });
    }
}


export function createMethod(item){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.method.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/payment/methods/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getMethods(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingMethodCreate(false));
        });
    }
}


export function updateMethodItem(item){

    return (dispatch, getState) => {
        const page = getState().PaymentApp.method.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/payment/methods/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getMethods(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingMethodInfo(false));
        });
    }
}


export function loadingMethods(status) {
    return {
        type      : LOADING_METHODS,
        payload   : status,
    }
}

export function loadingMethodInfo(status) {
    return {
        type      : LOADING_METHOD_INFO,
        payload   : status,
    }
}

export function loadingMethodCreate(status) {
    return {
        type      : LOADING_METHOD_CREATE,
        payload   : status,
    }
}

