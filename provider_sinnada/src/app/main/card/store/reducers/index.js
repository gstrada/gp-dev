import {combineReducers} from 'redux';
import validate from './validate.reducer';
import card_history from './card_history.reducer';
import payment_request from './card_payment_request.reducer';
import payment_history from './card_payment_history.reducer';


const reducer = combineReducers({
    validate,
    card_history,
    payment_request,
    payment_history
});
export default reducer;
