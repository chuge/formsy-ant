import React, { Component, PropTypes } from 'react';
import { withFormsy } from 'formsy-react';
import { omitFormsyProps } from '../util';
import Shim from './shim';

class FormsyTEditor extends Component {
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

  _blur = (value) => {
    this.props.setValue(value);
  }

  render() {
    const {
      getValue
    } = this.props;

    return <div>
      <Shim {...this.props} value={getValue()} cbBlur={this._blur} />
    </div>;
  }
}

export default withFormsy(FormsyTEditor);
