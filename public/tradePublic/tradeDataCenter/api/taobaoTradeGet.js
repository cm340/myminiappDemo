import taobaoTradeSoldGet from "tradePublic/taobaoTradeSoldGet";
import { refund_simple_fields, soldget_all_type } from "tradePublic/tradeDataCenter/config";
export function getTradeList(
    {
        fields = refund_simple_fields,
        buyerNnick = '',
        type = soldget_all_type,
        useHasNext = true,
        source,
        fallback = true,
        callback = NOOP,
        errCallback = handleError,
        ...rest
    }
) {
    let query = {
        fields,
        buyer_nick:buyerNnick,
        type,
        use_has_next: useHasNext,
        ...rest,
    };
    let has_next=false;
    let totalResults = 0;

    return new Promise((resolve, reject) => {
        taobaoTradeSoldGet({
            query: query,
            callback: (rsp) => {
                rsp = resolveTopResponse(rsp);
                let refunds = getArrayByKey('refund', rsp);
                if (refunds) {
                    has_next = rsp.has_next;
                }
                totalResults = rsp.total_results;
                resolve({refunds:refunds});
            },
            errCallback: (error) => {
                reject(error);
                errCallback(error);
            },
        });

    }).then(({refunds}) => {
        let refundsGroupByTid = {};
        refunds.map(refund => {
            if (!refundsGroupByTid[refund.tid]){
                refundsGroupByTid[refund.tid] = [];
            }
            refundsGroupByTid[refund.tid].push(refund);
        })
        return new Promise((resolve,reject) => {
            fullinfoGetBatch({
                tids: Object.keys(refundsGroupByTid),
                callback: (rsp) => {
                    let list = [];
                    let trades = rsp.filter(Boolean);
                    trades.map(trade => {
                        refundsGroupByTid[trade.tid].map(refund => {
                            let order = getOrders(trade).find(order => order.oid === refund.oid);
                            let newTrade = JSON.parse(JSON.stringify(trade));
                            newTrade.orders.order = [order];
                            newTrade.refund = refund;
                            resolveTrade(newTrade);
                            list.push(newTrade);
                        })
                    });
                    resolve({totalResults: totalResults,trades: list, has_next});
                    callback({totalResults: totalResults,trades: list, has_next});
                }
            })
        });

    });
}