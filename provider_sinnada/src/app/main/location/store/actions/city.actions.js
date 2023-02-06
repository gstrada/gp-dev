import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CITIES = '[LOCATION STATE_CITY] GET_CITIES';
export const CITIES_CHANGE_PAGE = '[LOCATION STATE_CITY] CITIES_CHANGE_PAGE';
export const CITIES_INFO = '[LOCATION STATE_CITY] CITIES_INFO';
export const SET_CITIES = '[LOCATION STATE_CITY]  SET_CITIES';

export const SET_STATE_ID = '[LOCATION STATE_CITY APP]  SET_STATE_ID';

export const LOADING_CITIES = '[LOCATION STATE_CITY] LOADING_CITIES';
export const LOADING_CITY_INFO = '[LOCATION STATE_CITY]  LOADING_CITY_INFO';
export const LOADING_CITY_CREATE = '[LOCATION STATE_CITY]  LOADING_CITY_CREATE';

export function getCities(state_id, page) {

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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/cities/${state_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CITIES,
                    payload: response.data.result,
                });
                dispatch(setStateId(state_id));
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

export function setStateId(state_id) {
    return {
        type      : SET_STATE_ID,
        payload   : state_id,
    }
}


export function removeFromCities(item_id){
    return (dispatch, getState) => {
        const page = getState().LocationApp.city.page;
        const state_id = getState().LocationApp.city.state_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/location/cities/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCities(state_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCityInfo(city_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/cities/show/${city_id}`);
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
        const page = getState().LocationApp.city.page;
        const state_id = getState().LocationApp.city.state_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/location/cities/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCities(state_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCityCreate(false));
        });
    }
}


export function updateCityItem(item){

    return (dispatch, getState) => {
        const page = getState().LocationApp.city.page;
        const state_id = getState().LocationApp.city.state_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/location/cities/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCities(state_id, page));
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

