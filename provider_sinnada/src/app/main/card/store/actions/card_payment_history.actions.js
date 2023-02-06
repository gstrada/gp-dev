import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CARD_PAYMENT_HISTORIES = '[CARD APP] GET_CARD_PAYMENT_HISTORIES';
export const CARD_PAYMENT_HISTORIES_CHANGE_PAGE = '[CARD APP] CARD_PAYMENT_HISTORIES_CHANGE_PAGE';
export const LOADING_CARD_PAYMENT_HISTORIES = '[CARD APP] LOADING_CARD_PAYMENT_HISTORIES';


export function getCardPaymentHistories(page) {
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
        const history = axios.get(`${AUTH_CONFIG.url}/api/provider/card/payment/history`, {
            params: filters
        });
        history.then((response) => {
                dispatch({
                    type   : GET_CARD_PAYMENT_HISTORIES,
                    payload: response.data.result,
                });
                dispatch(loadingCardPaymentHistories(false));
            }
        );
    }
}


export function changeCardPaymentHistoriesPage(page) {
    return {
        type      : CARD_PAYMENT_HISTORIES_CHANGE_PAGE,
        payload   : page,
    }
}

export function historyPayment(invoice_number, invoice_file) {
    return (dispatch, getState) => {
        dispatch(loadingCardPaymentHistories(true));
        const page = getState().CardApp.payment_history.page;
        const form_data = new FormData();
        form_data.append('invoice_number', invoice_number);
        form_data.append('attachment', invoice_file, invoice_file.name);
        const history = axios.post( `${AUTH_CONFIG.url}/api/provider/card/payment/history`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        history.then((response) => {
            dispatch(loadingCardPaymentHistories(false));
                if(response.data.code === 200){
                    dispatch(getCardPaymentHistories(page));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
                dispatch(getCardPaymentHistories(page));
            }
        );
    }
}


export function loadingCardPaymentHistories(status) {
    return {
        type      : LOADING_CARD_PAYMENT_HISTORIES,
        payload   : status,
    }
}

