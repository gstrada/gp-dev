import React from 'react';
export const ProductAddressesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {

            path     : '/catalog/products/addresses/:product_id',
            exact: true,
            component: React.lazy(() => import('./ProductAddresses'))
        },
    ]
};
