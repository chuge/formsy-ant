import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import moment from 'moment';
import { TimePicker } from 'antd';
import {omitFormsyProps} from '../util';

import {
  Select
} from 'antd';

import areacode from './areacode';
const Option = Select.Option;

const provinceData = areacode['proArr'];
const cityData = areacode['cityObj'];

const defaultProvince = provinceData[0];
const cities = cityData[defaultProvince];
const defaultCity = cities[0]['code'];

class FormsyRegionSingle extends Component {
  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  state = {
    cities: cities
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
    const value = this.props.getValue();
    const province = value ? value.province : defaultProvince;
    const city = value ? value.city : defaultCity

    this.props.setValue({
      province,
      city
    });

    this.setState({
      cities: cityData[province]
    });
  }

  handleProvinceChange = (province) => {
    const city = cityData[province][0]['code'];

    this.setState({
      cities: cityData[province]
    });
    this.props.setValue({
      province,
      city
    });
  }

  onSecondCityChange = (city) => {
    this.props.setValue({
      province: this.props.getValue().province,
      city
    });
  }

  render() {
    const className = 'form-group clearfix ' + (this.props.className + ' ' || ' ') +
      (this.props.showRequired() && !this.props.isPristine() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city['code']}>{city['name']}</Option>);

    const province = this.props.getValue().province;
    const city = this.props.getValue().city;

    return (
      <div className={className}>
        <Select value={province} style={{float: "left", width: "48%"}} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select value={city} style={{float: "right", width: "48%"}} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>

        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
}
export default withFormsy(FormsyRegionSingle);