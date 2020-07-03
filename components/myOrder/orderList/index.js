
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import OrderCard from "pcComponents/myOrder/orderCard/index.js";
import OrderModal from "pcComponents/myOrder/orderModal/index.js"
import './index.scss';
import EmptyPage from "pcComponents/emptyPage";
import { fullinfoGet } from "tradePublic/tradeDataCenter/api/fullinfoGet";
@connect((store) => {
    return {
        activeTabKey: store.tradeReducer.activeTabKey,
        list: store.tradeReducer.list,
        isLoading: store.tradeReducer.isLoading,
    };
})
class OrderList extends Component {
    constructor (props) {
        super(props);
        this.state={
            isOpened:false,
            orderItem:{}
        }
    }
    componentWillReceiveProps (nextProps) {
        if (this.props.activeTabKey != nextProps.activeTabKey) {
        }
    }
    /**
     * @description 关闭按钮触发
     * @memberof OrderList
     */
    closeOrder=(tid)=>{
        fullinfoGet({tid,'fields':'tid,pic_path,num,payment'})
        .then((o)=>{
            this.setState({
                isOpened:true,
                orderItem:o
            })
        })   
    }
    componentDidMount () {
    }
    /**
     * @description 关闭模态框
     * @memberof OrderList
     */
    closeModal=()=>{
        this.setState({
            isOpened:false
        }) 
    }
    render () {
        const { list, activeTabKey, isLoading } = this.props;
        const  { isOpened, orderItem } =this.state;
        return ( 
            <View>
                <View className='refund-list'>
                    {
                        list.length == 0 && !isLoading  && (
                            <View className='refund-empty'>
                                <EmptyPage text='当前没有任何订单' />
                            </View>
                        )
                    }
                    {
                        list.map((order) => {
                            return  <OrderCard order={order} activeTabKey={activeTabKey} closeOrderHander={this.closeOrder}/>
                        })
                    }
                </View>
                <OrderModal isOpened={isOpened} orderItem={orderItem} closeModal={this.closeModal} list={list}/>
             </View>
        );
    }
}
export default OrderList;
