import history from '@history';
import axios from 'axios/index';
import {setDefaultSettings, setInitialSettings} from 'app/store/actions/fuse';
import _ from '@lodash';
import store from 'app/store';
import * as Actions from 'app/store/actions';
import authService from 'app/services/authService';
import {AUTH_CONFIG} from "../../../fuse-configs/serverConfig";

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

/**
 * Set User Data
 */
export function setUserData(user) {
    return (dispatch) => {
        dispatch(setDefaultSettings(user.settings));
        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}

/**
 * Update User Settings TODO: REMOVE
 */
export function updateUserSettings(settings) {
    return (dispatch, getState) => {
        const oldUser = getState().auth.user;
        const user = _.merge({}, oldUser, {data: {settings}});
        updateUserData(user);
        return dispatch(setUserData(user));
    }
}
/**
 * Update User Shortcuts TODO: REMOVE
 */
export function updateUserShortcuts(shortcuts) {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user,
                shortcuts
            }
        };
        updateUserData(newUser);
        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData() {
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser() {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        if ( !user.role || user.role.length === 0 ){
            return null;
        }
        history.push({
            pathname: '/'
        });
        authService.logout();
        dispatch(setInitialSettings());
        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Segments
 */
export function updateUserSegments(segments) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/segments`, {
            segments: segments
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update user logo from Auth
 */
export function updateUserLogo(logoFile) {
    return (dispatch) => {
        const form_data = new FormData();
        form_data.append('attachment', logoFile, logoFile.name);
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/logo`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Email
 */
export function updateUserEmail(email) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/email`, {
            email: email
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Password
 */
export function updateUserPassword(old_password, password, password_confirmation) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/password`, {
            old_password: old_password,
            password:password,
            password_confirmation:password_confirmation
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Name
 */
export function updateUserName(name) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/name`, {
            name: name
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Last Name
 */
export function updateUserLastName(lastname) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/lastname`, {
            lastname: lastname
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}


/**
 * Update User Phone
 */
export function updateUserPhone(phone) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/phone`, {
            phone: phone
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Website
 */
export function updateUserWebsite(website) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/website`, {
            website: website
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Address
 */
export function updateUserAddress(state, city, street_name, street_number, zip_code) {
    return (dispatch) => {
        const request = axios.post( `${AUTH_CONFIG.url}/api/provider/auth/profile/address`, {
            state: state,
            city: city,
            street_name: street_name,
            street_number: street_number,
            zip_code: zip_code,
        });
        request.then((response) => {
                if(response.data.code === 200){
                    dispatch(setUserData(response.data.result));
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'success'}));
                }else{
                    dispatch(Actions.showMessage({message: response.data.message, variant: 'error'}));
                }
            }
        );
    }
}

/**
 * Update User Data
 */
function updateUserData(user) {
    authService.updateUserData(user)
        .then((res) => {
            store.dispatch(setUserData(res.data.result));
            if(res.data.code === 200){
                store.dispatch(Actions.showMessage({message: "Tu información se guardó correctamente", variant: 'success'}));
            }else{
                store.dispatch(Actions.showMessage({message: res.data.message, variant: 'error'}));
            }
        })
        .catch(error => {
            store.dispatch(Actions.showMessage({message: error.message, variant: 'error'}));
        });

}
