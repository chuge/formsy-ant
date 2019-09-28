
import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import moment from 'moment';
import { TimePicker } from 'antd';
import {omitFormsyProps} from '../util';

const newArray = function(start, end) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

class FormsyHourPicker extends Component {
  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  state = {
    start: undefined,
    end: undefined,
    minEndHour: 0
  }

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
  }

  componentDidMount() {
    const hourrange = this.props.getValue();
    let start;
    let end;

    if (!hourrange) {
      start = new Date('2000/01/01 00:00:00');
      end = new Date('2000/01/01 00:00:00');
    } else {
      start = new Date(`2000/01/01 ${hourrange[0]}`);

      if (hourrange[1].split(':')[0] === '24') {
        /**
         * safari不支持格式化24:00，故将24:00改成00:00
         */
        end = new Date(`2000/01/01 00:${hourrange[1].split(':')[1]}`);
      } else {
        end = new Date(`2000/01/01 ${hourrange[1]}`);
      }
    }
    this.props.setValue([start, end]);
    this.setState({
      start,
      end,
      minEndHour: start.getHours()
    });
  }

  getMS(data) {
    return moment(data).format('HH:mm');
  }

  setHours = (range) => {
    let { start, end } = this.state;

    if (
      this.getMS(start) === this.getMS(range[0]) &&
      this.getMS(end) === this.getMS(range[1])
    ) {
      return;
    }
    this.props.setValue(range);
    this.setState(
      {
        start: range[0],
        end: range[1],
        minEndHour: range[0].getHours()
      },
      () => {
        this.props.cbChange && this.props.cbChange(range);
      }
    );
  }

  disabledMinutes = (h) => {
    if (this.props.showMin) {
      return null;
    } else {
      return newArray(1, 60);
    }
  }

  disabledMinutesEnd = (h) => {
    let startHour = this.state.start.getHours();
    let startMin = this.state.start.getMinutes();
    if (this.props.showMin) {
      if (startHour === 0 && h === 0) {
        return newArray(0, startMin);
      } else if (h === 0) {
        return newArray(1, 60);
      } else if (h === startHour) {
        return newArray(0, startMin);
      } else {
        return null;
      }
    } else {
      return newArray(1, 60);
    }
  }

  disabledStartHours = () => {
    return newArray(0, this.props.minStartHour || 0);
  }

  disabledEndHours = () => {
    return newArray(1, this.state.minEndHour + 1);
  }

  handleStartChange = (value) => {
    let minEndHour;
    let combined = {
      start: value
    };
    let end = this.props.getValue() ? this.props.getValue()[1] : null;
    if (!value) {
      minEndHour = 0;
      this.props.setValue(undefined);
    } else {
      minEndHour = value.getHours();

      if (end < value) {
        end = moment(value)
          .add('hour', 1)
          .toDate();
      }

      combined = Object.assign({}, combined, {
        end
      });
      this.props.setValue([value, end]);
    }

    combined = Object.assign({}, combined, {
      minEndHour
    });

    this.setState(combined, () => {
      this.props.cbChange && this.props.cbChange([value, end]);
    });
  }

  handleEndChange = (value) => {
    const start = this.props.getValue() ? this.props.getValue()[0] : null;
    if (!value) {
      this.props.setValue(undefined);
    } else {
      this.props.setValue([start, value]);
    }

    this.setState(
      {
        end: value
      },
      () => {
        this.props.cbChange && this.props.cbChange([start, value]);
      }
    );
  }

  render() {
    const className =
      "ta-hour-picker form-group " +
      (this.props.className || " ") +
      (this.props.showRequired() && !this.props.isPristine()
        ? "required"
        : this.props.showError() ? "error" : "");

    const errorMessage = this.props.getErrorMessage();

    let { disabled } = this.props;

    let { start, end } = this.state;

    return (
      <div className={className}>
        <TimePicker
          className="hour-picker-dialog"
          value={start}
          format="HH:mm"
          onChange={this.handleStartChange}
          disabledHours={this.disabledStartHours}
          disabledMinutes={this.disabledMinutes}
          hideDisabledOptions
          disabled={disabled}
        />
        <span> ~ </span>
        <TimePicker
          className="hour-picker-dialog"
          value={end}
          format="HH:mm"
          onChange={this.handleEndChange}
          disabledHours={this.disabledEndHours}
          disabledMinutes={this.disabledMinutesEnd}
          hideDisabledOptions
          disabled={disabled}
        />
        <span className="validation-error">{errorMessage}</span>
        <span className="validation-required">必填</span>
      </div>
    );
  }
}
export default withFormsy(FormsyHourPicker);
