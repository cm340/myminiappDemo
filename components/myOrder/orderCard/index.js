import Taro, { Component } from '@tarojs/taro';
import { Checkbox, Text, View, Image, Button } from '@tarojs/components';
import './index.scss';
class OrderCard extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
    }
    
    closeOrderHander=(tid)=>{
       this.props.closeOrderHander(tid)
    }
    
    render () {
        const { order, activeTabKey } = this.props;
        let status, isSend, isClose;
        switch (order.status) {
            case 'WAIT_SELLER_SEND_GOODS':
                { 
                    status = <Text className='state state-wait-send' >待发货</Text>
                    isClose= (
                        <View>
                            <Text className='btn-medium'>打快递单</Text>
                            <Text className='btn-medium'>打印面单</Text>
                            <Text className='btn-medium'>打发货单</Text>
                        </View>
                    )
                    isSend=<Text className='state state-wait-send' >发货</Text>
                }
            case 'WAIT_BUYER_PAY':
                { 
                    status = <Text className='state state-wait-pay' >待付款</Text>
                    isClose= (
                        <View>
                            <Text className='btn-medium'>修改价格</Text>
                            <Button className='btn-medium' onClick={this.closeOrderHander.bind(this,order.tid)}>关闭订单</Button>
                        </View>
                    )
                }
            case 'WAIT_BUYER_CONFIRM_GOODS':
                { 
                    status = <Text className='state state-already-send' >已发货</Text>
                    isSend= ( 
                        <View>
                            <Text className='iconfont iconfont-shuaxin' />
                            <Text className='state state-wait-send' >延时收获</Text>
                        </View>
                    )
                    isClose= (
                        <View>
                            <Text className='btn-medium'>打快递单</Text>
                            <Text className='btn-medium'>打印面单</Text>
                            <Text className='btn-medium'>打发货单</Text>
                        </View>
                    )
                }
          
        }
        return (
            <View className='order-detail-card'>
                <View className='order-title'>
                    <Checkbox></Checkbox>
                    {status}
                    <Text>
                        <Text className='order-detail-header'>编号:{order.tid}</Text>
                        <Text className='iconfont iconfont-fuzhi' />
                        <Text>下单时间: {order.pay_time}</Text>
                        <Text className='iconfont iconfont-shuaxin' />
                        <Text className='iconfont icon-beizhuqi'/>
                    </Text>
                </View>
                <View className='order-body-row'>
                    <View className='order-column order-column1'>
                        {
                            order.orders.map(item => (
                                <View className='order-msg' key={item.cid}>
                                    <Image src={item.pic_path} className='order-img' />
                                    <View className='order-content'>
                                        <View className='content-row'>
                                            <Text className='user-name'>{item.title}</Text>
                                        </View>
                                        <View className='content-row'>
                                            宝贝属性 : 
                                            {
                                                item.sku_properties_values.map(item => (
                                                    <Text>{item}</Text>
                                                ))
                                            }
                                        </View> 
                                        <View className='content-row'>￥:{item.payment}</View>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View className='order-column order-column2'>
                        <View>
                            <Text className='iconfont iconfont-wangwang' />
                            <Text>{order.buyer_nick}</Text>
                            <Text className='iconfont iconfont-fuzhi' />
                        </View>
                        <View>
                            <Text className='iconfont iconfont-zuzhiTApaidan' />
                            <Text className='order-list'>阻止此卖家拍单</Text>
                        </View>
                        <View>
                            <Text className='iconfont iconfont-heduidingdan' />
                            <Text className='order-list'>核对订单</Text>
                        </View>
                    </View>
                    <View className='order-column order-column3'>
                        <View>
                            实付 : <Text className='importentFont'>￥{order.payment}</Text>
                        </View>
                        <View>数量: {order.num}</View>
                        <View>
                            <Text>手机</Text>
                        </View>
                    </View>
                    <View className='order-column order-column4'>
                        {isSend}
                        <View>
                            <Text className='iconfont iconfont-dingdanxiangqing' />
                            <Text className='order-content'>订单详情</Text>
                        </View>
                    </View>
                    <View className='order-column order-column5'>
                        {isClose}
                    </View>
                </View>
                <View className='address'>
                    <Text>收货地址: {order.receiver_name},{order.receiver_mobile},{order.receiver_state},{order.receiver_city},{order.receiver_district},{order.receiver_district},{order.receiver_address},{order.receiver_zip}</Text>
                    <Text>
                        <Text className='iconfont iconfont-fuzhi' />
                        <Text className='iconfont iconfont-bianji' />
                        <Text className='edit-address'>核对地址</Text>
                    </Text>
                </View>
            </View>
        );
    }
}
export default OrderCard;