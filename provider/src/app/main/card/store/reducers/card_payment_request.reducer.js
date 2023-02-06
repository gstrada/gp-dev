import * as Actions from '../actions';

const initialState = {
    loading: false,
    card_historyInfoLoading:false,
    card_historyCreateLoading:false,
    info: {
        'total_cards' :0,
        'total_payment' : 0,
    },
    entities          : [],
    card_historyInfo:null,
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
const CardPaymentRequestReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CARD_PAYMENT_REQUESTS: {
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
        case Actions.CARD_PAYMENT_REQUESTS_CHANGE_PAGE: {
            if(action.payload){
                return {
                    ...state,
                    page :action.payload,
                    loading: false
                };
            }
            return {
                ...initialState
            }
        }
        case Actions.LOADING_CARD_PAYMENT_REQUESTS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.CARD_PAYMENT_REQUESTS_INFO: {
            if(action.payload){
                return {
                    ...state,
                    info : action.payload
                };
            }
            return {...state}
        }
        default: {
            return state;
        }
    }
};

export default CardPaymentRequestReducer;
