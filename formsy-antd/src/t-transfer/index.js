import React, { Component, PropTypes } from 'react';
import { withFormsy } from 'formsy-react';
import { omitFormsyProps } from '../util';

import Shim from './shim';

class FormsyTTransfer extends Component {

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
  }

  componentDidMount() {
    let defaultVal = this.props.getValue();
    Array.isArray(defaultVal) && defaultVal.length === 0 && this.props.setValue(undefined);
  }

  _select = (value) => {
    this.props.setValue(value);
  }

  render() {
    let {
      className,
      placeholder,
      dataSource,
      isTag,
      isSingle
    } = this.props;
    let value = this.props.getValue() || [];
    let props2 = {
      placeholder,
      dataSource,
      isTag,
      isSingle,
      value
    };

    return (
      <div className={`mulit-select ${className || ''} clearfix`}>
        <Shim {...props2} cbSelect={this._select} />
        {
          this.props.showRequired() && <p className='validation-required red-text'>至少选择一个标签</p>
        }
      </div>
    );
  }
}

export default withFormsy(FormsyTTransfer);