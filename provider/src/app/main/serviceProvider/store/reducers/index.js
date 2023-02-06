import {combineReducers} from 'redux';
import provider from './provider.reducer';
import address from './address.reducer';
import user from './user.reducer';
const reducer = combineReducers({
    provider,
    address,
    user,
});
export default reducer;
