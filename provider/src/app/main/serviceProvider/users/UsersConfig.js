import React from 'react';
export const UsersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {

            path     : '/service-provider/users/:provider_id',
            exact: true,
            component: React.lazy(() => import('./Users'))
        },
    ]
};
