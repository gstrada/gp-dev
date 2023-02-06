import * as Actions from '../actions';

const initialState = {
    id: 0,
    name: "Cargando...",
    social_number: null,
    email: null,
    created_at: null,
    valid_membership_until: null,
    logoUrl: "assets/images/spinner/giphy.gif",

    information: {
        segments: [],
    },

    segments: [],
    state: null,
    city: null,
    street_name: null,
    street_number: null,
    zip_code: null,
    latitude: null,
    longitude: null,
    phone: null,
    website: null,
    role: 'guest',
    from: 'init',
    settings   : {},
    shortcuts   : [],
    // shortcuts    : [
    //     'calendar',
    //     'mail',
    //     'contacts',
    //     'todo'
    // ]

};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload,
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
