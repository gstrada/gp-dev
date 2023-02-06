import * as Actions from '../actions';

const initialState = {
    loading: false,
    product_pictureCreateLoading:false,
    product_id: 0,
    entities          : [],
};
const ProductPictureReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCT_PICTURES: {
            if(action.payload){
                return {
                    ...state,
                    entities   : action.payload,
                };
            }
            return {
                ...initialState
            }
        }
        case Actions.LOADING_PRODUCT_PICTURES: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case Actions.LOADING_PRODUCT_PICTURE_CREATE: {
            return {
                ...state,
                product_pictureCreateLoading: action.payload,
            };
        }
        case Actions.SET_PRODUCT_ID: {
            return {
                ...state,
                product_id: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProductPictureReducer;
