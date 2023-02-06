import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

import authService from 'app/services/authService';

export const GET_USERLISTS = '[CARD APP] GET_USERLISTS';
export const USERLISTS_CHANGE_PAGE = '[CARD APP] USERLISTS_CHANGE_PAGE';
export const USERLISTS_INFO = '[CARD APP] USERLISTS_INFO';
export const SET_USERLISTS = '[CARD APP]  SET_USERLISTS';

export const LOADING_USERLISTS = '[CARD APP] LOADING_USERLISTS';
export const LOADING_USERLIST_INFO = '[CARD APP]  LOADING_USERLIST_INFO';
export const LOADING_USERLIST_CREATE = '[CARD APP]  LOADING_USERLIST_CREATE';
export const USERLISTS_CHANGE_STATUS = '[CARD APP]  USERLISTS_CHANGE_STATUS';



export function getUserLists(page, status) {
    return (dispatch) => {
        let filters = {
            'page[number]': page.current_page,
            'status': status
        };

        if(page.filters){
            page.filters.forEach(function(element) {
                let filter_name = 'filter['+element.value.filterType + '-' + element.id +']';
                let filter_value = element.value.filterValue;
                if(filter_value.length > 0){
                    filters[filter_name] = filter_value;
                }
            });
        }
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/clients`, {
            params: filters
        });
        request.then((response) => {
            console.log(response)
            dispatch({
                    type   : GET_USERLISTS,
                    payload: response.data.result,
                });
                dispatch(loadingUserLists(false));
            }
        );
    }
}

export function changeUserListsPage(page) {
    return {
        type      : USERLISTS_CHANGE_PAGE,
        payload   : page,
    }
}

export function changeUserListsStatus(status) {
    return {
        type      : USERLISTS_CHANGE_STATUS,
        payload   : status,
    }
}

export function removeFromUserLists(item_id){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.city.page;
        const card_method_state_id = getState().PaymentApp.city.card_method_state_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/clients/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getUserLists(card_method_state_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getUserListInfo(user_list_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/clients/show/${user_list_id}`);
        request.then((response) => {
            if(response.data.code === 200){

                dispatch({
                    type: USERLISTS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingUserListInfo(false));
        });
    }
}


export function createUserList(item){
    return (dispatch, getState) => {
        const page = getState().CardApp.user_list.page;
        const status = getState().CardApp.user_list.status;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/clients/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getUserLists(page, status));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingUserListCreate(false));
        });
    }
}


export function updateUserListItem(item){
    return (dispatch, getState) => {
        const page = getState().CardApp.user_list.page;
        const status = getState().CardApp.user_list.status;
        const form_data = new FormData();
        form_data.append('id', item.id);
        form_data.append('paid', item.paid);
        form_data.append('removed', item.removed);
        form_data.append('file', item.attachment);

        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/clients/update`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': 'Bearer ' + authService.getAccessToken(),
            }
        });
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getUserLists(page, status));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingUserListInfo(false));
        });
    }
}


export function loadingUserLists(status) {
    return {
        type      : LOADING_USERLISTS,
        payload   : status,
    }
}

export function loadingUserListInfo(status) {
    return {
        type      : LOADING_USERLIST_INFO,
        payload   : status,
    }
}

export function loadingUserListCreate(status) {
    return {
        type      : LOADING_USERLIST_CREATE,
        payload   : status,
    }
}
