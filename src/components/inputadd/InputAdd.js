import React from 'react';
import Formsy from 'formsy-react';
import {
  Input
} from 'antd';
import Style from './inputAdd.less';

const MyInputAdd = React.createClass({
  mixins: [Formsy.Mixin],

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

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

  _add() {
    if (!this.isValid()) {
      return;
    }

    const fn = this.props.cbAdd;
    fn && fn(this.getValue());

    this.setValue('');
  },

  render: function() {
    const className = 'form-group input-add ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <Input type={this.props.type || 'text'} onBlur={this.blurValue} onKeyDown={this.keyDown} onChange={this.changeValue}
             value={this.getValue()} placeholder={this.props.placeholder} disabled={this.props.disabled} />

        <a className="icon-container" onClick={this._add} disabled={!this.isValid()} >
          <i type="plus" className="anticon anticon-plus"></i>
        </a>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});
export default MyInputAdd;