import React from 'react';
import {
  Upload,
  Spin,
  Icon,
  message
}
from 'antd';
import Config from 'comcomp/Config';
import ComConst from 'comcomp/Const';
import Style from './uploadImageShim.less';

const Dragger = Upload.Dragger;

export default class UploadImageShim extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checked: false,
      value: undefined
    };
  }

  componentWillMount() {
    Style.use();
  }

  componentWillUnmount() {
    Style.unuse();
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      value: undefined
    };
  }

  handleChange(info) {
    console.log(info.file.status);
    let fileList = info.fileList;

    fileList = fileList.slice(-1);

    this.setState({
      loading: info.file.status === 'uploading' && this.state.checked
    });

    if (info.file.status === 'done') {
      const res = fileList[0].response;

      if (res['code'] === '0') {
        let data = res.data;

        const imageLink = data.url;

        this.setState({
          value: imageLink
        });

        this.props.cbImageChanged(imageLink);
        message.success('上传图片成功', ComConst.MESSAGE_DURATION);
      } else {
        message.error(res['desc'], ComConst.MESSAGE_DURATION);
      }

    } else if (info.file.status === 'error') {
      message.error('上传图片请求出错，请稍候重试', ComConst.MESSAGE_DURATION);
    }
  }

  checkImageSize(file, imgTypeSize) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      console.log('start check');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        const target = '.' + _this.props.className + ' .temp-img';
        const $target = $(target);
        $target.attr('src', this.result);
        const height = $target[0].naturalHeight;
        const width = $target[0].naturalWidth;
        if (width === imgTypeSize.width && (height === imgTypeSize.height || !imgTypeSize.height)) {
          _this.setState({
            checked: true
          });
          resolve(file);
        } else {
          _this.setState({
            checked: false
          });
          message.error('图片大小不对，要求尺寸为' + (imgTypeSize.width || '宽度不限') + '*' + (imgTypeSize.height || '高度不限'), ComConst.MESSAGE_DURATION);
        }
        console.log('check finshed');
      };
    });
  }

  checkIsImage(file) {
    const fileName = file.name;
    return !!fileName.match(/.jpg|.jpeg|.png|.gif/);
  }

  handleBeforeUpload(file) {
    const props = this.props;
    const imgTypeSize = {
      width: props.width || 640,
      height: props.height || undefined
    };

    if (!this.checkIsImage(file)) {
      message.error('上传的必须是jpg，jpeg，png，gif类型的图片', ComConst.MESSAGE_DURATION);
      return false;
    }

    return this.checkImageSize(file, imgTypeSize);
  }

  render() {
    const url = Config.getValue('upload').url;
    const attrs = {
      action: url,
      name: 'file',
      showUploadList: false,
      onChange: this.handleChange.bind(this),
      beforeUpload: this.handleBeforeUpload.bind(this)
    };

    const value = this.state.value || this.props.value;

    return (
      <div className={this.props.className + ' upload-image'}>
        <Dragger className="upload-dialog" {...attrs}>
          <div className={!!value || !!this.state.loading ? 'hide' : ''}/>
          <Spin className={this.state.loading ? '' : 'hide'}/>
          <p className="ant-upload-drag-icon">
            <Icon type="cloud-upload" />
          </p>
          <p className="ant-upload-text">点击上传</p>
          <div className={value ? '' : 'hide'}>
            <img className="img image-preview" src={value}/>
          </div>
        </Dragger>
        <img className="ta-hide temp-img"/>
      </div>
    );
  }
}