import * as Actions from '../actions';
import {SAVED} from "../actions";

const initialState = {
    searching: false,
    saving: false,
    saved: false,
    card:null,
    cards:[],
};
const Card_editReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SEARCHING: {
            return {
                ...state,
                searching: action.payload,
            };
        }
        case Actions.SAVING: {
            return {
                ...state,
                saving: action.payload,
            };
        }
        case Actions.SAVED: {
            return {
                ...state,
                saved: action.payload,
            };
        }
        case Actions.SET_CARD: {
            if(action.payload){
                return {
                    ...state,
                    card : action.payload,
                    cards:[],
                };
            }
            return {...state}
        }
        case Actions.SET_CARDS: {
            if(action.payload){
                return {
                    ...state,
                    card: null,
                    cards : action.payload,
                };
            }
            return {...state}
        }
        case Actions.CLEAR: {
            return {
                ...state,
                searching: false,
                saving: false,
                saved: false,
                card:null,
                cards:[],
            };
        }
        default: {
            return state;
        }
    }
};

export default Card_editReducer;
