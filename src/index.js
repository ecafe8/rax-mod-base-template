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

