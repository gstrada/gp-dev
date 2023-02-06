import React from 'react';
import {Redirect} from 'react-router-dom';

export const SalesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/addresses/:status',
            component: React.lazy(() => import('./Sales'))
        },
        {
            path     : '/addresses',
            component: () => <Redirect to="/sales/pending"/>
        }
    ]
};
