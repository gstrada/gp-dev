import {combineReducers} from 'redux';
import clients from './clients.reducer';
import sales from './sales.reducer';
const reducer = combineReducers({
    clients,
    sales
});

export default reducer;
