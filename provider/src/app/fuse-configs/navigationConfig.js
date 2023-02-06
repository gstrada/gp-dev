import authRoles from "../auth/authRoles";

const navigationConfig = [

    {
        'id'      : 'extra-group',
        'title'   : 'Extra',
        'type'    : 'group',
        'icon'    : 'user',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'extra-sistem-group',
                'title'   : 'Acceder al sistema anterior',
                'type'    : 'link',
                'icon'    : 'link',
                'url'     : 'https://bkp.goldenpack.com.ar/',
                auth   : authRoles.admin,
            },
        ]
    },
    {
        'id'      : 'card',
        'title'   : 'Tarjetas',
        'type'    : 'group',
        'icon'    : 'apps',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'validate_card',
                'title'   : 'Validar Código',
                'type'    : 'item',
                'icon'    : 'card_giftcard',
                'url'  : '/card/validate',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'products',
                'title'   : 'Productos',
                'type'    : 'item',
                'icon'    : 'fastfood',
                'url'  : '/catalog/products',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'card_history',
                'title'   : 'Historial de Tarjetas',
                'type'    : 'item',
                'icon'    : 'credit_card',
                'url'  : '/card/histories',
                auth   : authRoles.admin,
            },
        ]
    },
    {
        'id'      : 'payment',
        'title'   : 'Pagos',
        'type'    : 'group',
        'icon'    : 'apps',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'request_payment',
                'title'   : 'Solicitar Pago',
                'type'    : 'item',
                'icon'    : 'monetization_on',
                'url'  : '/card/payment/request',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'payment_history',
                'title'   : 'Historial de Pagos',
                'type'    : 'item',
                'icon'    : 'access_time',
                'url'  : '/card/payment/history',
                auth   : authRoles.admin,
            },
        ]
    },

    {
        'id'      : 'profile-group',
        'title'   : 'Perfil',
        'type'    : 'group',
        'icon'    : 'user',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'account-group',
                'title'   : 'Mi Cuenta',
                'type'    : 'item',
                'icon'    : 'account_circle',
                'url'     : '/profile',
                auth   : authRoles.admin,
            },
        ]
    },

];

export default navigationConfig;
