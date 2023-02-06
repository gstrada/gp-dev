import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";

export const GET_CLIENTS = '[ORDER APP] GET CLIENTS';
export const LOADING_CLIENTS = '[ORDER APP] LOADING CLIENTS';

export function getClients(page) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/retail/clients/list`, {
            params: filters
        });
        request.then((response) => {
                dispatch({
                    type   : GET_CLIENTS,
                    payload: response.data.result,
                });
                dispatch(loadingClients(false));
            }
        );
    }
}

export function loadingClients(status) {
    return {
        type      : LOADING_CLIENTS,
        payload   : status,
    }
}