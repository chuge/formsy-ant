import React from 'react';
import {
  Upload,
  Spin,
  Icon,
  message
} from 'antd';

import Style from './shim.less';

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

        this.props.cbChange(data);
        message.success('上传图片成功');
      } else {
        message.error(res['desc']);
      }

    } else if (info.file.status === 'error') {
      message.error('上传图片请求出错，请稍候重试');
    }
  }

  checkImageSize(file, imgTypeSize) {
    const _this = this;
    return new Promise(function(resolve, reject) {

      function check(width, height) {
        if ((width === imgTypeSize.width || !imgTypeSize.width) && (height === imgTypeSize.height || !imgTypeSize.height)) {
          _this.setState({
            checked: true
          });
          resolve(file);
        } else {
          _this.setState({
            checked: false
          });
          message.error('图片大小不对，要求尺寸为' + (imgTypeSize.width || '宽度不限') + '*' + (imgTypeSize.height || '高度不限'));
        }
      }

      if (typeof FileReader === 'function') {
        //读取图片数据
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          //加载图片获取图片真实宽度和高度
          const image = new Image();
          image.onload = function() {
            const width = image.width;
            const height = image.height;

            check(width, height);
          };
          image.src = data;
        };
        reader.readAsDataURL(file);
      } else {
        message.error('你的浏览器不支持图片大小判断，请更换现代浏览器，例如Chrome');
      }

    });
  }

  checkIsImage(file) {
    const fileName = file.name;
    const {
      disabledGIF
    } = this.props;

    if (disabledGIF) {
      return {checker: fileName.match(/.jpg|.jpeg|.png/), msg: '上传的必须是jpg，jpeg，png类型的图片'};
    }

    return {checker: fileName.match(/.jpg|.jpeg|.png|.gif/), msg: '上传的必须是jpg，jpeg，png，gif类型的图片'};
  }

  checkFileSize(file) {
    const {
      size
    } = file;

    if (size >= this.props.size * 1024) {
      return false;
    }

    return true;
  }

  handleBeforeUpload(file) {
    const props = this.props;
    const imgTypeSize = {
      width: props.width || undefined,
      height: props.height || undefined
    };

    const {checker, msg} = this.checkIsImage(file);

    if (!checker) {
      message.error(msg);
      return false;
    }

    if (props.size) {
      if (!this.checkFileSize(file)) {
        message.error(`上传的必须不大于${props.size}KB`);
        return false;
      }
    }

    return this.checkImageSize(file, imgTypeSize);
  }

  render() {
    let {
      style,
      uploadUrl
    } = this.props;

    const url = uploadUrl || '/upload/index';
    const attrs = {
      action: url,
      name: 'file',
      showUploadList: false,
      onChange: this.handleChange.bind(this),
      beforeUpload: this.handleBeforeUpload.bind(this),
      data: this.props.data
    };

    const value = this.state.value || this.props.value;

    return (
      <div className={this.props.className + ' upload-image'} style={style}>
        <Dragger className="upload-dialog" {...attrs}>
          <div className={!!value || !!this.state.loading ? 'hide' : ''}/>
          <Spin className={this.state.loading ? '' : 'hide'}/>
          <div className={value ? 'hide' : ''}>
            <p className="ant-upload-drag-icon">
              <Icon type="cloud-upload" />
            </p>
            <p className="ant-upload-text">点击上传</p>
          </div>
          <div className={value ? '' : 'hide'}>
            <img className="img image-preview" src={value}/>
          </div>
        </Dragger>
      </div>
    );
  }
}