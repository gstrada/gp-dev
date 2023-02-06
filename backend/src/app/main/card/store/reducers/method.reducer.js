import * as Actions from '../actions';

const initialState = {
    loading: false,
    methodInfoLoading:false,
    methodCreateLoading:false,

    entities          : [],
    methodInfo:null,
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
const MethodReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_METHODS: {
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
        case Actions.SET_METHODS: {
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
        case Actions.METHODS_CHANGE_PAGE: {
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
        case Actions.LOADING_METHODS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.METHODS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    methodInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_METHOD_INFO: {
            return {
                ...state,
                methodInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_METHOD_CREATE: {
            return {
                ...state,
                methodCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default MethodReducer;
