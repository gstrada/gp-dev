import React from 'react';
export const ProvidersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/service-provider/providers',
            exact: true,
            component: React.lazy(() => import('./Providers'))
        },
    ]
};
