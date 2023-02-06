import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_PROVIDERS = '[SERVICE_PROVIDER APP] GET_PROVIDERS';
export const PROVIDERS_CHANGE_PAGE = '[SERVICE_PROVIDER APP] PROVIDERS_CHANGE_PAGE';
export const PROVIDERS_INFO = '[SERVICE_PROVIDER APP] PROVIDERS_INFO';
export const SET_PROVIDERS = '[SERVICE_PROVIDER APP]  SET_PROVIDERS';

export const LOADING_PROVIDERS = '[SERVICE_PROVIDER APP] LOADING_PROVIDERS';
export const LOADING_METHOD_INFO = '[SERVICE_PROVIDER APP]  LOADING_METHOD_INFO';
export const LOADING_METHOD_CREATE = '[SERVICE_PROVIDER APP]  LOADING_METHOD_CREATE';

export function getProviders(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/providers`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_PROVIDERS,
                    payload: response.data.result,
                });
                dispatch(loadingProviders(false));
            }
        );
    }
}


export function changeProvidersPage(page) {
    return {
        type      : PROVIDERS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromProviders(item_id){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.provider.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/service_provider/providers/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getProviders(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getProviderInfo(provider_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/providers/show/${provider_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: PROVIDERS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProviderInfo(false));
        });
    }
}


export function createProvider(item){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.provider.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/service_provider/providers/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateProviderLogo(item.logo, id));
                }else{
                    dispatch(getProviders(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProviderCreate(false));
        });
    }
}

export function updateProviderItem(item){

    return (dispatch, getState) => {
        const page = getState().ProviderApp.provider.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/service_provider/providers/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateProviderLogo(item.logo, id));
                }else{
                    dispatch(getProviders(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProviderInfo(false));
        });
    }
}

export function updateProviderLogo(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().ProviderApp.provider.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/service_provider/providers/logo`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        request.then((response) => {
                if(response.data.code === 200){
                    //dispatch(setUserData(response.data.result));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
                dispatch(getProviders(page));
            }
        );
    }
}


export function loadingProviders(status) {
    return {
        type      : LOADING_PROVIDERS,
        payload   : status,
    }
}

export function loadingProviderInfo(status) {
    return {
        type      : LOADING_METHOD_INFO,
        payload   : status,
    }
}

export function loadingProviderCreate(status) {
    return {
        type      : LOADING_METHOD_CREATE,
        payload   : status,
    }
}

