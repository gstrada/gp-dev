import React from 'react';
export const PacksConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/catalog/packs',
            exact: true,
            component: React.lazy(() => import('./Packs'))
        },
    ]
};
