import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_PRODUCT_ADDRESSES = '[CATALOG PRODUCT_ADDRESS APP] GET_PRODUCT_ADDRESSES';
export const PRODUCT_ADDRESSES_CHANGE_PAGE = '[CATALOG PRODUCT_ADDRESS APP] PRODUCT_ADDRESSES_CHANGE_PAGE';
export const PRODUCT_ADDRESSES_INFO = '[CATALOG PRODUCT_ADDRESS APP] PRODUCT_ADDRESSES_INFO';
export const SET_PRODUCT_ADDRESSES = '[CATALOG PRODUCT_ADDRESS APP]  SET_PRODUCT_ADDRESSES';

export const SET_PRODUCT_ID = '[CATALOG PRODUCT_ADDRESS APP]  SET_PRODUCT_ID';

export const LOADING_PRODUCT_ADDRESSES = '[CATALOG PRODUCT_ADDRESS APP] LOADING_PRODUCT_ADDRESSES';
export const LOADING_PRODUCT_ADDRESS_INFO = '[CATALOG PRODUCT_ADDRESS APP]  LOADING_PRODUCT_ADDRESS_INFO';
export const LOADING_PRODUCT_ADDRESS_CREATE = '[CATALOG PRODUCT_ADDRESS APP]  LOADING_PRODUCT_ADDRESS_CREATE';

export const GET_PROVIDERS = '[CATALOG PRODUCT_ADDRESS APP] GET_PROVIDERS';
export const GET_PROVIDER_ADDRESSES = '[CATALOG PRODUCT_ADDRESS APP] GET_PROVIDER_ADDRESSES';

export function getProductAddresses(product_id, page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/product_addresses/${product_id}`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_PRODUCT_ADDRESSES,
                    payload: response.data.result,
                });
                dispatch(setProductId(product_id));
                dispatch(loadingProductAddresses(false));
            }
        );
    }
}

export function changeProductAddressesPage(page) {
    return {
        type      : PRODUCT_ADDRESSES_CHANGE_PAGE,
        payload   : page,
    }
}

export function setProductId(product_id) {
    return {
        type      : SET_PRODUCT_ID,
        payload   : product_id,
    }
}


export function removeFromProductAddresses(item_id){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.product_address.page;
        const product_id = getState().CatalogApp.product_address.product_id;
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/catalog/product_addresses/remove`, {
            id: item_id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getProductAddresses(product_id, page));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function getProductAddressInfo(product_addresses_id){
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/product_addresses/show/${product_addresses_id}`);
        request.then((response) => {
            if(response.data.code === 200){
                dispatch({
                    type: PRODUCT_ADDRESSES_INFO,
                    payload: response.data.result,
                })
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProductAddressInfo(false));
        });
    }
}


export function createProductAddress(item){
    return (dispatch, getState) => {
        const page = getState().CatalogApp.product_address.page;
        const product_id = getState().CatalogApp.product_address.product_id;
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/catalog/product_addresses/store`, {...item});
        request.then((response) => {
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch(getProductAddresses(product_id, page));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
            dispatch(loadingProductAddressCreate(false));
        });
    }
}

//
// export function updateProductAddressItem(item){
//     return (dispatch, getState) => {
//         const page = getState().CatalogApp.product_address.page;
//         const product_id = getState().CatalogApp.product_address.product_id;
//         const request = axios.post(`${AUTH_CONFIG.url}/api/provider/catalog/product_addresses/update`, {...item});
//         request.then((response) => {
//             if(response.data.code === 200){
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
//                 dispatch(getProductAddresses(product_id, page));
//             }else{
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//             }
//             dispatch(loadingProductAddressInfo(false));
//         });
//     }
// }


export function loadingProductAddresses(status) {
    return {
        type      : LOADING_PRODUCT_ADDRESSES,
        payload   : status,
    }
}

export function loadingProductAddressInfo(status) {
    return {
        type      : LOADING_PRODUCT_ADDRESS_INFO,
        payload   : status,
    }
}

export function loadingProductAddressCreate(status) {
    return {
        type      : LOADING_PRODUCT_ADDRESS_CREATE,
        payload   : status,
    }
}

export function getProviders() {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/service_provider/providers/json`);
        request.then((response) => {

                dispatch({
                    type   : GET_PROVIDERS,
                    payload: response.data.result,
                });
            }
        );
    }
}


export function getProviderAddresses(provider_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/service_provider/addresses/provider/json/${provider_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_PROVIDER_ADDRESSES,
                    payload: response.data.result,
                });
            }
        );
    }
}

