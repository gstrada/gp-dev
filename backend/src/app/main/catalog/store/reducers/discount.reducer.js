import * as Actions from '../actions';

const initialState = {
    loading: false,
    discountInfoLoading:false,
    discountCreateLoading:false,

    entities          : [],
    discountInfo:null,
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
const DiscountReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DISCOUNTS: {
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
        case Actions.SET_DISCOUNTS: {
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
        case Actions.DISCOUNTS_CHANGE_PAGE: {
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
        case Actions.LOADING_DISCOUNTS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.DISCOUNTS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    discountInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_DISCOUNT_INFO: {
            return {
                ...state,
                discountInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_METHOD_CREATE: {
            return {
                ...state,
                discountCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default DiscountReducer;
