import {createElement, Component} from 'rax';
const { WEEX_MOCK_DATA } = process.env;

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function modWrap(WrappedComponent) {
  return class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    render() {
      const props = {
        ...this.props,
        mds: {},
        gdc: {},
        ...WEEX_MOCK_DATA,
        pageUtils: {
          emitter: {
            emit() {},
            on() {},
            off() {},
          },
          Mtop: {
            request(params, success = (resp) => {}, error = () => {} ) {
              console.log('Mtop.request', params);
              if (lib && lib.mtop) {
                return lib.mtop.request(params, success, error);
              }
            }
          },
          // 页面跳转需通过此方法
          goTargetUrl({ url = '', nid = 0, widgetId = 0, moduleName = '' }) {
            console.log('goTargetUrl', url);
          },
          goTop() {
            console.log('goTop');
          }
        }
      };
      return (
        <WrappedComponent {...props} />
      );
    }
  }
}
