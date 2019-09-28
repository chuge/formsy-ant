import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import Select from 'antd/lib/select';
import {omitFormsyProps} from '../util';

class FormsySelect extends Component {
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

  handleChange = (value) => {
    const {
      setValue,
      cbChange
    } = this.props;

    setValue(value);

    if (typeof cbChange === 'function') {
      cbChange(value);
    }
  }

  render() {
    const {getValue, setValue} = this.props;
    const props = omitFormsyProps(this.props);
    return (
      <Select
        {...props}
        value={getValue()}
        onChange={this.handleChange}
      />
    );
  }
}

const HOCFormsySelect = withFormsy(FormsySelect);
HOCFormsySelect.Option = Select.Option;

export default HOCFormsySelect;
