import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : [],
    searchText        : '',
    loading: false,
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
            id: 'name',
            desc: false
        },
        show:'all',
    },
};

const SalesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SALES: {
            let items = [];
            if(action.payload){
                items = action.payload.data.filter(item => {
                    return item.status === action.status
                });
                items = _.keyBy(items, 'id');
                return {
                    ...state,
                    status: action.status,
                    entities   :  items,
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
        case Actions.LOADING_SALES: {
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

export default SalesReducer;
