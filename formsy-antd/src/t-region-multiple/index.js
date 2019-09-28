import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import {omitFormsyProps} from '../util';

import {
  Modal
} from 'antd';

import List from './list';

import Style from './index.less';
import ESUIStyle from './esui.css';

let region1;

class FormsyRegionMultiple extends Component {

  state = {
    visible: false
  }

  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    formsyAntd: PropTypes.shape({
      emitError: PropTypes.func.isRequired
    })
  };

  componentWillUpdate() {
    if (this.context.formsyAntd && !this.props.isPristine()) {
      const message = this.props.getErrorMessage();
      const status = message === null ? 'success' : 'error';
      this.context.formsyAntd.emitError(message, status);
    }
    Style.use();
    ESUIStyle.use();
  }

  componentWillUnmount() {
    Style.unuse();
    ESUIStyle.unuse();
  }

  showModal = () => {
    let _this = this;

    _this.setState({
      visible: true
    });

    // settimeout 让modal先生成dom树
    setTimeout(function() {
      require.ensure([], () => {
        const ui = require('esui/src/main');
        require('esui/src/Region.js');

        const regions = !!_this.props.getValue() ? _this.props.getValue().split(',') : [];

        let controls = ui.init(
          document.getElementById('regionWrap'), {
            properties: {
              region: {
                regionData: List.regionList
              }
            }
          }
        );

        if (!!controls[0]) {
          region1 = controls[0];
          region1.setProperties({
            rawValue: regions
          });
        }
      }, 'esui')
    }, 0);

  }

  changeValue = (value) => {
    this.props.setValue(value);
  }

  getDisplayText = () => {
    const value = this.props.getValue();
    const matches = value.match(/\b(10|999|0)\b/g);
    if (!value) {
      return '未选择';
    } else if (!!matches && matches.length === 3) {
      return '全部地域'
    } else {
      return '部分地域';
    }
  }

  handleOk = () => {
    let allValue = region1.getValue();

    this.changeValue(allValue);

    this.setState({
      visible: false
    });
    this.props.cbSelect && this.props.cbSelect(allValue);
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  render() {
    const className = 'form-group region-component ' + (this.props.className + ' ' || ' ') +
      (this.props.showRequired() && !this.props.isPristine() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className={className}>
        <input
          type="text"
          name={this.props.name}
          value={this.props.getValue()}
          className="hide"
          readOnly
        />
        <span className="display">{this.getDisplayText()}</span><a className="action" onClick={this.showModal}>更改</a>
        <Modal className="region-modal" title="选择投放地域" visible={this.state.visible} width="700" maskClosable={false}
          onCancel={this.handleCancel}
          footer={[
            <button type="button" key="1" onClick={this.handleCancel} className="ta-btn ta-btn-minor mr20">取消</button>,
            <button type="submit" key="2" onClick={this.handleOk} className="ta-btn ta-btn-major">确定</button>
          ]}
        >
          <div id="regionWrap" className="region-wrap">
            <div id="region" data-ui-type="Region" data-ui-id="region"></div>
          </div>
        </Modal>

        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必须选择地区</span>
      </div>
    );
  }
}

export default withFormsy(FormsyRegionMultiple);