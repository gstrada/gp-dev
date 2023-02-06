import React from 'react';
export const DiscountsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/catalog/discounts',
            exact: true,
            component: React.lazy(() => import('./Discounts'))
        },
    ]
};
