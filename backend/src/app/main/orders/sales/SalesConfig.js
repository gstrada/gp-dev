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
            path     : '/sales/:status',
            component: React.lazy(() => import('./Sales'))
        },
        {
            path     : '/sales',
            component: () => <Redirect to="/sales/pending"/>
        }
    ]
};
