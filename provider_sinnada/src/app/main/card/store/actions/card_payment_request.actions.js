import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

export const GET_CARD_PAYMENT_REQUESTS = '[CARD APP] GET_CARD_PAYMENT_REQUESTS';
export const CARD_PAYMENT_REQUESTS_CHANGE_PAGE = '[CARD APP] CARD_PAYMENT_REQUESTS_CHANGE_PAGE';
export const CARD_PAYMENT_REQUESTS_INFO = '[CARD APP] CARD_PAYMENT_REQUESTS_INFO';

export const LOADING_CARD_PAYMENT_REQUESTS = '[CARD APP] LOADING_CARD_PAYMENT_REQUESTS';


export function getPayment() {
    return (dispatch, getState) => {
        const request = axios.get( `${AUTH_CONFIG.url}/api/provider/card/payment/request-info`);
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch({
                        type   : CARD_PAYMENT_REQUESTS_INFO,
                        payload: response.data.result,
                    });
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}


export function getCardPaymentRequests(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/provider/card/payment/pending-cards`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CARD_PAYMENT_REQUESTS,
                    payload: response.data.result,
                });
                dispatch(loadingCardPaymentRequests(false));
            }
        );
    }
}


export function changeCardPaymentRequestsPage(page) {
    return {
        type      : CARD_PAYMENT_REQUESTS_CHANGE_PAGE,
        payload   : page,
    }
}

export function requestPayment(invoice_number, invoice_file) {
    return (dispatch, getState) => {
        dispatch(loadingCardPaymentRequests(true));
        const page = getState().CardApp.payment_request.page;
        const form_data = new FormData();
        form_data.append('invoice_number', invoice_number);
        form_data.append('attachment', invoice_file, invoice_file.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/card/payment/request`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        request.then((response) => {
            dispatch(loadingCardPaymentRequests(false));
                if(response.data.code === 200){
                    dispatch(getPayment());
                    dispatch(getCardPaymentRequests(page));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
                dispatch(getCardPaymentRequests(page));
            }
        );
    }
}


export function loadingCardPaymentRequests(status) {
    return {
        type      : LOADING_CARD_PAYMENT_REQUESTS,
        payload   : status,
    }
}

