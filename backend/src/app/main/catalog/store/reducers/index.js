import {combineReducers} from 'redux';
import category from './category.reducer';
import discount from './discount.reducer';
import pack from './pack.reducer';
import product from './product.reducer';
import pack_product from './pack_product.reducer';
import product_address from './product_address.reducer';
import product_picture from './product_picture.reducer';

const reducer = combineReducers({
    category,
    discount,
    pack,
    product,
    pack_product,
    product_address,
    product_picture,
});
export default reducer;
