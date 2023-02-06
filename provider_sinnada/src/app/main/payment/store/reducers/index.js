import {combineReducers} from 'redux';
import method from './method.reducer';
import state from './state.reducer';
import city from './city.reducer';
const reducer = combineReducers({
    method,
    state,
    city
});
export default reducer;
