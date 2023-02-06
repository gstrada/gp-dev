import React from 'react';
export const HistoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/payment/history/:status',
            exact: true,
            component: React.lazy(() => import('./Histories'))
        },
    ]
};
