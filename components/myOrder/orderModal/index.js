
import 'taro-ui/dist/style/index.scss' 
import Taro, { Component } from '@tarojs/taro';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction,  AtAvatar } from "taro-ui"
import { tradeClose } from "tradePublic/tradeDataCenter/api/taobaotradeClose";
import { connect } from '@tarojs/redux';
import { delItem } from '../../../pages/tradeManagement/action'
@connect((store) => {
    return {
        list: store.tradeReducer.list,
    };
 })
export default class orderModal extends Component {
    constructor(props){
        super(props);
        this.state={
            checkValue:'',
            newList:[]
        }
    }
    /**
     * @description 关闭模态框
     * @memberof orderModal
     */
    closeModal=()=>{
        this.props.closeModal()
    }
    /**
     * @description 删除订单
     * @memberof orderModal
     */
    delOrder=(tid)=>{
       let checkValue=this.state.checkValue,
       that=this
       console.log(checkValue)
       tradeClose({tid,'close_reason':checkValue})
       .then((o)=>{
           that.closeModal()
           let newList =this.props.list.filter((item)=>{return item.tid!==tid})
           delItem(newList)
       })
    }
    /**
     * @description 获取下拉框的选中值
     * @memberof orderModal
     */
    Change=(e)=>{
        this.setState({
            checkValue:e.target.value
        })
    }
    render() {
        const { isOpened, orderItem, list } =this.props
        return (
            <AtModal isOpened={isOpened} onClose={this.closeModal} closeOnClickOverlay='false'>
            <AtModalHeader>关闭订单</AtModalHeader>
            <AtModalContent>
                <AtAvatar image={orderItem.pic_path}></AtAvatar>
                <Text>¥{orderItem.payment}</Text> 
                <Text>x{orderItem.num}</Text> 
                <Text>关闭理由</Text> 
                <select onChange={this.Change}>
                    <option value="同城见面交易">同城见面交易</option>
                    <option value="买家不想买了">买家不想买了</option>
                </select>
            </AtModalContent>
            <AtModalAction> <Button>取消</Button> <Button onClick={this.delOrder.bind(this,orderItem.tid)}>关闭</Button> </AtModalAction>
          </AtModal>
        )
    }
    }
