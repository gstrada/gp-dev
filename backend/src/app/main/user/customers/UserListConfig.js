import React from 'react';
export const UserListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/clients',
            exact: true,
            component: React.lazy(() => import('./UserLists'))
        },
    ]
};
