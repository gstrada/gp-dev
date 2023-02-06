import * as Actions from '../actions';
import {EXCHANGED} from "../actions";

const initialState = {
    validating: false,
    exchanging: false,
    exchanged: false,
    products:[],
};
const ValidateReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.VALIDATING: {
            return {
                ...state,
                validating: action.payload,
            };
        }
        case Actions.EXCHANGING: {
            return {
                ...state,
                exchanging: action.payload,
            };
        }
        case Actions.EXCHANGED: {
            return {
                ...state,
                exchanged: action.payload,
            };
        }
        case Actions.SET_PRODUCTS: {
            if(action.payload){
                return {
                    ...state,
                    products : action.payload,
                };
            }
            return {...state}
        }
        case Actions.CLEAR: {
            return {
                ...state,
                validating: false,
                exchanging: false,
                exchanged: false,
                products:[],
            };
        }
        default: {
            return state;
        }
    }
};

export default ValidateReducer;
