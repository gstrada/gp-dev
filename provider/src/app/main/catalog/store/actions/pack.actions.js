import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_PACKS = '[CATALOG PACK APP] GET_PACKS';
export const PACKS_CHANGE_PAGE = '[CATALOG PACK APP] PACKS_CHANGE_PAGE';
export const PACKS_INFO = '[CATALOG PACK APP] PACKS_INFO';
export const SET_PACKS = '[CATALOG PACK APP]  SET_PACKS';

export const LOADING_PACKS = '[CATALOG PACK APP] LOADING_PACKS';
export const LOADING_PACK_INFO = '[CATALOG PACK APP]  LOADING_PACK_INFO';
export const LOADING_PACK_CREATE = '[CATALOG PACK APP]  LOADING_PACK_CREATE';


export const GET_JSON_CATEGORIES = '[CATALOG APP] GET_JSON_CATEGORIES';

export function getPacks(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/packs`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_PACKS,
                    payload: response.data.result,
                });
                dispatch(loadingPacks(false));
            }
        );
    }
}


export function changePacksPage(page) {
    return {
        type      : PACKS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromPacks(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/catalog/packs/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getPacks(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getPackInfo(pack_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/packs/show/${pack_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: PACKS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingPackInfo(false));
        });
    }
}


export function createPack(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/catalog/packs/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updatePackPicture(item.logo, id));
                }else{
                    dispatch(getPacks(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingPackCreate(false));
        });
    }
}

export function updatePackItem(item){

    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/catalog/packs/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updatePackPicture(item.logo, id));
                }else{
                    dispatch(getPacks(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingPackInfo(false));
        });
    }
}

export function updatePackPicture(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/catalog/packs/picture`, form_data, {
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
                dispatch(getPacks(page));
            }
        );
    }
}


export function loadingPacks(status) {
    return {
        type      : LOADING_PACKS,
        payload   : status,
    }
}

export function loadingPackInfo(status) {
    return {
        type      : LOADING_PACK_INFO,
        payload   : status,
    }
}

export function loadingPackCreate(status) {
    return {
        type      : LOADING_PACK_CREATE,
        payload   : status,
    }
}

export function getJsonCategories() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/categories/json`);
        request.then((response) => {
                dispatch({
                    type   : GET_JSON_CATEGORIES,
                    payload: response.data.result,
                });
            }
        );
    }
}
