import * as Actions from '../actions';

const initialState = {
    loading: false,
    product_addressInfoLoading:false,
    product_addressCreateLoading:false,
    product_id: 0,
    entities          : [],
    product_addressInfo:null,
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
    provider_addresses:[],

};
const ProductAddressReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCT_ADDRESSES: {
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
        case Actions.SET_PRODUCT_ADDRESSES: {
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
        case Actions.PRODUCT_ADDRESSES_CHANGE_PAGE: {
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
        case Actions.LOADING_PRODUCT_ADDRESSES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.PRODUCT_ADDRESSES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    product_addressInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_PRODUCT_ADDRESS_INFO: {
            return {
                ...state,
                product_addressInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_PRODUCT_ADDRESS_CREATE: {
            return {
                ...state,
                product_addressCreateLoading: action.payload,
            };
        }
        case Actions.SET_PRODUCT_ID: {
            return {
                ...state,
                product_id: action.payload,
            };
        }

        case Actions.GET_PROVIDERS: {
            return {
                ...state,
                providers: action.payload,
            };
        }
        case Actions.GET_PROVIDER_ADDRESSES: {
            return {
                ...state,
                provider_addresses: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProductAddressReducer;
