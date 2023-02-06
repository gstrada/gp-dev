import * as Actions from '../actions';

const initialState = {
    loading: false,
    categoryInfoLoading:false,
    categoryCreateLoading:false,

    entities          : [],
    categoryInfo:null,
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
const CategoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORIES: {
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
        case Actions.SET_CATEGORIES: {
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
        case Actions.CATEGORIES_CHANGE_PAGE: {
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
        case Actions.LOADING_CATEGORIES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.CATEGORIES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    categoryInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_CATEGORY_INFO: {
            return {
                ...state,
                categoryInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_METHOD_CREATE: {
            return {
                ...state,
                categoryCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default CategoryReducer;
