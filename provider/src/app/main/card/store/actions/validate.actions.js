import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const VALIDATING = '[CARD APP] VALIDATING';
export const SET_PRODUCTS = '[CARD APP] SET_PRODUCTS';
export const EXCHANGING = '[CARD APP] EXCHANGING';
export const EXCHANGED = '[CARD APP] EXCHANGED';
export const CLEAR = '[CARD APP] CLEAR';

export function validate(card, cvv){
    return (dispatch, getState) => {
        dispatch(clear());
        dispatch(validating(true));
        dispatch(exchanging(false));
        dispatch(exchanged(false));
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/card/validate`, {
            card:card,
            cvv:cvv
        });
        request.then((response) => {
            dispatch(validating(false));
            if(response.data.code === 200){
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                dispatch({
                    type   : SET_PRODUCTS,
                    payload: response.data.result,
                });
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
        });
    }
}

export function exchange(card, cvv, product_id){
    return (dispatch, getState) => {
        dispatch(exchanging(true));
        dispatch(exchanged(false));
        const request = axios.post(`${AUTH_CONFIG.url}/api/provider/card/exchange`, {
            card:card,
            cvv:cvv,
            product_id:product_id,
        });
        request.then((response) => {
            dispatch(exchanging(false));
            if(response.data.code === 200){
                dispatch(exchanged(true));
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
        });
    }
}

export function validating(status) {
    return {
        type      : VALIDATING,
        payload   : status,
    }
}

export function exchanging(status) {
    return {
        type      : EXCHANGING,
        payload   : status,
    }
}

export function exchanged(status) {
    return {
        type      : EXCHANGED,
        payload   : status,
    }
}

export function clear() {
    return {
        type      : CLEAR,
        payload   : [],
    }
}


