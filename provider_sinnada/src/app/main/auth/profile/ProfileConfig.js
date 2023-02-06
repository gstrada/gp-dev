import React from 'react';

export const ProfileConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/profile',
            component: React.lazy(() => import('./Profile'))
        }
    ]
};