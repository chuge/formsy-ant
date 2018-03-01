import React from 'react';
import {
  Select
}
from 'antd';
import Util from 'comcomp/Util';
import Formsy from 'formsy-react';

const Option = Select.Option;

const MySelect = React.createClass({
  mixins: [Formsy.Mixin],

  onChange(selected) {
    this.setValue(selected);

    const {
      cbSelect
    } = this.props;
    cbSelect && cbSelect(selected);
  },

  render() {
    const props = this.props;
    const className = 'form-group ' + (props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const options = props.options || [];
    const items = options.map((item, index) => <Option key={index} value={item.id}>{item.value}</Option>);
    const defaultSelected = Util.isNothing(this.getValue()) ? undefined : this.getValue() + '';

    return (
      <div className={className}>
        <Select value={defaultSelected} showSearch={props.showSearch} optionFilterProp={props.optionFilterProp} notFoundContent={props.notFoundContent} onChange={this.onChange} placeholder={props.placeholder}>
          {items}
        </Select>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必选</span>
      </div>
    );
  }

});

export default MySelect;