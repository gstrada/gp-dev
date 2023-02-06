import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_USERS = '[SERVICE_PROVIDER APP] GET_USERS';
export const USERS_CHANGE_PAGE = '[SERVICE_PROVIDER APP] USERS_CHANGE_PAGE';
export const SET_PROVIDER_ID = '[SERVICE_PROVIDER APP]  SET_PROVIDER_ID';

export const LOADING_USERS = '[SERVICE_PROVIDER APP] LOADING_USERS';
export const LOADING_USER_CREATE = '[SERVICE_PROVIDER APP]  LOADING_USER_CREATE';

export function getUsers(provider_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/service_provider/users/${provider_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_USERS,
                    payload: response.data.result,
                });
                dispatch(setProviderId(provider_id));
                dispatch(loadingUsers(false));
            }
        );
    }
}

export function changeUsersPage(page) {
    return {
        type      : USERS_CHANGE_PAGE,
        payload   : page,
    }
}

export function setProviderId(provider_id) {
    return {
        type      : SET_PROVIDER_ID,
        payload   : provider_id,
    }
}


export function removeFromUsers(item_id){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.address.page;
        const provider_id = getState().ProviderApp.address.provider_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/service_provider/users/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getUsers(provider_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function createUser(item){
    return (dispatch, getState) => {
        const page = getState().ProviderApp.address.page;
        const provider_id = getState().ProviderApp.address.provider_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/service_provider/users/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getUsers(provider_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingUserCreate(false));
        });
    }
}


export function loadingUsers(status) {
    return {
        type      : LOADING_USERS,
        payload   : status,
    }
}

export function loadingUserCreate(status) {
    return {
        type      : LOADING_USER_CREATE,
        payload   : status,
    }
}
