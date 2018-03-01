import React, {Component} from 'react';
import {Form, FormItem, Input, Select, Slider, RadioGroup, Checkbox, CheckboxGroup, Switch, InputNumber, TTextarea, UploadImage, DatePicker} from '../src';
import {Button} from 'antd';
import Data from './Data';

const {tags} = Data;

const Radio = RadioGroup.Radio;
const Option = Select.Option;
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
