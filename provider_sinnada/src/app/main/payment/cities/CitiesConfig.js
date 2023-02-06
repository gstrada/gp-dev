import React from 'react';
export const CitiesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/payment/cities/:payment_method_id/:payment_method_state_id',
            exact: true,
            component: React.lazy(() => import('./Cities'))
        },
    ]
};
