import * as Actions from '../actions';

const initialState = {
    loading: false,
    packInfoLoading:false,
    packCreateLoading:false,

    categories: [],

    entities          : [],
    packInfo:null,
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
const PackReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PACKS: {
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
        case Actions.SET_PACKS: {
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
        case Actions.PACKS_CHANGE_PAGE: {
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
        case Actions.LOADING_PACKS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.PACKS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    packInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_PACK_INFO: {
            return {
                ...state,
                packInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_PACK_CREATE: {
            return {
                ...state,
                packCreateLoading: action.payload,
            };
        }
        case Actions.GET_JSON_CATEGORIES: {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default PackReducer;
