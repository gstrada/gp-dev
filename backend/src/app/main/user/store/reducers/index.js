import {combineReducers} from 'redux';
import user_list from './user_list.reducer';
import reservations from './reservations.reducer';
const reducer = combineReducers({
    user_list,
    reservations
});
export default reducer;
