import React from 'react';
export const StatesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/location/states/:country_id',
            exact: true,
            component: React.lazy(() => import('./States'))
        },
    ]
};
