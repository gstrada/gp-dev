import * as Actions from '../actions';

const initialState = {
    loading: false,
    card_historyInfoLoading:false,
    card_historyCreateLoading:false,
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
const CardHistoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CARD_HISTORIES: {
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
        case Actions.CARD_HISTORIES_CHANGE_PAGE: {
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
        case Actions.LOADING_CARD_HISTORIES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.CARD_HISTORIES_INFO: {
            if(action.payload){
                return {
                    ...state,
                    card_historyInfo : action.payload
                };
            }
            return {...state}
        }
        case Actions.LOADING_CARD_HISTORY_INFO: {
            return {
                ...state,
                card_historyInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_METHOD_CREATE: {
            return {
                ...state,
                card_historyCreateLoading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default CardHistoryReducer;
