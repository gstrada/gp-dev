import React from 'react';
export const CountriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/location/countries',
            exact: true,
            component: React.lazy(() => import('./Countries'))
        },
    ]
};
