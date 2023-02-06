import * as Actions from '../actions';

const initialReservations = {
    loading: false,
    reservationsInfoLoading:false,
    reservationsCreateLoading:false,
    payment_method_state_id: 0,
    entities          : [],
    reservationsInfo:null,
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
const ReservationsReducer = function (reservations = initialReservations, action) {
    switch ( action.type )
    {
        case Actions.GET_RESERVATIONS: {
            if(action.payload){
                return {
                    ...reservations,
                    entities   : action.payload.data,
                    page : {
                        current_page: action.payload.current_page,
                        per_page: action.payload.per_page,
                        last_page: action.payload.last_page,
                        from: action.payload.from,
                        to: action.payload.to,
                        total: action.payload.total,
                        filters: reservations.page.filters,
                        sort: reservations.page.sort,
                        show: reservations.page.show,
                    },
                };
            }
            return {
                ...initialReservations
            }
        }
        // case Actions.SET_USERLISTS: {
        //     if(action.payload) {
        //         return {
        //             ...user_list,
        //             entities: action.payload,
        //         };
        //     }
        //     return {
        //         ...initialUserList
        //     }
        // }
        // case Actions.USERLISTS_CHANGE_PAGE: {
        //     if(action.payload){
        //         return {
        //             ...user_list,
        //             page :action.payload
        //         };
        //     }
        //     return {
        //         ...initialUserList
        //     }
        // }
        case Actions.LOADING_RESERVATIONS: {
            return {
                ...reservations,
                loading: action.payload,
            };
        }
        // case Actions.USERLISTS_CHANGE_STATUS: {
        //     return {
        //         ...user_list,
        //         status: action.payload,
        //     };
        // }
        // case Actions.USERLISTS_INFO: {
        //     if(action.payload){
        //         return {
        //             ...user_list,
        //             user_listInfo : action.payload
        //         };
        //     }
        //     return {...user_list}
        // }
        // case Actions.LOADING_USERLIST_INFO: {
        //     return {
        //         ...user_list,
        //         user_listInfoLoading: action.payload,
        //     };
        // }
        // case Actions.LOADING_USERLIST_CREATE: {
        //     return {
        //         ...user_list,
        //         user_listCreateLoading: action.payload,
        //     };
        // }
        default: {
            return reservations;
        }
    }
};

export default ReservationsReducer;
