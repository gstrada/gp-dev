import {combineReducers} from 'redux';
import carrier from './carrier.reducer';
import state from './state.reducer';
import city from './city.reducer';
const reducer = combineReducers({
    carrier,
    state,
    city
});
export default reducer;
