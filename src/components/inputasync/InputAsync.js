import React from 'react';
import Formsy from 'formsy-react';
import {
  Input
} from 'antd';

import Common from 'comcomp/Common';

const InputAsync = React.createClass({
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

    if (this.isValidValue(value)) {
      Common.myfetch(this.props.action).then((res) => {
        if (res.code === '0') {
          this.setValue(value);

          const fn = this.props.cbValid;
          fn && fn();
        } else {
          const fn = this.props.cbInvalid;
          fn && fn();

          const fn2 = this.props.cbUpdateError;
          fn2 && fn2();
        }
      }, (err) => {
        this.setInvalid(value);
      });
    } else {
      this.setInvalid(value);
    }
  },

  setInvalid(value) {
    this.setValue(value);

    const fn = this.props.cbInvalid;
    fn && fn();
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
             value={this.getValue()} placeholder={this.props.placeholder} disabled={this.props.disabled} />
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});
export default InputAsync;