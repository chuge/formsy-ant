import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import Input from 'antd/lib/input';
import {omitFormsyProps} from '../util';

class FormsyInput extends Component {
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

  handleOnBlur = (event) => {
    const {
      setValue,
      getValue,
      cbBlur
    } = this.props;

    // Validate at Blur
    setValue(getValue());
    // Execute onBlur prop
    if (typeof cbBlur === 'function') {
        cbBlur(event);
    }
  }

  handleChange = (event) => {
    const {
      setValue,
      isValidValue,
      getErrorMessage,
      cbChange
    } = this.props;

    const {
      value: targetValue
    } = event.target;
    const {
      value: currentTargetValue
    } = event.currentTarget;

    if (getErrorMessage() != null) {
      setValue(currentTargetValue);
    } else {
      if (isValidValue(targetValue)) {
        setValue(targetValue);
      } else {
        setValue(currentTargetValue, false);
      }
    }
    // Execute onChange prop
    if (typeof cbChange === 'function') {
      cbChange(event);
    }
  }

  render() {
    const {getValue} = this.props;
    const props = omitFormsyProps(this.props);
    return (
      <Input
        {...props}
        value={getValue() || ''}
        onChange={this.handleChange}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

export default withFormsy(FormsyInput);
