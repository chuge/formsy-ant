import React from 'react';
import {
  Checkbox
}
from 'antd';
import Formsy from 'formsy-react';

import Style from './SingleCheckbox.less';

const SingleCheckbox = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(event) {
    const {
      checked
    } = event.target;

    this.setValue(checked || undefined);

    const fn = this.props.cbChange;
    fn && fn(checked);
  },

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

  render() {
    const className = 'form-group my-checkbox ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const {
      name,
      label
    } = this.props;
    return (
      <div className={className}>
        <label>
          <Checkbox name={name} onChange={this.changeValue} checked={this.getValue()}/>
          <span dangerouslySetInnerHTML={{__html: label}}></span>
        </label>

        <span className='validation-required'>必选</span>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default SingleCheckbox;