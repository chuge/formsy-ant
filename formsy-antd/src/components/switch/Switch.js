import React from 'react';
import Formsy from 'formsy-react';
import {
  Switch
}
from 'antd';

const MySwitch = React.createClass({
  mixins: [Formsy.Mixin],

  onChange(checked) {
    this.setValue(checked);

    const fn = this.props.cbChange;
    fn && fn(checked);
  },

  render() {
    const className = 'form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
				<Switch checked={this.getValue()} onChange={this.onChange} />
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }

});

export default MySwitch;