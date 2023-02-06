import React from 'react';

export const ClientsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/counties',
            component: React.lazy(() => import('./Clients'))
        },
    ]
};
