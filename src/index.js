import {createElement, Component} from 'rax';
import View from 'rax-view';
import Picture from 'rax-picture';
import Touchable from 'rax-touchable';

const styles = {
  wrapper: {
    width: 750,
    backgroundColor: '#CCCCCC'
  },
  imageTop: {
    width: 750,
    height: 400,
  },
  itemsTop: {
    width: 750,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemsCell: {
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCC',
  }
};


export default class developingClassNameApp extends Component {

  state = {
    showDataStatus: false,    //有数据
    showNoDataStatus: false,  //无数据（商家装修的时候无数据需要展示默认图，消费者访问的时候不展示任何东西）
    items: [],
    mtopDone: false
  };

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

  onItemClick(e) {
    console.log('onItemClick', e);
  }

  getItemsData(cb = () => {}) {
    const { mds, gdc } = this.state;
    console.log('=== this.props', this.props);
    console.log('=== mds', mds);
    console.log('=== gdc', gdc);
    const { moduleData: { goods = '' } } = mds;  // 557954303641
    const ownerId = '385132127'; // '1928865133'; // gdc.userId
    // const itemIds = goods.split(',').map(id => parseInt(id));
    const data = {
      ownerId,
      isAuto: !goods.length,
      catId: 0,
      itemIds: goods,
      keyWord: '',
      startPrice: '',
      endPrice: '',
      pageSize: 10,
    };
    console.log('this.pageUtils.Mtop.request', data);
    const params = {
      api: 'mtop.data.item.get',
      v: '1.0',
      data,
      ecode: 0,   // 必须
      type: 'GET',
      //timeout: 3000 // 非必须。接口超时设置，默认为20000ms
    };
    console.log(JSON.stringify(params));
    this.pageUtils.Mtop.request(params, resp => {
      console.log('getItemsData resp', resp);
      const msg = (resp && resp.ret ? resp.ret[0] : '').split('::');
      if(msg[0] === 'SUCCESS'){
        const items = (resp && resp.data && resp.data.list) || [];
        this.setState({
          items,
          mtopDone: true,
        });
        cb();
      }

    }, err => {
      console.warn('getItemsData err', err);
      this.setState({
        items: [],
        mtopDone: true
      });
      cb();
    });

  }
  componentDidMount () {
    if(this.state.mds.widgetId){ //同步构建，数据直接在标签上传入的时候
      this.getItemsData(() => {
        this.updateShowData();
      });
    }
  }
  /**
   * 根据获取的数据设置显示状态
   */
  updateShowData = () => {
    let {mds, gdc, mtopDone} = this.state;
    this.setState({
      showDataStatus: mtopDone,
      showNoDataStatus: (gdc.preView === true || gdc.preView === 'true') && mtopDone
    });
  };

  renderItem(item) {
    const props = {
      style: {
        width: '90%',
        height: '90%',
      },
      source: {
        uri: item.imgUrl
      },
      lazyload: true,
    };
    const propsTouch = {
      onPress: this.onItemClick.bind(this),
      style: styles.itemsCell,
    };
    return (
      <Touchable {...propsTouch}>
        <Picture {...props} />
      </Touchable>
    );
  }
  renderItemsList() {
    const {items, mtopDone} = this.state;
    console.log('--------- items', items, 'mtopDone', mtopDone);
    if (items && items.length) {
      return (
        <View style={styles.itemsTop}>
          {
            items.map((item, i) => {
              return this.renderItem(item);
            })
          }
        </View>
      );
    }
    return null;
  }

  render() {
    const props = {
      style: styles.wrapper,
    };
    return (
      <View {...props}>
        {this.renderItemsList()}
        {this.renderImageTop()}
      </View>
    );
  }
}

