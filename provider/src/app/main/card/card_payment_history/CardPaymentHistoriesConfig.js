import React from 'react';
export const CardPaymentHistoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/payment/history',
            exact: true,
            component: React.lazy(() => import('./CardPaymentHistories'))
        },
    ]
};
