import { combineReducers } from 'redux';
import { marketingAdInfoReducer } from "mapp_common/marketing/reducer";
import { refundListReducer } from "pcPages/refundManagement/reducer";
import { tradeReducer } from "pcPages/tradeManagement/reducer";
export default combineReducers({
    marketingAdInfoReducer,
    refundListReducer,
    tradeReducer
});

