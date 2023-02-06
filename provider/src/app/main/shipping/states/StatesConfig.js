import React from 'react';
export const StatesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/shipping/states/:carrier_id',
            exact: true,
            component: React.lazy(() => import('./States'))
        },
    ]
};
