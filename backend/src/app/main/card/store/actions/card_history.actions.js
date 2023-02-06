import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CARD_HISTORIES = '[CARD APP] GET_CARD_HISTORIES';
export const CARD_HISTORIES_CHANGE_PAGE = '[CARD APP] CARD_HISTORIES_CHANGE_PAGE';
export const CARD_HISTORIES_INFO = '[CARD APP] CARD_HISTORIES_INFO';

export const LOADING_CARD_HISTORIES = '[CARD APP] LOADING_CARD_HISTORIES';
export const LOADING_CARD_HISTORY_INFO = '[CARD APP]  LOADING_CARD_HISTORY_INFO';
export const LOADING_METHOD_CREATE = '[CARD APP]  LOADING_METHOD_CREATE';





export function getCardHistories(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/card/histories`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CARD_HISTORIES,
                    payload: response.data.result,
                });
                dispatch(loadingCardHistories(false));
            }
        );
    }
}


export function changeCardHistoriesPage(page) {
    return {
        type      : CARD_HISTORIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromCardHistories(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.card_history.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/card/histories/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCardHistories(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCardHistoryInfo(card_history_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/card/histories/show/${card_history_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: CARD_HISTORIES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCardHistoryInfo(false));
        });
    }
}


export function createCardHistory(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.card_history.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/histories/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateCardHistoryPicture(item.logo, id));
                }else{
                    dispatch(getCardHistories(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCardHistoryCreate(false));
        });
    }
}

export function updateCardHistoryItem(item){

    return (dispatch, getState) => {
        const page = getState().CatalogApp.card_history.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/histories/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateCardHistoryPicture(item.logo, id));
                }else{
                    dispatch(getCardHistories(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCardHistoryInfo(false));
        });
    }
}

export function updateCardHistoryPicture(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().CatalogApp.card_history.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/card/histories/picture`, form_data, {
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
                dispatch(getCardHistories(page));
            }
        );
    }
}


export function loadingCardHistories(status) {
    return {
        type      : LOADING_CARD_HISTORIES,
        payload   : status,
    }
}

export function loadingCardHistoryInfo(status) {
    return {
        type      : LOADING_CARD_HISTORY_INFO,
        payload   : status,
    }
}

export function loadingCardHistoryCreate(status) {
    return {
        type      : LOADING_METHOD_CREATE,
        payload   : status,
    }
}

