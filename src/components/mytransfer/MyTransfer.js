import React from 'react';
import {
  Select,
  Transfer
}
from 'antd';
import Formsy from 'formsy-react';

const Option = Select.Option;

const MyTransfer = React.createClass({
  mixins: [Formsy.Mixin],

  filterOption(inputValue, option) {
    return option['value'].indexOf(inputValue) > -1;
  },

  handleChange(targetKeys) {
    this.setValue(targetKeys.length === 0 ? undefined : targetKeys);
  },

  render() {
    const props = this.props;
    const className = 'form-group ' + (props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
         <Transfer
          dataSource={this.props.dataSource}
          showSearch
          filterOption={this.filterOption}
          targetKeys={this.getValue()}
          onChange={this.handleChange}
          render={item => item.value}
          listStyle={{
          width: '42%',
          height: 300,
          }}
        />
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必选</span>
      </div>
    );
  }

});

export default MyTransfer;