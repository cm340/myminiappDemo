import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TRADE_TABS } from "tradePublic/consts";
import MyTabs from "mapp_common/components/myTab";
import { changeTab } from "./action";
import OrderList from "pcComponents/myOrder/orderList";

@connect((store) => {
    return {
        activeTabKey: store.tradeReducer.activeTabKey,
        tradeCounts: store.tradeReducer.tradeCounts,
        pageNo: store.tradeReducer.pageNo,
        pageSize: store.tradeReducer.pageSize,
        list: store.tradeReducer.list,
    };
 })
class tradeManagement extends Component {

    constructor (props) {
        super(props);
        this.state = { scrollHeight: 0 };
    }
    componentDidMount () {
        const { pageNo, pageSize } = this.props;
        this.setState({ scrollHeight: 500 });
        changeTab('WAIT_SELLER_SEND_GOODS',pageNo,pageSize);
    }
    onTabChange = (v)=>{
        const { pageSize } = this.props;
        changeTab(v,1,pageSize,'');
    };
    render () {
        const { activeTabKey, tradeCounts   } = this.props;
        const tabList = Object.keys(TRADE_TABS).map((key) => {
            return { title: TRADE_TABS[key].name, key };
        });
        const { scrollHeight } = this.state;
        const PAGE_SIZE_LIST = [20, 40, 80, 100];
        return (
         <View>
            <View className='grid-item24 tab-con' >
                <MyTabs current={activeTabKey} tabList={tabList} scroll dotNum={tradeCounts} onClick={this.onTabChange} />
                <OrderList/>
            </View>  
         </View>
          
        );
    }
}
export default tradeManagement;