import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const SEARCHING = '[CARD APP] SEARCHING';
export const SET_CARD = '[CARD APP] SET_CARD';
export const SET_CARDS = '[CARD APP] SET_CARDS';

export const SAVING = '[CARD APP] SAVING';
export const SAVED = '[CARD APP] SAVED';
export const CLEAR = '[CARD APP] CLEAR';

export function getCardByNumber(number){
    return (dispatch, getState) => {
        dispatch(clear());
        dispatch(searching(true));
        dispatch(saving(false));
        dispatch(saved(false));
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/find`, {
            number:number,
        });
        request.then((response) => {
            dispatch(searching(false));
            if(response.data.code === 200){
                dispatch({
                    type   : SET_CARD,
                    payload: response.data.result,
                });
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
        });
    }
}

export function getCardsByOrderId(number){
    return (dispatch, getState) => {
        dispatch(clear());
        dispatch(searching(true));
        dispatch(saving(false));
        dispatch(saved(false));
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/find-by-order-id`, {
            order_id:number,
        });
        request.then((response) => {
            dispatch(searching(false));
            if(response.data.code === 200){
                dispatch({
                    type   : SET_CARDS,
                    payload: response.data.result,
                });
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
        });
    }
}



export function modify(card_id, values){
    return (dispatch, getState) => {
        dispatch(saving(true));
        dispatch(saved(false));
        const request = axios.post(`${AUTH_CONFIG.url}/api/backend/card/update`, {
            card_id:card_id,
            values:values,
        });
        request.then((response) => {
            dispatch(saving(false));
            if(response.data.code === 200){
                dispatch(saved(true));
                dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
            }else{
                dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
            }
        });
    }
}

export function searching(status) {
    return {
        type      : SEARCHING,
        payload   : status,
    }
}

export function saving(status) {
    return {
        type      : SAVING,
        payload   : status,
    }
}

export function saved(status) {
    return {
        type      : SAVED,
        payload   : status,
    }
}

export function clear() {
    return {
        type      : CLEAR,
        payload   : [],
    }
}


