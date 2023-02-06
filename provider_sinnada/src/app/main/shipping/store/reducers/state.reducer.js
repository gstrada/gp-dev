import * as Actions from '../actions';

const initialState = {
    loading: false,
    stateInfoLoading:false,
    stateCreateLoading:false,
    carrier_id: 0,
    entities          : [],
    stateInfo:null,
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

};
const StateReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_STATES: {
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
        case Actions.SET_STATES: {
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
        case Actions.STATES_CHANGE_PAGE: {
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
        case Actions.LOADING_STATES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.STATES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    stateInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_STATE_INFO: {
            return {
                ...state,
                stateInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_STATE_CREATE: {
            return {
                ...state,
                stateCreateLoading: action.payload,
            };
        }
        case Actions.SET_CARRIER_ID: {
            return {
                ...state,
                carrier_id: action.payload,
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
        default: {
            return state;
        }
    }
};

export default StateReducer;
