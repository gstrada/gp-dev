import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CITIES = '[SHIPPING APP] GET_CITIES';
export const CITIES_CHANGE_PAGE = '[SHIPPING APP] CITIES_CHANGE_PAGE';
export const CITIES_INFO = '[SHIPPING APP] CITIES_INFO';
export const SET_CITIES = '[SHIPPING APP]  SET_CITIES';

export const SET_CARRIER_STATE_ID = '[SHIPPING APP]  SET_CARRIER_STATE_ID';

export const LOADING_CITIES = '[SHIPPING APP] LOADING_CITIES';
export const LOADING_CITY_INFO = '[SHIPPING APP]  LOADING_CITY_INFO';
export const LOADING_CITY_CREATE = '[SHIPPING APP]  LOADING_CITY_CREATE';


export const GET_STATE_CITIES = '[SHIPPING APP] GET_STATE_CITIES';

export function getCities(shipping_carrier_state_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/cities/${shipping_carrier_state_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CITIES,
                    payload: response.data.result,
                });
                dispatch(setCarrierStateId(shipping_carrier_state_id));
                dispatch(loadingCities(false));
            }
        );
    }
}

export function changeCitiesPage(page) {
    return {
        type      : CITIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function setCarrierStateId(carrier_state_id) {
    return {
        type      : SET_CARRIER_STATE_ID,
        payload   : carrier_state_id,
    }
}


export function removeFromCities(item_id){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.city.page;
        const carrier_state_id = getState().ShippingApp.city.carrier_state_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/shipping/cities/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCities(carrier_state_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCityInfo(city_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/shipping/cities/show/${city_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: CITIES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCityInfo(false));
        });
    }
}


export function createCity(item){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.city.page;
        const carrier_state_id = getState().ShippingApp.city.carrier_state_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/cities/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCities(carrier_state_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCityCreate(false));
        });
    }
}


export function updateCityItem(item){
    return (dispatch, getState) => {
        const page = getState().ShippingApp.city.page;
        const carrier_state_id = getState().ShippingApp.city.carrier_state_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/shipping/cities/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCities(carrier_state_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCityInfo(false));
        });
    }
}


export function loadingCities(status) {
    return {
        type      : LOADING_CITIES,
        payload   : status,
    }
}

export function loadingCityInfo(status) {
    return {
        type      : LOADING_CITY_INFO,
        payload   : status,
    }
}

export function loadingCityCreate(status) {
    return {
        type      : LOADING_CITY_CREATE,
        payload   : status,
    }
}

export function getStateCities(state_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/cities/json/${state_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_STATE_CITIES,
                    payload: response.data.result,
                });
            }
        );
    }
}

