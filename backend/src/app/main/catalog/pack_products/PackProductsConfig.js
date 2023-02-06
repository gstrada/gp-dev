import React from 'react';
export const PackProductsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {

            path     : '/catalog/packs/products/:pack_id',
            exact: true,
            component: React.lazy(() => import('./PackProducts'))
        },
    ]
};
