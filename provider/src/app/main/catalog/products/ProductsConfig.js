import React from 'react';
export const ProductsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/catalog/products',
            exact: true,
            component: React.lazy(() => import('./Products'))
        },
    ]
};
