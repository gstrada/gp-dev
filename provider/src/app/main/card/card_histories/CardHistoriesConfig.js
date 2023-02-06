import React from 'react';
export const CardHistoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/histories',
            exact: true,
            component: React.lazy(() => import('./CardHistories'))
        },
    ]
};
