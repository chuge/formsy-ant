import React from 'react';
import Formsy from 'formsy-react';
import {
  Upload,
  message,
  Input
}
from 'antd';

import Config from 'comcomp/Config';
import ComConst from 'comcomp/Const';
import Style from './uploadFile.less';

const url = Config.getValue('upload').url;

const UploadFile = React.createClass({

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      loading: false,
      status: 'init'
    };
  },

  componentWillMount() {
    Style.use();
  },

  componentWillUnmount() {
    Style.unuse();
  },

  handleChange(info) {
    let fileList = info.fileList;

    fileList = fileList.slice(-1);

    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      });
    } else {
      this.setState({
        loading: false
      });
    }
    if (info.file.status === 'done') {
      const res = fileList[0].response;

      if (res['code'] === '0') {
        let data = res.data;
        this.setValue({
          uploadRecordId: data.recordId,
          fileName: data.fileName,
          url: data.url
        });
        this.setState({
          status: 'done'
        });
        message.success('上传文件成功', ComConst.MESSAGE_DURATION);
      } else {
        this.setState({
          status: 'error'
        });
        message.error(res['desc'], ComConst.MESSAGE_DURATION);
      }

    } else if (info.file.status === 'error') {
      this.setState({
        status: 'error'
      });
      message.error('上传文件请求出错，请稍候重试', ComConst.MESSAGE_DURATION);
    }
  },

  checkIsImg(file) {
    const fileName = file.name;
    return !!fileName.match(/.png|.jpg|.gif/);
  },

  handleBeforeUpload(file) {
    if (!this.checkIsImg(file)) {
      message.error('上传的必须是图片', ComConst.MESSAGE_DURATION);
      return false;
    } else {
      return true;
    }
  },

  render() {
    const className = 'form-group upload-file ' + (this.props.className || ' ') +
      (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');

    const errorMessage = this.getErrorMessage();
    const attrs = {
      action: url,
      onChange: this.handleChange,
      showUploadList: false,
      beforeUpload: this.handleBeforeUpload
    };
    const btnName = this.props.btnName || '上传';

    const uploadPane = <Upload {...attrs} className={this.state.loading ? 'hide' : 'file-button-wrapper'}>
                    <button type="button" className="btn btn-default">
                        <span>{this.state.status === 'done' ? '更改' : btnName}</span>
                    </button>
                </Upload>;

    return (
      <div className={className}>
        <input type={this.props.type || 'text'} name={this.props.name} value={this.getValue()} placeholder={this.props.title} className="hide" readOnly />

        <div className="input-file-wrapper">
          <Input placeholder={this.props.placeholder} value={this.getValue() ? this.getValue().fileName : undefined} readOnly/>
          {uploadPane}
          <a className={this.state.status === 'done' ? "btn btn-default" : "hide"} target="_blank" href={this.getValue() ? this.getValue().url : undefined}>查看</a>
        </div>

        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必须上传文件</span>
      </div>
    );
  }
});

export default UploadFile;