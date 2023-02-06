import React from 'react';
export const CitiesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/shipping/cities/:carrier_id/:carrier_state_id',
            exact: true,
            component: React.lazy(() => import('./Cities'))
        },
    ]
};
