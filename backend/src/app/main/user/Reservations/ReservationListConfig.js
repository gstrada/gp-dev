import React from 'react';
export const ReservationListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : 'clients/reservations',
            exact: true,
            component: React.lazy(() => import('./ReservationList'))
        },
    ]
};
