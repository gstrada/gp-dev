import authRoles from "../auth/authRoles";

const navigationConfig = [

    {
        'id'      : 'provider-group',
        'title'   : 'Prestadores de Servicios',
        'type'    : 'group',
        'icon'    : 'apps',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'providers',
                'title'   : 'Prestadores',
                'type'    : 'item',
                'icon'    : 'group',
                'url'  : '/service-provider/providers',
                auth   : authRoles.admin,
            },
        ]
    },

    {
        'id'      : 'catalog-group',
        'title'   : 'Catálogo',
        'type'    : 'group',
        'icon'    : 'apps',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'discounts',
                'title'   : 'Descuentos',
                'type'    : 'item',
                'icon'    : 'money_off',
                'url'  : '/catalog/discounts',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'packs',
                'title'   : 'Packs',
                'type'    : 'item',
                'icon'    : 'collections_bookmark',
                'url'  : '/catalog/packs',
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
                'id'      : 'categories',
                'title'   : 'Categorías',
                'type'    : 'item',
                'icon'    : 'category',
                'url'  : '/catalog/categories',
                auth   : authRoles.admin,
            },
        ]
    },

    {
        'id'      : 'settings-group',
        'title'   : 'Configuración',
        'type'    : 'group',
        'icon'    : 'apps',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'countries',
                'title'   : 'Paises',
                'type'    : 'item',
                'icon'    : 'map',
                'url'  : '/location/countries',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'payment-methods',
                'title'   : 'Métodos de Pago',
                'type'    : 'item',
                'icon'    : 'attach_money',
                'url'  : '/payment/methods',
                auth   : authRoles.admin,
            },
            {
                'id'      : 'carriers',
                'title'   : 'Curriers',
                'type'    : 'item',
                'icon'    : 'local_shipping',
                'url'  : '/shipping/carriers',
                auth   : authRoles.admin,
            },
        ]
    },
    {
        'id'      : 'clients-group',
        'title'   : 'Clientes',
        'type'    : 'group',
        'icon'    : 'user',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : '-client-group',
                'title'   : 'Ver Clientes',
                'type'    : 'item',
                'icon'    : 'account_circle',
                'url'     : '/clients',
                auth   : authRoles.admin,
            }
        ]
    },
    {
        'id'      : 'states-group',
        'title'   : 'Pedidos',
        'type'    : 'group',
        'icon'    : 'user',
        auth   : authRoles.admin,
        'children': [
            {
                'id'      : 'sales',
                'title'   : 'Pedidos',
                'type'    : 'collapse',
                'icon' : 'shopping_cart',
                'url'  : '/states',
                auth   : authRoles.admin,
                'children': [
                    {
                        'id'   : 'states-pending',
                        'title': 'Pendientes',
                        'type' : 'item',
                        'url'  : '/sales/pending',
                        auth   : authRoles.admin,
                    }, {
                        'id'   : 'states-confirmed',
                        'title': 'Confirmados',
                        'type' : 'item',
                        'url'  : '/sales/confirmed',
                        auth   : authRoles.admin,
                    }, {
                        'id'   : 'states-dismissed',
                        'title': 'Rechazados',
                        'type' : 'item',
                        'url'  : '/sales/dismissed',
                        auth   : authRoles.admin,
                    },

                ]
            },
        ]
    },
    {
        'id'      : 'card-group',
        'title'   : 'Tarjetas',
        'type'    : 'group',
        'icon'    : 'credit_card',
        auth   : authRoles.admin,
        'children': [
            {
                'id'   : 'payment-history',
                'title': 'Historial de Pagos',
                'type' : 'collapse',
                'icon' : 'monetization_on',
                'url'  : '/card/payment/history',
                auth   : authRoles.admin,
                'children': [
                    {
                        'id'   : 'payment-history-pending',
                        'title': 'Pendientes',
                        'type' : 'item',
                        'url'  : '/card/payment/history/pending',
                        auth   : authRoles.admin,
                    }, {
                        'id'   : 'payment-history-confirmed',
                        'title': 'Confirmados',
                        'type' : 'item',
                        'url'  : '/card/payment/history/confirmed',
                        auth   : authRoles.admin,
                    }, {
                        'id'   : 'payment-history-dismissed',
                        'title': 'Rechazados',
                        'type' : 'item',
                        'url'  : '/card/payment/history/dismissed',
                        auth   : authRoles.admin,
                    },

                ]
            },
            {
                'id'   : 'card-history',
                'title': 'Historial de tarjetas',
                'type' : 'collapse',
                'icon' : 'credit_card',
                'url'  : '/card/history',
                auth   : authRoles.admin,
                'children': [
                    {
                        'id'   : 'card-history-modify',
                        'title': 'Editar Tarjeta',
                        'type' : 'item',
                        'url'  : '/card/edit',
                        auth   : authRoles.admin,
                    }, {
                        'id'   : 'card-history-list',
                        'title': 'Ver Historial',
                        'type' : 'item',
                        'url'  : '/card/histories',
                        auth   : authRoles.admin,
                    },
                ]
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
