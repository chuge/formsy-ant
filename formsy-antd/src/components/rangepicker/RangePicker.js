import React from 'react';
import Formsy from 'formsy-react';
import {
    DatePicker
}
from 'antd';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import GregorianCalendar from 'gregorian-calendar';
import Style from './rangePicker.less';
const RangePicker = DatePicker.RangePicker;
const MyRangePicker = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        Style.use();
    },

    componentWillUnmount() {
        Style.unuse();
    },

    onChange(value) {
        if (!value) {
            return;
        }
        if (value[0] === null && value[1] === null) {
            this.setValue(undefined);
        } else {
            this.setValue(value);
        }
        console.log(this.getValue());
    },
    render() {
        const className = 'form-group range-picker ' + (this.props.className || ' ') +
            (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');

        const errorMessage = this.getErrorMessage();

        let start = null;
        let end = null;

        const daterange = this.getValue();
        if (daterange) {
            if (!!daterange[0] && !!daterange[1]) {
                start = new GregorianCalendar(zhCn);
                end = new GregorianCalendar(zhCn);
                start.setTime(new Date(daterange[0]));
                end.setTime(new Date(daterange[1]));
            }
        }

        return (
            <div className={className}>
                <input type={this.props.type || 'text'} name={this.props.name} value={this.getValue()} placeholder={this.props.title} className="hide" readOnly />

                <RangePicker defaultValue={[start, end]} style={{ width: 235 }} onChange={this.onChange} disabled={this.props.disabled}/>

                <span className='validation-error'>{errorMessage}</span>
                <span className='validation-required'>必填</span>
            </div>
        );
    }
});

export default MyRangePicker;