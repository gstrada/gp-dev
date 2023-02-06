import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_PRODUCT_PICTURES = '[CATALOG PRODUCT_PICTURE APP] GET_PRODUCT_PICTURES';
export const SET_PRODUCT_ID = '[CATALOG PRODUCT_PICTURE APP]  SET_PRODUCT_ID';
export const LOADING_PRODUCT_PICTURES = '[CATALOG PRODUCT_PICTURE APP] LOADING_PRODUCT_PICTURES';
export const LOADING_PRODUCT_PICTURE_CREATE = '[CATALOG PRODUCT_PICTURE APP]  LOADING_PRODUCT_PICTURE_CREATE';

export function getProductPictures(product_id) {
    return (dispatch) => {
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/catalog/product_picture/${product_id}`);
        request.then((response) => {
                dispatch({
                    type   : GET_PRODUCT_PICTURES,
                    payload: response.data.result,
                });
                dispatch(setProductId(product_id));
                dispatch(loadingProductPictures(false));
            }
        );
    }
}

export function setProductId(product_id) {
    return {
        type      : SET_PRODUCT_ID,
        payload   : product_id,
    }
}


export function removeFromProductPictures(item){
    return (dispatch, getState) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/catalog/product_picture/remove`, {
            id: item.id
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getProductPictures(item.product_id));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

export function createProductPicture(item ) {
    let product_id = item.product_id;
    let logoFile = item.logo;
    return (dispatch) => {
        const form_data = new FormData();
        form_data.append('product_id', product_id);
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/catalog/product_picture/store`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        request.then((response) => {
                if(response.data.code !== 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
                dispatch(getProductPictures(product_id));
            }
        );
    }
}

export function loadingProductPictures(status) {
    return {
        type      : LOADING_PRODUCT_PICTURES,
        payload   : status,
    }
}

export function loadingProductPictureCreate(status) {
    return {
        type      : LOADING_PRODUCT_PICTURE_CREATE,
        payload   : status,
    }
}
