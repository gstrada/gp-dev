import React from 'react';
export const StatesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/payment/states/:payment_method_id',
            exact: true,
            component: React.lazy(() => import('./States'))
        },
    ]
};
