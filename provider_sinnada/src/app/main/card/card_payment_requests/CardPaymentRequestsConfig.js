import React from 'react';
export const CardPaymentRequestsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/payment/request',
            exact: true,
            component: React.lazy(() => import('./CardPaymentRequests'))
        },
    ]
};
