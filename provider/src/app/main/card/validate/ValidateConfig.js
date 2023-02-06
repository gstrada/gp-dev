import React from 'react';

export const ValidateConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/validate',
            component: React.lazy(() => import('./Validate'))
        }
    ]
};
