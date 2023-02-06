import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_PACK_PRODUCTS = '[CATALOG PACK PRODUCT APP] GET_PACK_PRODUCTS';
export const PACK_PRODUCTS_CHANGE_PAGE = '[CATALOG PACK PRODUCT APP] PACK_PRODUCTS_CHANGE_PAGE';
export const PACK_PRODUCTS_INFO = '[CATALOG PACK PRODUCT APP] PACK_PRODUCTS_INFO';
export const SET_PACK_PRODUCTS = '[CATALOG PACK PRODUCT APP]  SET_PACK_PRODUCTS';

export const SET_PACK_ID = '[CATALOG APP]  PACK PRODUCT APP';

export const LOADING_PACK_PRODUCTS = '[CATALOG PACK PRODUCT APP] LOADING_PACK_PRODUCTS';
export const LOADING_PACK_PRODUCT_INFO = '[CATALOG PACK PRODUCT APP]  LOADING_PACK_PRODUCT_INFO';
export const LOADING_PACK_PRODUCT_CREATE = '[CATALOG PACK PRODUCT APP]  LOADING_PACK_PRODUCT_CREATE';

export const GET_PROVIDERS = '[CATALOG PACK PRODUCT APP] GET_PROVIDERS';
export const GET_PROVIDER_PRODUCTS = '[CATALOG PACK PRODUCT APP] GET_PROVIDER_PRODUCTS';

export function getPackProducts(pack_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/pack_products/${pack_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_PACK_PRODUCTS,
                    payload: response.data.result,
                });
                dispatch(setPackId(pack_id));
                dispatch(loadingPackProducts(false));
            }
        );
    }
}

export function changePackProductsPage(page) {
    return {
        type      : PACK_PRODUCTS_CHANGE_PAGE,
        payload   : page,
    }
}

export function setPackId(pack_id) {
    return {
        type      : SET_PACK_ID,
        payload   : pack_id,
    }
}


export function removeFromPackProducts(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack_product.page;
        const pack_id = getState().CatalogApp.pack_product.pack_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/catalog/pack_products/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getPackProducts(pack_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getPackProductInfo(pack_product_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/pack_products/show/${pack_product_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: PACK_PRODUCTS_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingPackProductInfo(false));
        });
    }
}


export function createPackProduct(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.pack_product.page;
        const pack_id = getState().CatalogApp.pack_product.pack_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/pack_products/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getPackProducts(pack_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingPackProductCreate(false));
        });
    }
}

//
// export function updatePackProductItem(item){
//     return (dispatch, getState) => {
//         const page = getState().CatalogApp.pack_product.page;
//         const pack_id = getState().CatalogApp.pack_product.pack_id;
//         const request = axios.post(`${AUTH_CONFIG.url}/api/backend/catalog/pack_products/update`, {...item});
//         request.then((response) => {
//             if(response.data.code === 200){
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
//                 dispatch(getPackProducts(pack_id, page));
//             }else{
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//             }
//             dispatch(loadingPackProductInfo(false));
//         });
//     }
// }


export function loadingPackProducts(status) {
    return {
        type      : LOADING_PACK_PRODUCTS,
        payload   : status,
    }
}

export function loadingPackProductInfo(status) {
    return {
        type      : LOADING_PACK_PRODUCT_INFO,
        payload   : status,
    }
}

export function loadingPackProductCreate(status) {
    return {
        type      : LOADING_PACK_PRODUCT_CREATE,
        payload   : status,
    }
}

export function getProviders() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/service_provider/providers/json`);
        request.then((response) => {

                dispatch({
                    type   : GET_PROVIDERS,
                    payload: response.data.result,
                });
            }
        );
    }
}


export function getProviderProducts(provider_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/catalog/products/provider/json/${provider_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_PROVIDER_PRODUCTS,
                    payload: response.data.result,
                });
            }
        );
    }
}

