import React from 'react';
export const CarriersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/shipping/carriers',
            exact: true,
            component: React.lazy(() => import('./Carriers'))
        },
    ]
};
