import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';
import {GET_COUNTRIES} from "../../../serviceProvider/store/actions";

export const GET_PRODUCTS = '[CATALOG PRODUCT APP] GET_PRODUCTS';
export const PRODUCTS_CHANGE_PAGE = '[CATALOG PRODUCT APP] PRODUCTS_CHANGE_PAGE';
export const PRODUCTS_INFO = '[CATALOG PRODUCT APP] PRODUCTS_INFO';
export const SET_PRODUCTS = '[CATALOG PRODUCT APP]  SET_PRODUCTS';

export const LOADING_PRODUCTS = '[CATALOG PRODUCT APP] LOADING_PRODUCTS';
export const LOADING_PRODUCT_INFO = '[CATALOG PRODUCT APP]  LOADING_PRODUCT_INFO';
export const LOADING_PRODUCT_CREATE = '[CATALOG PRODUCT APP]  LOADING_PRODUCT_CREATE';


export const GET_JSON_CATEGORIES = '[CATALOG PRODUCT APP] GET_JSON_CATEGORIES';
export const GET_JSON_PROVIDERS = '[CATALOG PRODUCT APP] GET_JSON_PROVIDERS';

export function getProducts(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/products`, {
            params: filters
        });
        request.then((response) => {
            console.log(response)
                dispatch({
                    type   : GET_PRODUCTS,
                    payload: response.data.result,
                });
                dispatch(loadingProducts(false));
            }
        );
    }
}


export function changeProductsPage(page) {
    return {
        type      : PRODUCTS_CHANGE_PAGE,
        payload   : page,
    }
}

export function removeFromProducts(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.product.page;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/products/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getProducts(page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getProductInfo(product_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/products/show/${product_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: PRODUCTS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProductInfo(false));
        });
    }
}


export function createProduct(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.product.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/products/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateProductPicture(item.logo, id));
                }else{
                    dispatch(getProducts(page));
                }
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProductCreate(false));
        });
    }
}

export function updateProductItem(item){

    return (dispatch, getState) => {
        const page = getState().CatalogApp.product.page;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/products/update`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                if(item.logo){
                    let id = response.data.result.id;
                    dispatch(updateProductPicture(item.logo, id));
                }else{
                    dispatch(getProducts(page));
                }

            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProductInfo(false));
        });
    }
}

export function updateProductPicture(logoFile, id) {
    return (dispatch, getState) => {
        const page = getState().CatalogApp.product.page;
        const form_data = new FormData();
        form_data.append('id', id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/products/picture`, form_data, {
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
                dispatch(getProducts(page));
            }
        );
    }
}


export function loadingProducts(status) {
    return {
        type      : LOADING_PRODUCTS,
        payload   : status,
    }
}

export function loadingProductInfo(status) {
    return {
        type      : LOADING_PRODUCT_INFO,
        payload   : status,
    }
}

export function loadingProductCreate(status) {
    return {
        type      : LOADING_PRODUCT_CREATE,
        payload   : status,
    }
}

export function getJsonCategories() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/categories/json`);
        request.then((response) => {
                dispatch({
                    type   : GET_JSON_CATEGORIES,
                    payload: response.data.result,
                });
            }
        );
    }
}

export function getJsonProviders() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/providers/json`);
        request.then((response) => {
                dispatch({
                    type   : GET_JSON_PROVIDERS,
                    payload: response.data.result,
                });
            }
        );
    }
}