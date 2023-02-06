import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import authRoles from "../auth/authRoles";


import {authConfigs} from "../main/auth/authConfigs";
import {errorsConfig} from "../main/errors/errorsConfig";
import {locationConfigs} from "../main/location/locationConfigs";
import {paymentConfigs} from "../main/payment/paymentConfigs";

import {orderConfigs} from "../main/orders/orderConfigs";
import {shippingConfigs} from "../main/shipping/shippingConfigs";
import {serviceProviderConfigs} from "../main/serviceProvider/serviceProviderConfigs";
import {catalogConfigs} from "../main/catalog/catalogConfigs";
import {cardConfigs} from "../main/card/cardConfigs";
import {userConfigs} from "../main/user/userConfigs";

const routeConfigs = [
    ...authConfigs,
    ...errorsConfig,
    ...locationConfigs,
    ...paymentConfigs,
    ...shippingConfigs,
    ...serviceProviderConfigs,
    ...catalogConfigs,
    ...orderConfigs,
    ...cardConfigs,
    ...userConfigs
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, authRoles.admin),
    {
        path    : '/',
        exact   : true,
        component: () => <Redirect to="/profile"/>
    },
    {
        component: () => <Redirect to="/errors/error-404"/>
    }
];

export default routes;
