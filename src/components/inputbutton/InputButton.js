import React from 'react';
import Formsy from 'formsy-react';
import classNames from 'classnames';
import Style from './inputButton.less';

let timer;
const setTimer = (speed, count, cthis) => {
  let num = 0;
  timer = setInterval(() => {
    num++;
    cthis.setState({
      btnCount: cthis.state.btnCount - 1
    });
    if (num >= count) {
      clearInterval(timer);
      cthis.setState({
        canBtn: true,
        btnCount: null
      });
    }
  }, speed);
};

let COUNT = 2;

const InputButton = React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      loading: false,
      visible: false,
      canBtn: true,
      btnCount: null,
      email: null
    };
  },

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();

    clearInterval(timer);
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

  handleClick: function(event) {
    const fn = this.props.cbClick;
    this.setState({
      btnCount: COUNT
    });
    setTimer(1000, COUNT, this);
    fn && fn();
  },

  render: function() {
    const className = 'form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');

    const errorMessage = this.getErrorMessage();
    const props = this.props;

    const btnDisabled = props.disableBtn || !!this.state.btnCount;
    return (
      <div className={className + " input-button"}>
        <div className="input-group">
            <input type={props.type || 'text'} onBlur={this.blurValue} onKeyDown={this.keyDown}
                onChange={this.changeValue} value={this.getValue()} placeholder={props.placeholder}
                className="input-group-input" disabled={props.disabled}/>
            <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.handleClick} disabled={btnDisabled}>{props.btnText} <span>{this.state.btnCount}</span></button>
            </span>
        </div>
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});
export default InputButton;