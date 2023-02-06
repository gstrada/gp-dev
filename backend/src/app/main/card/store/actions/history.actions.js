import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

import authService from 'app/services/authService';

export const GET_HISTORIES = '[CARD APP] GET_HISTORIES';
export const HISTORIES_CHANGE_PAGE = '[CARD APP] HISTORIES_CHANGE_PAGE';
export const HISTORIES_INFO = '[CARD APP] HISTORIES_INFO';
export const SET_HISTORIES = '[CARD APP]  SET_HISTORIES';

export const LOADING_HISTORIES = '[CARD APP] LOADING_HISTORIES';
export const LOADING_HISTORY_INFO = '[CARD APP]  LOADING_HISTORY_INFO';
export const LOADING_HISTORY_CREATE = '[CARD APP]  LOADING_HISTORY_CREATE';
export const HISTORIES_CHANGE_STATUS = '[CARD APP]  HISTORIES_CHANGE_STATUS';



export function getHistories(page, status) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/card/provider_request/`, {
            params: filters
        });
        request.then((response) => {
            dispatch({
                    type   : GET_HISTORIES,
                    payload: response.data.result,
                });
                dispatch(loadingHistories(false));
            }
        );
    }
}

export function changeHistoriesPage(page) {
    return {
        type      : HISTORIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function changeHistoriesStatus(status) {
    return {
        type      : HISTORIES_CHANGE_STATUS,
        payload   : status,
    }
}

export function removeFromHistories(item_id){
    return (dispatch, getState) => {
        const page = getState().PaymentApp.city.page;
        const card_method_state_id = getState().PaymentApp.city.card_method_state_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/card/provider_request/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getHistories(card_method_state_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getHistoryInfo(history_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/card/provider_request/show/${history_id}`);
        request.then((response) => {
            if(response.data.code === 200){

                dispatch({
                    type: HISTORIES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingHistoryInfo(false));
        });
    }
}


export function createHistory(item){
    return (dispatch, getState) => {
        const page = getState().CardApp.history.page;
        const status = getState().CardApp.history.status;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/provider_request/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getHistories(page, status));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingHistoryCreate(false));
        });
    }
}


export function updateHistoryItem(item){
    return (dispatch, getState) => {
        const page = getState().CardApp.history.page;
        const status = getState().CardApp.history.status;
        const form_data = new FormData();
        form_data.append('id', item.id);
        form_data.append('paid', item.paid);
        form_data.append('removed', item.removed);
        form_data.append('file', item.attachment);

        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/card/provider_request/update`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': 'Bearer ' + authService.getAccessToken(),
            }
        });
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getHistories(page, status));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingHistoryInfo(false));
        });
    }
}


export function loadingHistories(status) {
    return {
        type      : LOADING_HISTORIES,
        payload   : status,
    }
}

export function loadingHistoryInfo(status) {
    return {
        type      : LOADING_HISTORY_INFO,
        payload   : status,
    }
}

export function loadingHistoryCreate(status) {
    return {
        type      : LOADING_HISTORY_CREATE,
        payload   : status,
    }
}
