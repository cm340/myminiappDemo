import { ORDER_LIST } from "./config";

let initState = {
    activeTabKey: 'WAIT_SELLER_SEND_GOODS',  //先处理待发货
    tradeCounts: {},//数量
    list:[],//数据
    isLoading:true,//加载中
    pageSize: 20,//页数
    pageNo: 1//页码
};


export function tradeReducer(state = initState, action) {
    switch (action.type) {
        case ORDER_LIST:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}