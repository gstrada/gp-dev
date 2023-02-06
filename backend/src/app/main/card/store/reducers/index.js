import {combineReducers} from 'redux';
import card_edit from './card_edit.reducer';
import card_history from './card_history.reducer';
import history from './history.reducer';
const reducer = combineReducers({
    // method,
    // state,
    history,
    card_edit,
    card_history,
});
export default reducer;
