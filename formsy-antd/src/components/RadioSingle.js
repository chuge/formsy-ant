import {
  Radio
}
from 'antd';

import React from 'react';
import Formsy from 'formsy-react';
const MyRadioSingle = React.createClass({
  mixins: [Formsy.Mixin],

  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    });
  },

  render() {
    const className = 'ta-radio-single form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
				<Radio defaultChecked={true} onChange={this.onChange}>{this.props.label}</Radio>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }

});

export default MyRadioSingle;