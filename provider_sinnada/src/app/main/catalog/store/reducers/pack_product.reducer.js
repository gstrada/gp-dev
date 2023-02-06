import * as Actions from '../actions';

const initialState = {
    loading: false,
    pack_productInfoLoading:false,
    pack_productCreateLoading:false,
    pack_id: 0,
    entities          : [],
    pack_productInfo:null,
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

    providers: [],
    provider_products:[],

};
const PackProductReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PACK_PRODUCTS: {
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
        case Actions.SET_PACK_PRODUCTS: {
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
        case Actions.PACK_PRODUCTS_CHANGE_PAGE: {
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
        case Actions.LOADING_PACK_PRODUCTS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.PACK_PRODUCTS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    pack_productInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_PACK_PRODUCT_INFO: {
            return {
                ...state,
                pack_productInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_PACK_PRODUCT_CREATE: {
            return {
                ...state,
                pack_productCreateLoading: action.payload,
            };
        }
        case Actions.SET_PACK_ID: {
            return {
                ...state,
                pack_id: action.payload,
            };
        }

        case Actions.GET_PROVIDERS: {
            return {
                ...state,
                providers: action.payload,
            };
        }
        case Actions.GET_PROVIDER_PRODUCTS: {
            return {
                ...state,
                provider_products: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default PackProductReducer;
