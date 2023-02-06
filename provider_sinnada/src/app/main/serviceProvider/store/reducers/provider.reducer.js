import * as Actions from '../actions';

const initialState = {
    loading: false,
    providerInfoLoading:false,
    providerCreateLoading:false,

    entities          : [],
    providerInfo:null,
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
const ProviderReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROVIDERS: {
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
        case Actions.SET_PROVIDERS: {
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
        case Actions.PROVIDERS_CHANGE_PAGE: {
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
        case Actions.LOADING_PROVIDERS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.PROVIDERS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    providerInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_METHOD_INFO: {
            return {
                ...state,
                providerInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_METHOD_CREATE: {
            return {
                ...state,
                providerCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProviderReducer;
