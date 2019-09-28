import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import Checkbox from 'antd/lib/checkbox';
import {omitFormsyProps} from '../util';

const CheckboxGroup = Checkbox.Group;

class FormsyCheckboxGroup extends Component {
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

  render() {
    const {getValue, setValue} = this.props;
    const props = omitFormsyProps(this.props);
    return (
      <CheckboxGroup
        {...props}
        value={getValue() || []}
        onChange={setValue}
      />
    );
  }
}

export default withFormsy(FormsyCheckboxGroup);
