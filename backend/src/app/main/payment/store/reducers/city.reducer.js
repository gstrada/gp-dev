import * as Actions from '../actions';

const initialCity = {
    loading: false,
    cityInfoLoading:false,
    cityCreateLoading:false,
    payment_method_state_id: 0,
    entities          : [],
    cityInfo:null,
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

    state_cities:[],

};
const CityReducer = function (city = initialCity, action) {
    switch ( action.type )
    {
        case Actions.GET_CITIES: {
            if(action.payload){
                return {
                    ...city,
                    entities   : action.payload.data,
                    page : {
                        current_page: action.payload.current_page,
                        per_page: action.payload.per_page,
                        last_page: action.payload.last_page,
                        from: action.payload.from,
                        to: action.payload.to,
                        total: action.payload.total,
                        filters: city.page.filters,
                        sort: city.page.sort,
                        show: city.page.show,
                    },
                };
            }
            return {
                ...initialCity
            }
        }
        case Actions.SET_CITIES: {
            if(action.payload) {
                return {
                    ...city,
                    entities: action.payload,
                };
            }
            return {
                ...initialCity
            }
        }
        case Actions.CITIES_CHANGE_PAGE: {
            if(action.payload){
                return {
                    ...city,
                    page :action.payload
                };
            }
            return {
                ...initialCity
            }
        }
        case Actions.LOADING_CITIES: {
            return {
                ...city,
                loading: action.payload,
            };
        }
        case Actions.CITIES_INFO: {
            if(action.payload){
                return {
                    ...city,
                    cityInfo : action.payload
                };
            }
            return {...city}
        }
        case Actions.LOADING_CITY_INFO: {
            return {
                ...city,
                cityInfoLoading: action.payload,
            };
        }
        case Actions.LOADING_CITY_CREATE: {
            return {
                ...city,
                cityCreateLoading: action.payload,
            };
        }
        case Actions.SET_PAYMENT_METHOD_STATE_ID: {
            return {
                ...city,
                payment_method_state_id: action.payload,
            };
        }
        
        case Actions.GET_STATE_CITIES: {
            return {
                ...city,
                state_cities: action.payload,
            };
        }
        default: {
            return city;
        }
    }
};

export default CityReducer;
