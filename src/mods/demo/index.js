import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

const styles = {
  wrapper: {
    width: 750,
    height: 100,
    backgroundColor: '#B22222'
  }
};

export default class developingClassNameApp extends Component {
  /**
   * 构建函数，处理传入的mds和gdc
   */
  constructor (props) {
    super(props);

    //从页面上获取各种可以用的工具，如 Mtop, Windvane, goTargetUrl
    this.pageUtils = props.pageUtils;

    // 模块被初始化后从模块属性中获取模块要用到的数据和全局数据
    this.state = {
      mds: props.mds || {},
      gdc: props.gdc || {}
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log('this.props', this.props);
    this.getItemsData();
    this.getCouponData();
  }

  /**
   * 获取优惠券数据
   */
  getCouponData() {
    const { gdc } = this.state;
    console.log('mtop.data.coupon.get request =====');
    this.pageUtils.Mtop.request({
      api: 'mtop.data.coupon.get',
      v: '1.0',
      data: {
        'sellerId': gdc.userId,
        'pageId': gdc.pageId,
      },
      ecode: 0,   // 必须
      type: 'GET',
      timeout: 3000 // 非必须。接口超时设置，默认为20000ms
    }, (ret) => {
      console.log('mtop.data.coupon.get resp ==== ', resp);
      this.setState({
        users: `ret ===${JSON.stringify(ret)}`,
      });

    }, (err) => {
      this.setState({
        users: `err ===${JSON.stringify(err)}`,
      });
    });
  }
  /**
   * 获取店铺数据
   */
  getItemsData(cb = () => {}) {
    const { mds, gdc } = this.state;
    const { moduleData: { goods = '' } } = mds;  // 557954303641
    const ownerId = '385132127'; // '1928865133'; // gdc.userId  385132127//安踏
    const data = {
      ownerId: gdc.userId,
      isAuto: !goods.length,
      catId: 0,
      itemIds: goods,
      keyWord: '',
      startPrice: '',
      endPrice: '',
      pageSize: 10,
    };
    const params = {
      api: 'mtop.data.item.get',
      v: '1.0',
      data,
      ecode: 0,   // 必须
      type: 'GET',
    };
    console.log('mtop.data.item.get request =====');
    this.pageUtils.Mtop.request(params, resp => {
      console.log('mtop.data.item.get resp ==== ', resp);
      const msg = (resp && resp.ret ? resp.ret[0] : '').split('::');
      if(msg[0] === 'SUCCESS'){
        // do something...
      }
    }, err => {
      console.warn('Mtop err ==== ', err);
    });
  }

  goTargetUrl = (url, nid) => {
    let {mds} = this.state;
    let params = {
      url: url,
      nid: nid || 0,
      widgetId: mds.widgetId,
      moduleName: mds.moduleName
    };

    this.pageUtils.goTargetUrl && this.pageUtils.goTargetUrl(params);
  };


  render() {
    const props = {
      style: styles.wrapper,
    };
    return (
      <View {...props}>
        <Text>Rax</Text>
      </View>
    );
  }
}

