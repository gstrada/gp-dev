import React from 'react';
export const CitiesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/location/cities/:country_id/:state_id',
            exact: true,
            component: React.lazy(() => import('./Cities'))
        },
    ]
};
