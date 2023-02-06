import * as Actions from '../actions';

const initialState = {
    loading: false,
    countryInfoLoading:false,
    countryCreateLoading:false,

    entities          : [],
    countryInfo:null,
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
};
const CountryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COUNTRIES: {
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
        case Actions.SET_COUNTRIES: {
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
        case Actions.COUNTRIES_CHANGE_PAGE: {
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
        case Actions.LOADING_COUNTRIES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.COUNTRIES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    countryInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_COUNTRY_INFO: {
            return {
                ...state,
                countryInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_COUNTRY_CREATE: {
            return {
                ...state,
                countryCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default CountryReducer;
