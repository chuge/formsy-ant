import React from 'react';
import Formsy from 'formsy-react';

const MyInputAddon = React.createClass({
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
    this.setValue(event.currentTarget.value);
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
    const props = this.props;
    return (
      <div className={className}>
        <div className="input-group">
            <input type={props.type || 'text'} onBlur={this.blurValue} onKeyDown={this.keyDown}
                onChange={this.changeValue} value={this.getValue()} placeholder={props.placeholder}
                className="input-group-major" disabled={props.disabled}/>
            <span className="input-group-addon" id="basic-addon2">{props.addon}</span>
        </div>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});
export default MyInputAddon;