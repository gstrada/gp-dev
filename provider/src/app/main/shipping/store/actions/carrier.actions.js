import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CARRIERS = '[SHIPPING APP] GET_CARRIERS';
export const CARRIERS_CHANGE_PAGE = '[SHIPPING APP] CARRIERS_CHANGE_PAGE';
export const CARRIERS_INFO = '[SHIPPING APP] CARRIERS_INFO';
export const SET_CARRIERS = '[SHIPPING APP]  SET_CARRIERS';

export const LOADING_CARRIERS = '[SHIPPING APP] LOADING_CARRIERS';
export const LOADING_CARRIER_INFO = '[SHIPPING APP]  LOADING_CARRIER_INFO';
export const LOADING_CARRIER_CREATE = '[SHIPPING APP]  LOADING_CARRIER_CREATE';

export function getCarriers(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/carriers`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CARRIERS,
                    payload: response.data.result,
                });
                dispatch(loadingCarriers(false));
            }
        );
    }
}


export function changeCarriersPage(page) {
    return {
        type      : CARRIERS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromCarriers(item_id){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.carrier.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/shipping/carriers/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCarriers(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCarrierInfo(carrier_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/carriers/${carrier_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: CARRIERS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCarrierInfo(false));
        });
    }
}


export function createCarrier(item){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.carrier.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/carriers/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCarriers(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCarrierCreate(false));
        });
    }
}


export function updateCarrierItem(item){

    return (dispatch, getState) => {
        const page = getState().ShippingApp.carrier.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/carriers/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCarriers(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCarrierInfo(false));
        });
    }
}


export function loadingCarriers(status) {
    return {
        type      : LOADING_CARRIERS,
        payload   : status,
    }
}

export function loadingCarrierInfo(status) {
    return {
        type      : LOADING_CARRIER_INFO,
        payload   : status,
    }
}

export function loadingCarrierCreate(status) {
    return {
        type      : LOADING_CARRIER_CREATE,
        payload   : status,
    }
}

