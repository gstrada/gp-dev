import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_ADDRESSES = '[SERVICE_PROVIDER APP] GET_ADDRESSES';
export const ADDRESSES_CHANGE_PAGE = '[SERVICE_PROVIDER APP] ADDRESSES_CHANGE_PAGE';
export const ADDRESSES_INFO = '[SERVICE_PROVIDER APP] ADDRESSES_INFO';
export const SET_ADDRESSES = '[SERVICE_PROVIDER APP]  SET_ADDRESSES';

export const SET_PROVIDER_ID = '[SERVICE_PROVIDER APP]  SET_PROVIDER_ID';

export const LOADING_ADDRESSES = '[SERVICE_PROVIDER APP] LOADING_ADDRESSES';
export const LOADING_ADDRESS_INFO = '[SERVICE_PROVIDER APP]  LOADING_ADDRESS_INFO';
export const LOADING_ADDRESS_CREATE = '[SERVICE_PROVIDER APP]  LOADING_ADDRESS_CREATE';

export const GET_COUNTRIES = '[SERVICE_PROVIDER APP] GET_COUNTRIES';
export const GET_COUNTRY_STATES = '[SERVICE_PROVIDER APP] GET_COUNTRY_STATES';
export const GET_STATE_CITIES = '[SERVICE_PROVIDER APP] GET_STATE_CITIES';


export function getAddresses(provider_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/addresses/${provider_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_ADDRESSES,
                    payload: response.data.result,
                });
                dispatch(setProviderId(provider_id));
                dispatch(loadingAddresses(false));
            }
        );
    }
}

export function changeAddressesPage(page) {
    return {
        type      : ADDRESSES_CHANGE_PAGE,
        payload   : page,
    }
}

export function setProviderId(provider_id) {
    return {
        type      : SET_PROVIDER_ID,
        payload   : provider_id,
    }
}

export function removeFromAddresses(item_id){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.address.page;
        const provider_id = getState().ProviderApp.address.provider_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/service_provider/addresses/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getAddresses(provider_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getAddressInfo(address_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/addresses/show/${address_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: ADDRESSES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingAddressInfo(false));
        });
    }
}

export function createAddress(item){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.address.page;
        const provider_id = getState().ProviderApp.address.provider_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/service_provider/addresses/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getAddresses(provider_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingAddressCreate(false));
        });
    }
}

export function updateAddressItem(item){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.address.page;
        const provider_id = getState().ProviderApp.address.provider_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/service_provider/addresses/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getAddresses(provider_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingAddressInfo(false));
        });
    }
}

export function loadingAddresses(status) {
    return {
        type      : LOADING_ADDRESSES,
        payload   : status,
    }
}

export function loadingAddressInfo(status) {
    return {
        type      : LOADING_ADDRESS_INFO,
        payload   : status,
    }
}

export function loadingAddressCreate(status) {
    return {
        type      : LOADING_ADDRESS_CREATE,
        payload   : status,
    }
}

export function getCountries() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/location/countries/json`);
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/location/states/json/${country_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_COUNTRY_STATES,
                    payload: response.data.result,
                });
            }
        );
    }
}

export function getStateCities(state_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/location/cities/json/${state_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_STATE_CITIES,
                    payload: response.data.result,
                });
            }
        );
    }
}


