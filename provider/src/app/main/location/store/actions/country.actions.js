import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_COUNTRIES = '[LOCATION COUNTRY APP] GET_COUNTRIES';
export const COUNTRIES_CHANGE_PAGE = '[LOCATION COUNTRY APP] COUNTRIES_CHANGE_PAGE';
export const COUNTRIES_INFO = '[LOCATION COUNTRY APP] COUNTRIES_INFO';
export const SET_COUNTRIES = '[LOCATION COUNTRY APP]  SET_COUNTRIES';

export const LOADING_COUNTRIES = '[LOCATION COUNTRY APP] LOADING_COUNTRIES';
export const LOADING_COUNTRY_INFO = '[LOCATION COUNTRY APP]  LOADING_COUNTRY_INFO';
export const LOADING_COUNTRY_CREATE = '[LOCATION COUNTRY APP]  LOADING_COUNTRY_CREATE';

export function getCountries(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/countries`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_COUNTRIES,
                    payload: response.data.result,
                });
                dispatch(loadingCountries(false));
            }
        );
    }
}


export function changeCountriesPage(page) {
    return {
        type      : COUNTRIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromCountries(item_id){
    return (dispatch, getState) => {
        const page = getState().LocationApp.country.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/location/countries/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCountries(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCountryInfo(country_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/location/countries/show/${country_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: COUNTRIES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCountryInfo(false));
        });
    }
}


export function createCountry(item){
    return (dispatch, getState) => {
        const page = getState().LocationApp.country.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/location/countries/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCountries(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCountryCreate(false));
        });
    }
}


export function updateCountryItem(item){

    return (dispatch, getState) => {
        const page = getState().LocationApp.country.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/location/countries/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getCountries(page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCountryInfo(false));
        });
    }
}


export function loadingCountries(status) {
    return {
        type      : LOADING_COUNTRIES,
        payload   : status,
    }
}

export function loadingCountryInfo(status) {
    return {
        type      : LOADING_COUNTRY_INFO,
        payload   : status,
    }
}

export function loadingCountryCreate(status) {
    return {
        type      : LOADING_COUNTRY_CREATE,
        payload   : status,
    }
}

