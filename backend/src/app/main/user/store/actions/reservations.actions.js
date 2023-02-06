import axios from 'axios/index';
import {AUTH_CONFIG} from "../../../../fuse-configs/serverConfig";
import * as Actions from 'app/store/actions';

import authService from 'app/services/authService';

export const GET_RESERVATIONS = '[CARD APP] GET_RESERVATIONLIST';
export const RESERVATIONS_CHANGE_PAGE = '[CARD APP] RESERVATIONS_CHANGE_PAGE';
export const RESERVATIONS_INFO = '[CARD APP] RESERVATIONS_INFO';
export const SET_RESERVATIONS = '[CARD APP]  SET_RESERVATIONS';

export const LOADING_RESERVATIONS = '[CARD APP] LOADING_RESERVATIONS';
export const LOADING_RESERVATIONS_INFO = '[CARD APP]  LOADING_RESERVATIONS_INFO';
// export const LOADING_RESERVATIONS_CREATE = '[CARD APP]  LOADING_RESERVATIONS_CREATE';
export const RESERVATIONS_CHANGE_STATUS = '[CARD APP]  USERLISTS_RESERVATIONS_STATUS';



export function getReservations(page, status) {
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
        const request = axios.get(`${AUTH_CONFIG.url}/api/backend/card/reservations`, {
            params: filters
        });
        request.then((response) => {
            dispatch({
                    type   : GET_RESERVATIONS,
                    payload: response.data.result,
                });
                dispatch(loadingReservations(false));
            }
        );
    }
}

// export function changeUserListsPage(page) {
//     return {
//         type      : USERLISTS_CHANGE_PAGE,
//         payload   : page,
//     }
// }
//
// export function changeUserListsStatus(status) {
//     return {
//         type      : USERLISTS_CHANGE_STATUS,
//         payload   : status,
//     }
// }
//
// export function removeFromUserLists(item_id){
//     return (dispatch, getState) => {
//         const page = getState().PaymentApp.city.page;
//         const card_method_state_id = getState().PaymentApp.city.card_method_state_id;
//         const request = axios.post( `${AUTH_CONFIG.url}/api/backend/clients/remove`, {
//             id: item_id
//         });
//         request.then((response) => {
//                 if(response.data.code === 200){
//                     dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
//                     dispatch(getUserLists(card_method_state_id, page));
//                 }else{
//                     dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//                 }
//             }
//         );
//     }
// }
//
// export function getUserListInfo(user_list_id){
//     return (dispatch) => {
//         const request = axios.get(`${AUTH_CONFIG.url}/api/backend/clients/show/${user_list_id}`);
//         request.then((response) => {
//             if(response.data.code === 200){
//
//                 dispatch({
//                     type: USERLISTS_INFO,
//                     payload: response.data.result,
//                 })
//             }else{
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//             }
//             dispatch(loadingUserListInfo(false));
//         });
//     }
// }
//
//
// export function createUserList(item){
//     return (dispatch, getState) => {
//         const page = getState().CardApp.user_list.page;
//         const status = getState().CardApp.user_list.status;
//         const request = axios.post(`${AUTH_CONFIG.url}/api/backend/clients/store`, {...item});
//         request.then((response) => {
//             if(response.data.code === 200){
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
//                 dispatch(getUserLists(page, status));
//             }else{
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//             }
//             dispatch(loadingUserListCreate(false));
//         });
//     }
// }
//
//
// export function updateUserListItem(item){
//     return (dispatch, getState) => {
//         const page = getState().CardApp.user_list.page;
//         const status = getState().CardApp.user_list.status;
//         const form_data = new FormData();
//         form_data.append('id', item.id);
//         form_data.append('paid', item.paid);
//         form_data.append('removed', item.removed);
//         form_data.append('file', item.attachment);
//
//         const request = axios.post( `${AUTH_CONFIG.url}/api/backend/clients/update`, form_data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 // 'Authorization': 'Bearer ' + authService.getAccessToken(),
//             }
//         });
//         request.then((response) => {
//             if(response.data.code === 200){
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
//                 dispatch(getUserLists(page, status));
//             }else{
//                 dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
//             }
//             dispatch(loadingUserListInfo(false));
//         });
//     }
// }


export function loadingReservations(status) {
    return {
        type      : LOADING_RESERVATIONS,
        payload   : status,
    }
}

export function loadingReservationsInfo(status) {
    return {
        type      : LOADING_RESERVATIONS_INFO,
        payload   : status,
    }
}

// export function loadingUserListCreate(status) {
//     return {
//         type      : LOADING_USERLIST_CREATE,
//         payload   : status,
//     }
// }
