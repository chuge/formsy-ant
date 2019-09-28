import React from 'react';
import {
  Checkbox
}
from 'antd';
import Formsy from 'formsy-react';

import Style from './myCheckbox.less';

const CheckboxGroup = Checkbox.Group;

const MyCheckbox = React.createClass({
  mixins: [Formsy.Mixin],

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

  onChange(checkedValues) {
    this.setValue(checkedValues && checkedValues.length !== 0 ? checkedValues : undefined);
  },

  componentDidMount() {
    const value = this.getValue() || undefined;
    this.onChange(value);
  },

  render() {
    const className = 'my-checkbox form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
				<CheckboxGroup options={this.props.options} defaultValue={this.getValue()} onChange={this.onChange} />
				<span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>至少选择一项</span>
      </div>
    );
  }

});

export default MyCheckbox;