import React, { Component, PropTypes } from 'react';
import { withFormsy } from 'formsy-react';
import { omitFormsyProps } from '../util';
import moment from 'moment';
import {
  DatePicker
} from 'antd';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import GregorianCalendar from 'gregorian-calendar';

import Style from './index.less';

const RangePicker = DatePicker.RangePicker;

const convertDateToString = (date) => {
  if (!date) {
    return;
  }
  if (typeof date === 'string') {
    return date;
  } else {
    return moment(date).format('YYYY-MM-DD');
  }
};

class FormsyDatePicker extends Component {

  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    formsyAntd: PropTypes.shape({
      emitError: PropTypes.func.isRequired
    })
  };

  componentWillUpdate() {
    if (this.context.formsyAntd && !this.props.isPristine()) {
      const message = this.props.getErrorMessage();
      const status = message === null ? 'success' : 'error';
      this.context.formsyAntd.emitError(message, status);
    }
    Style.use();
  }

  componentWillUnmount() {
    Style.unuse();
  }

  onChange = (value) => {
    if (!value) {
      return;
    }
    const {
      pickerType,
      setValue,
      cbChange
    } = this.props;

    if (pickerType === 'range') {
      if (value[0] === null && value[1] === null) {
        setValue(undefined);
      } else {
        setValue(value);
      }
    } else {
      setValue(value);
      cbChange && cbChange(convertDateToString(value));
    }
  }

  render() {
    const {
      pickerType = 'date',
      setValue,
      getValue,
      value // to do
    } = this.props;

    const props = omitFormsyProps(this.props);
    let start = null;
    let end = null;

    const daterange = getValue();
    if (daterange) {
      if (daterange[0] && daterange[1]) {
        start = new GregorianCalendar(zhCn);
        end = new GregorianCalendar(zhCn);
        start.setTime(new Date(daterange[0]));
        end.setTime(new Date(daterange[1]));
      }
    }

    return (
      <div>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          value={getValue()}
          placeholder={this.props.title}
          className="hide"
          readOnly
        />
        {pickerType === 'range'
          ?
          <RangePicker defaultValue={[start, end]} onChange={this.onChange} toggleOpen={this._toggle}/>
          :
          <DatePicker onChange={this.onChange} value={getValue()} toggleOpen={this._toggle}/>
        }
      </div>
    );
  }
}

export default withFormsy(FormsyDatePicker);