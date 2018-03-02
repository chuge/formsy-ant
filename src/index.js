import Form from './form';
import FormItem from './form-item';
import Input from './input';
import InputNumber from './input-number';
import Select from './select';
import Switch from './switch';
import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';
import RadioGroup from './radio-group';
import Slider from './slider';
import UploadImage from './upload-image';
import DatePicker from './date-picker';
import HourPicker from './hour-picker';
import RegionSingle from './region-single';

// 区分t-和没有前缀，方便以后维护识别哪些是antd扩展，哪些不是
import TTransfer from './t-transfer';
import TTextarea from './t-textarea';
import TEditor from './t-editor';
import TRegionMultiple from './t-region-multiple';

module.exports = {
  FormItem,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Slider,
  UploadImage,
  DatePicker,
  HourPicker,
  TTransfer,
  TTextarea,
  TEditor,
  RegionSingle,
  TRegionMultiple
};
