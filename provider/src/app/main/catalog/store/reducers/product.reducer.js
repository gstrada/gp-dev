import * as Actions from '../actions';

const initialState = {
    loading: false,
    productInfoLoading:false,
    productCreateLoading:false,

    categories: [],
    providers: [],
    
    entities          : [],
    productInfo:null,
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
const ProductReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCTS: {
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
        case Actions.SET_PRODUCTS: {
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
        case Actions.PRODUCTS_CHANGE_PAGE: {
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
        case Actions.LOADING_PRODUCTS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.PRODUCTS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    productInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_PRODUCT_INFO: {
            return {
                ...state,
                productInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_PRODUCT_CREATE: {
            return {
                ...state,
                productCreateLoading: action.payload,
            };
        }
        case Actions.GET_JSON_CATEGORIES: {
            return {
                ...state,
                categories: action.payload,
            };
        }
        case Actions.GET_JSON_PROVIDERS: {
            return {
                ...state,
                providers: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProductReducer;
