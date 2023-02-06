import React from 'react';
export const ProductPicturesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {

            path     : '/catalog/products/pictures/:product_id',
            exact: true,
            component: React.lazy(() => import('./ProductPictures'))
        },
    ]
};
