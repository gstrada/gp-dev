import * as Actions from '../actions';

const initialHistory = {
    loading: false,
    historyInfoLoading:false,
    historyCreateLoading:false,
    payment_method_state_id: 0,
    entities          : [],
    historyInfo:null,
    status: 'pending',
    page : {
        current_page: 1,
        per_page: 1,
        last_page: 1,
        from: 1,
        to: 1,
        total: 1,
        filters:[],
        sort:{
            id: 'created_at',
            desc: true
        },
        show:'all',
    },

};
const HistoryReducer = function (history = initialHistory, action) {
    switch ( action.type )
    {
        case Actions.GET_HISTORIES: {
            if(action.payload){
                return {
                    ...history,
                    entities   : action.payload.data,
                    page : {
                        current_page: action.payload.current_page,
                        per_page: action.payload.per_page,
                        last_page: action.payload.last_page,
                        from: action.payload.from,
                        to: action.payload.to,
                        total: action.payload.total,
                        filters: history.page.filters,
                        sort: history.page.sort,
                        show: history.page.show,
                    },
                };
            }
            return {
                ...initialHistory
            }
        }
        case Actions.SET_HISTORIES: {
            if(action.payload) {
                return {
                    ...history,
                    entities: action.payload,
                };
            }
            return {
                ...initialHistory
            }
        }
        case Actions.HISTORIES_CHANGE_PAGE: {
            if(action.payload){
                return {
                    ...history,
                    page :action.payload
                };
            }
            return {
                ...initialHistory
            }
        }
        case Actions.LOADING_HISTORIES: {
            return {
                ...history,
                loading: action.payload,
            };
        }
        case Actions.HISTORIES_CHANGE_STATUS: {
            return {
                ...history,
                status: action.payload,
            };
        }
        case Actions.HISTORIES_INFO: {
            if(action.payload){
                return {
                    ...history,
                    historyInfo : action.payload
                };
            }
            return {...history}
        }
        case Actions.LOADING_HISTORY_INFO: {
            return {
                ...history,
                historyInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_HISTORY_CREATE: {
            return {
                ...history,
                historyCreateLoading: action.payload,
            };
        }
        default: {
            return history;
        }
    }
};

export default HistoryReducer;
