import React from 'react';
export const MethodsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/payment/methods',
            exact: true,
            component: React.lazy(() => import('./Methods'))
        },
    ]
};
