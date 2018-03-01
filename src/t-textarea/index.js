import React, { Component, PropTypes } from 'react';
import { withFormsy } from 'formsy-react';
import { omitFormsyProps } from '../util';

import Style from './index.less';
class FormsyTTextArea extends Component {
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
  }

  componentWillUnmount() {
    Style.unuse();
  }

  _change = (event) => {
    const value = event.currentTarget['value'];
    this.props.setValue(value);
  }

  _blur = () => {
    //被操作过则调用
    if (!this.props.isPristine()) {
      this.props.cbChange && this.props.cbChange(this.props.getValue());
    }
  }

  render() {
    const props = omitFormsyProps(this.props);
    return <textarea className='t-textarea' {...props} onChange={this._change} onBlur={this._blur}/>;
  }
}

export default withFormsy(FormsyTTextArea);
