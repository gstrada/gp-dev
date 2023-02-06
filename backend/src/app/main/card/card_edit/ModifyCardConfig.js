import React from 'react';

export const ModifyCardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/card/edit',
            component: React.lazy(() => import('./ModifyCard'))
        }
    ]
};
