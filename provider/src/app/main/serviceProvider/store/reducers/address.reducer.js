import * as Actions from '../actions';

const initialState = {
    loading: false,
    addressInfoLoading:false,
    addressCreateLoading:false,
    provider_id: 0,
    entities          : [],
    addressInfo:null,
    page : {
        current_page: 1,
        per_page: 1,
        last_page: 1,
        from: 1,
        to: 1,
        total: 1,
        filters:[],
        sort:{
            id: 'name',
            desc: true
        },
        show:'all',
    },

    // Location

    countries: [],
    country_states:[],
    state_cities: [],

};
const AddressReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADDRESSES: {
            if(action.payload){
                return {
                    ...state,
                    entities   : action.payload.data,
                    page : {
                        current_page: action.payload.current_page,
                        per_page: action.payload.per_page,
                        last_page: action.payload.last_page,
                        from: action.payload.from,
                        to: action.payload.to,
                        total: action.payload.total,
                        filters: state.page.filters,
                        sort: state.page.sort,
                        show: state.page.show,
                    },
                };
            }
            return {
                ...initialState
            }
        }
        case Actions.SET_ADDRESSES: {
            if(action.payload) {
                return {
                    ...state,
                    entities: action.payload,
                };
            }
            return {
                ...initialState
            }
        }
        case Actions.ADDRESSES_CHANGE_PAGE: {
            if(action.payload){
                return {
                    ...state,
                    page :action.payload
                };
            }
            return {
                ...initialState
            }
        }
        case Actions.LOADING_ADDRESSES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.ADDRESSES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    addressInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_ADDRESS_INFO: {
            return {
                ...state,
                addressInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_ADDRESS_CREATE: {
            return {
                ...state,
                addressCreateLoading: action.payload,
            };
        }
        case Actions.SET_PROVIDER_ID: {
            return {
                ...state,
                provider_id: action.payload,
            };
        }

        case Actions.GET_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
            };
        }
        case Actions.GET_COUNTRY_STATES: {
            return {
                ...state,
                country_states: action.payload,
            };
        }
        case Actions.GET_STATE_CITIES: {
            return {
                ...state,
                state_cities: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default AddressReducer;
