import React from 'react';
import Formsy from 'formsy-react';
import {
  Modal
} from 'antd';

import Config from 'comcomp/Config';
import MyLoading from 'comcomp/loading/Loading';
import Style from './inputFile.less';

const InputFile = React.createClass({

  mixins: [Formsy.Mixin],

  componentWillMount() {
    Style.use();
  },
  componentWillUnmount() {
    Style.unuse();
  },
  isFileTypeValid(data) {
    const uploadErrors = [];
    const acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;
    const file = data['files'][0];

    // 不是指定文件格式，或者文件格式为空
    if (!file['type'] || file['type'].length && !acceptFileTypes.test(file['type'])) {
      uploadErrors.push(file['name'] + ' 不是gif,jpg,png图片格式');
    }

    if (file['size'].length && file['size'] > 20000000) {
      uploadErrors.push(file['name'] + ' 大小过大');
    }

    if (uploadErrors.length > 0) {
      Modal.error({
        title: '校验错误',
        content: uploadErrors.join('\n'),
        okText: '确定'
      });
      return false;
    } else {
      return true;
    }
  },

  getRealValue(param) {
    return this.getValue() ? this.getValue()[param] : '';
  },

  componentDidMount() {
    const _this = this;
    const url = Config.getValue('upload').url;

    $('#' + this.props.id + ' input[type="file"]').fileupload({
      url: url,
      dataType: 'json',
      add: function(e, data) {
        if (!_this.isFileTypeValid(data)) {
          return;
        }
        MyLoading.open();
        data.submit();
      },
      done: function(e, data) {
        const fileName = data['files'][0]['name'];
        const fileUrl = data['result']['data']['url'];

        _this.setValue({
          fileName: fileName,
          fileUrl: fileUrl
        });
        MyLoading.close();
      },
      error: function(e) {
        Modal.error({
          title: '提示',
          content: '上传失败',
          okText: '确定'
        });
        MyLoading.close();
      }
    });
  },
  render() {
    const rawClass = 'form-group input-file ' + (this.props.className || '');
    const classValue = rawClass + ' ' + (this.showRequired() && !this.isPristine() ? 'required' : this.showError() ? 'error' : '');

    const errorMessage = this.getErrorMessage();
    const watchClass = 'btn btn-default fileinput-button fileinput-button-watch' + (this.getRealValue('fileName') ? '' : ' hide');

    const uploadBtnText = this.getRealValue('fileName') ? '更改' : '浏览';

    return (
      <div className={classValue} id={this.props.id}>

        <div className="file">
          <input className=""
            type={this.props.type || 'text'}
            name={this.props.name}
            value={this.getRealValue('fileName')}
            placeholder={this.props.placeholder}
            readOnly/>

          <span className="btn btn-default fileinput-button fileinput-button-upload">
              <span className="name">{uploadBtnText}</span>
              <input type="file" name="file"/>
          </span>
          <a className={watchClass} href={this.getRealValue('fileUrl')} target="_blank">查看</a>
        </div>
        <span className='validation-required'>必填</span>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default InputFile;