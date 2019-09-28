import React from 'react';
import Formsy from 'formsy-react';
import Style from './myTextarea.less';
const MyInput = React.createClass({

  mixins: [Formsy.Mixin],

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

  changeValue(event) {
    const value = event.currentTarget['value'];
    this.setValue(value);
  },

  _blur() {
    //被操作过则调用
    if (!this.isPristine()) {
      this.props.cbTextareaChanged();
    }
  },

  render() {
    const className = 'form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>

          <textarea
            type={this.props.type || 'text'}
            className="ta-textarea"
            name={this.props.name}
            onChange={this.changeValue}
            onBlur={this._blur}
            value={this.getValue()}
            placeholder={this.props.placeholder}
          >
          </textarea>
          <span className='validation-error'>{errorMessage}</span>
          <span className='validation-required'>必填</span>
        </div>
    );
  }
});

export default MyInput;