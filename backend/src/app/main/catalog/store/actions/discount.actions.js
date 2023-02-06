import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_DISCOUNTS = '[CATALOG DISCOUNT APP] GET_DISCOUNTS';
export const DISCOUNTS_CHANGE_PAGE = '[CATALOG DISCOUNT APP] DISCOUNTS_CHANGE_PAGE';
export const DISCOUNTS_INFO = '[CATALOG DISCOUNT APP] DISCOUNTS_INFO';
export const SET_DISCOUNTS = '[CATALOG DISCOUNT APP]  SET_DISCOUNTS';

export const LOADING_DISCOUNTS = '[CATALOG DISCOUNT APP] LOADING_DISCOUNTS';
export const LOADING_DISCOUNT_INFO = '[CATALOG DISCOUNT APP]  LOADING_DISCOUNT_INFO';
export const LOADING_METHOD_CREATE = '[CATALOG DISCOUNT APP]  LOADING_METHOD_CREATE';

export function getDiscounts(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/discounts`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_DISCOUNTS,
                    payload: response.data.result,
                });
                dispatch(loadingDiscounts(false));
            }
        );
    }
}


export function changeDiscountsPage(page) {
    return {
        type      : DISCOUNTS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromDiscounts(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.discount.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/discounts/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getDiscounts(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getDiscountInfo(discount_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/discounts/show/${discount_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: DISCOUNTS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingDiscountInfo(false));
        });
    }
}


export function createDiscount(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.discount.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/discounts/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateDiscountPicture(item.logo, id));
                }else{
                    dispatch(getDiscounts(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingDiscountCreate(false));
        });
    }
}

export function updateDiscountItem(item){

    return (dispatch, getState) => {
        const page = getState().CatalogApp.discount.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/discounts/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateDiscountPicture(item.logo, id));
                }else{
                    dispatch(getDiscounts(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingDiscountInfo(false));
        });
    }
}

export function updateDiscountPicture(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().CatalogApp.discount.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/discounts/picture`, form_data, {
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
                dispatch(getDiscounts(page));
            }
        );
    }
}


export function loadingDiscounts(status) {
    return {
        type      : LOADING_DISCOUNTS,
        payload   : status,
    }
}

export function loadingDiscountInfo(status) {
    return {
        type      : LOADING_DISCOUNT_INFO,
        payload   : status,
    }
}

export function loadingDiscountCreate(status) {
    return {
        type      : LOADING_METHOD_CREATE,
        payload   : status,
    }
}

