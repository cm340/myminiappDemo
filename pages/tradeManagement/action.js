import Taro from '@tarojs/taro';
import { ORDER_LIST } from './config';
import { soldGet } from "tradePublic/tradeDataCenter/api/soldGet";
let app = Taro.getApp();


/**
 *
 * @param json
 */
export const dispatch = (json) => {
    app.store.dispatch(json);
};

export const changeTab = (tabkey,pageNo,pageSize) => {
    dispatch({
        type: ORDER_LIST,
        data:{
            activeTabKey: tabkey,
            pageNo:pageNo,
            pageSize:pageSize,
            list:[],
            isLoading:true
        },
    });
    soldGet({
        status:tabkey,
        pageNo:pageNo,
        pageSize:pageSize,
        callback: (rsp) => {
            let list = rsp.trades;
            dispatch({
                type: ORDER_LIST,
                data:{
                    activeTabKey: tabkey,
                    list:[...list],
                    tradeCounts: rsp.totalResults,
                },
            });
        },
    }); 
}

export const delItem = (newList) =>{
    dispatch({
        type: ORDER_LIST,
        data:{
            list:[...newList],
        },
    });
}