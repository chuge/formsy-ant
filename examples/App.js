import React, {Component} from 'react';
import {Form, FormItem, Input, Select, Slider, RadioGroup, Checkbox,
  CheckboxGroup, Switch, InputNumber, TTextarea, UploadImage,
   DatePicker, TEditor, TTransfer, HourPicker, RegionSingle, TRegionMultiple} from '../src';
import {Button} from 'antd';
import {tags} from './Data';

tags.forEach((item,index) => {
  item.key = index + '';
});

const Radio = RadioGroup.Radio;
const Option = Select.Option;

const province = '北京市';
const city = '110101';

const options = [
  { label: '苹果', value: 'Apple' },
  { label: '梨', value: 'Pear' },
  { label: '橘', value: 'Orange' },
];
class APP extends Component {
  state = {};

  handleSubmit = (model) => {
    this.setState({model})
  };

  render() {
    const {model} = this.state;
    return (<div>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          required
          label="Input"
        >
          <Input
            name="input"
            value="wmzy"
            validations="minLength:4"
            validationError="minLength:4"
            required
          />
        </FormItem>
        <FormItem
          required
          label="RegionSingle"
        >
          <RegionSingle name="RegionSingle" value={{province, city}}/>
        </FormItem>
        <FormItem
          required
          label="TRegionMultiple"
        >
          <TRegionMultiple name="TRegionMultiple" value={''} required/>
        </FormItem>
        <FormItem
          required
          label="TTransfer"
        >
          <TTransfer
            name="TTransfer"
            value="wmzy"
            dataSource={tags}
          />
        </FormItem>
        <FormItem
          required
          label="Input Number"
        >
          <InputNumber
            name="inputNumber"
            value={1}
            required
          />
        </FormItem>
        <FormItem
          required
          label="Select"
        >
          <Select
            name="sports"
            placeholder="select"
            required
          >
            <Option key="swim" value="swim">swim</Option>
            <Option key="football" value="football">football</Option>
          </Select>
        </FormItem>
        <FormItem
          required
          label="Editor"
        >
          <TEditor
            name="Editor"
            required
          />
        </FormItem>
        <FormItem required lable="HourPicker">
          <HourPicker name="hourpicker" value={['00:00', '01:00']} />
        </FormItem>
        <FormItem
          required
          label="Checkbox"
        >
          <Checkbox name="checkbox">选择</Checkbox>
        </FormItem>
        <FormItem
          required
          label="Checkbox Group"
        >
          <CheckboxGroup name="checkboxGroup" options={options} defaultValue={['Pear']} />
        </FormItem>
        <FormItem
          required
          label="Radio Group"
        >
          <RadioGroup name="radioGroup" value={1}>
            <Radio key="a" value={1}>A</Radio>
            <Radio key="b" value={2}>B</Radio>
            <Radio key="c" value={3}>C</Radio>
            <Radio key="d" value={4}>D</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem required label="DatePicker">
          <DatePicker name="DatePicker" pickerType="date" defaultValue="2011-12-12" style={{ width: 220 }} />
        </FormItem>
        <FormItem required label="RangePicker">
          <DatePicker name="RangePicker" pickerType="range" defaultValue={["2011-12-12", "2012-12-12"]} style={{ width: 220 }} />
        </FormItem>
        <FormItem
          required
          label="Switch"
        >
          <Switch name="switch" checkedChildren="开" unCheckedChildren="关" />
        </FormItem>
        <FormItem
          required
          label="Slider"
        >
          <Slider
            name="slider"
            min={0}
            max={100}
            step={1}
            marks={{0: '0', 100: '100'}}
          />
        </FormItem>
        <FormItem
          required
          label="TTextarea"
        >
          <TTextarea name="TTextarea"/>
        </FormItem>
        <FormItem
          required
          label="UploadImage"
        >
          <UploadImage name="UploadImage"/>
        </FormItem>
        <button type="submit">提交</button>
      </Form>
      <h3>model:</h3>
      <pre><code>
          {JSON.stringify(model, null, '  ')}
        </code></pre>
    </div>)
  }
}

export default APP;
