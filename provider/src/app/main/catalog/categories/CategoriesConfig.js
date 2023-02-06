import React from 'react';
export const CategoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/catalog/categories',
            exact: true,
            component: React.lazy(() => import('./Categories'))
        },
    ]
};
