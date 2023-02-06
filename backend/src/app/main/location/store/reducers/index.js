import {combineReducers} from 'redux';
import country from './country.reducer';
import state from './state.reducer';
import city from './city.reducer';
const reducer = combineReducers({
    country,
    state,
    city
});
export default reducer;
