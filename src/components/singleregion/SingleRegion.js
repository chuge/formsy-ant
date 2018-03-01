import React from 'react';
import Formsy from 'formsy-react';
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

const SingleRegion = React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      cities: cities
    };
  },

  componentWillMount() {
    const value = this.getValue();
    const province = value ? value.province : defaultProvince;
    const city = value ? value.city : defaultCity

    this.setValue({
      province,
      city
    });

    this.setState({
      cities: cityData[province]
    });
  },

  handleProvinceChange(province) {
    const city = cityData[province][0]['code'];

    this.setState({
      cities: cityData[province]
    });
    this.setValue({
      province,
      city
    });
  },

  onSecondCityChange(city) {
    this.setValue({
      province: this.getValue().province,
      city
    });
  },

  render() {
    const className = 'form-group clearfix ' + (this.props.className + ' ' || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();

    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city['code']}>{city['name']}</Option>);

    const province = this.getValue().province;
    const city = this.getValue().city;

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
});
export default SingleRegion;