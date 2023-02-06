import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CATEGORIES = '[CATALOG CATEGORY APP] GET_CATEGORIES';
export const CATEGORIES_CHANGE_PAGE = '[CATALOG CATEGORY APP] CATEGORIES_CHANGE_PAGE';
export const CATEGORIES_INFO = '[CATALOG CATEGORY APP] CATEGORIES_INFO';
export const SET_CATEGORIES = '[CATALOG CATEGORY APP]  SET_CATEGORIES';

export const LOADING_CATEGORIES = '[CATALOG CATEGORY APP] LOADING_CATEGORIES';
export const LOADING_CATEGORY_INFO = '[CATALOG CATEGORY APP]  LOADING_CATEGORY_INFO';
export const LOADING_METHOD_CREATE = '[CATALOG CATEGORY APP]  LOADING_METHOD_CREATE';

export function getCategories(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/categories`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CATEGORIES,
                    payload: response.data.result,
                });
                dispatch(loadingCategories(false));
            }
        );
    }
}


export function changeCategoriesPage(page) {
    return {
        type      : CATEGORIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromCategories(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.category.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/categories/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getCategories(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getCategoryInfo(category_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/categories/show/${category_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: CATEGORIES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCategoryInfo(false));
        });
    }
}


export function createCategory(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.category.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/categories/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateCategoryPicture(item.logo, id));
                }else{
                    dispatch(getCategories(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCategoryCreate(false));
        });
    }
}

export function updateCategoryItem(item){

    return (dispatch, getState) => {
        const page = getState().CatalogApp.category.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/categories/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateCategoryPicture(item.logo, id));
                }else{
                    dispatch(getCategories(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingCategoryInfo(false));
        });
    }
}

export function updateCategoryPicture(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().CatalogApp.category.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/categories/picture`, form_data, {
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
                dispatch(getCategories(page));
            }
        );
    }
}


export function loadingCategories(status) {
    return {
        type      : LOADING_CATEGORIES,
        payload   : status,
    }
}

export function loadingCategoryInfo(status) {
    return {
        type      : LOADING_CATEGORY_INFO,
        payload   : status,
    }
}

export function loadingCategoryCreate(status) {
    return {
        type      : LOADING_METHOD_CREATE,
        payload   : status,
    }
}

