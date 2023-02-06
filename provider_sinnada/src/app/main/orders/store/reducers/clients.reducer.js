import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : [],
    searchText        : '',
    loading: false,

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
            desc: false
        },
        show:'all',
    },
};

const ClientsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CLIENTS: {

            return {
                ...state,
                entities   : _.keyBy(action.payload.data, 'id'),
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
        case Actions.LOADING_CLIENTS: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ClientsReducer;
