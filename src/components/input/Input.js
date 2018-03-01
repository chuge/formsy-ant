import React from 'react';
import Formsy from 'formsy-react';
import {
  Input
} from 'antd';

const MyInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function(event) {
    if (this.getErrorMessage() != null) {
      this.setValue(event.currentTarget.value);
    } else {
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
      } else {
        this.setState({
          _value: event.currentTarget.value
        });
      }
    }
  },

  blurValue: function(event) {
    const value = event.currentTarget.value;
    this.setValue(value);

    if (this.isValidValue(value)) {
      const fn = this.props.cbValid;
      fn && fn();
    } else {
      const fn = this.props.cbInvalid;
      fn && fn();
    }
  },

  keyDown: function(event) {
    if (event.keyCode == '13') {
      this.setValue(event.currentTarget.value);
    }
  },

  render: function() {
    const className = 'form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <Input type={this.props.type || 'text'} onBlur={this.blurValue} onKeyDown={this.keyDown} onChange={this.changeValue}
             value={this.getValue()} placeholder={this.props.placeholder} disabled={this.props.disabled} readOnly={this.props.readOnly}/>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});
export default MyInput;