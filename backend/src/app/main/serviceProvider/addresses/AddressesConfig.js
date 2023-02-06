import React from 'react';
export const AddressesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {

            path     : '/service-provider/addresses/:provider_id',
            exact: true,
            component: React.lazy(() => import('./Addresses'))
        },
    ]
};
