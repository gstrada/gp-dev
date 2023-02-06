import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';


export const GET_SALES = '[ORDER APP] GET SALES';
export const SALES_CHANGE_PAGE = '[ORDER APP] SALES_CHANGE_PAGE';
export const LOADING_SALES = '[ORDER APP] LOADING SALES';

export function getSales(page, status) {
    return (dispatch) => {
        let filters = {
            'page[number]': page.current_page,
            'status': status
        };
        if(page.filters){
            page.filters.forEach(function(element) {
                let filter_name = 'filter['+element.value.filterType + '-' + element.id +']';
                let filter_value = element.value.filterValue;
                if(filter_value.length > 0){
                    filters[filter_name] = filter_value;
                }
            });
        }
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/sales/list`, {
            params: filters
        });
        request.then((response) => {
                dispatch(loadingSales(false));
                dispatch({
                    type   : GET_SALES,
                    payload: response.data.result,
                    status: status,
                });
            }
        );
    }
}

/**
 * Update User Segments
 */
export function updateSaleStatus(id, status) {
    return (dispatch, getState) => {
        const page = getState().OrderApp.sales.page;
        const state = getState().OrderApp.sales.status;
        const request = axios.post( `${AUTH_CONFIG.url}/api/backend/sales/set/status`, {
            id: id,
            status: status
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                    dispatch(getSales(page, state));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}


export function changeSalesPage(page) {
    return {
        type      : SALES_CHANGE_PAGE,
        payload   : page,
    }
}

export function loadingSales(status) {
    return {
        type      : LOADING_SALES,
        payload   : status,
    }
}
