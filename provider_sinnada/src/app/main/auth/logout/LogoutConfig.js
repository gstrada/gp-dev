import {authRoles} from 'app/auth';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions';

export const LogoutConfig = {
    auth  : authRoles.admin,
    routes: [
        {
            path     : '/auth/logout',
            component: () => {
                store.dispatch(logoutUser());
                return 'Logging out..'
            }
        }
    ]
};

