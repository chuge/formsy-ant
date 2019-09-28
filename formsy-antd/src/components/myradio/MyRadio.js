import React from 'react';
import {
  Radio
} from 'antd';
import Formsy from 'formsy-react';

import Style from './myRadio.less';

const RadioGroup = Radio.Group;

const MyRadio = React.createClass({
  mixins: [Formsy.Mixin],

  onChange(e) {
    const {
      value
    } = e.target;

    this.setValue(value);

    const fn = this.props.cbChange;

    fn && fn(value);
  },

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

  render() {
    const className = 'my-radio form-group ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();
    const props = this.props;
    const options = props.options || [];
    const items = options.map((item, index) => <Radio key={index} value={item.id}>{item.value}</Radio>);

    return (
      <div className={className}>
        <RadioGroup onChange={this.onChange} value={this.getValue()}>
          {items}
        </RadioGroup>

        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }

});

export default MyRadio;