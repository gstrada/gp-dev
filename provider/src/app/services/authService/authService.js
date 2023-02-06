import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import {AUTH_CONFIG} from "../../fuse-configs/serverConfig";

class authService extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err && err.response && err.response.status === 403 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();
        if ( !access_token ) {
            this.emit('onNoAccessToken');
            return;
        }
        if ( this.isAuthTokenValid(access_token) ) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.post(`${AUTH_CONFIG.url}/api/provider/auth/login`, {
                email: email,
                password : password,
                player_id: this.getPlayerId()
            }).then(response => {
                if (response.data.code === 200) {
                    this.setSession(response.data.result.access_token);
                    this.setUserId(response.data.result.user.id);
                    resolve(response.data.result.user);
                } else {
                    reject(response.data.message);
                }
            });
        });
    };

    getProfile = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${AUTH_CONFIG.url}/api/provider/auth/profile`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Authorization': 'Bearer ' + this.getAccessToken(),
                },
            })
                .then(response => {
                    if (response.data.code === 200) {
                        this.setUserId(response.data.result.id);
                        resolve(response.data.result);
                    } else {
                        this.logout();
                        reject(response.data.message);
                    }
                })
                .catch(error => {
                    this.logout();
                    reject('No fue posible validar tu acceso, intentá nuevamente');
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    logout = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${AUTH_CONFIG.url}/api/provider/auth/logout`)
                .then(response => {
                    this.setSession(null);
                    this.setPlayerId(null);
                    this.setUserId(null);
                });
        });
    };

    isAuthTokenValid = access_token => {
        return access_token;
    };

    setSession = access_token => {
        if ( access_token ) {
            localStorage.setItem('auth_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        } else {
            localStorage.removeItem('auth_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    setPlayerId = player_id => {
        if ( player_id ) {
            localStorage.setItem('player_id', player_id);
        } else {
            localStorage.removeItem('player_id');
        }
    };

    setUserId = user_id => {
        if ( user_id ) {
            localStorage.setItem('user_id', user_id);
        } else {
            localStorage.removeItem('user_id');
        }
    };

    getAccessToken = () => {
        return localStorage.getItem('auth_access_token');
    };


    getPlayerId = () => {
        return window.localStorage.getItem('player_id');
    };

    getUserId = () => {
        return window.localStorage.getItem('user_id');
    };
}

const instance = new authService();

export default instance;
