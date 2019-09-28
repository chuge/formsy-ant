import React from 'react';

import Style from './shim.less';

import Loader from '../loader.js';

export default class EditorShim extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resourcesReady: false
    };
  }

  componentWillMount() {
    Style.use();
  }

  componentWillUnmount() {
    Style.unuse();
  }

  componentDidMount() {
    const {
      isImageHidden
    } = this.props;

    window.Loader.sync([
      '//yun.tuia.cn/tuia/tuia-advertiser/bower_components/jquery/dist/jquery.min.js',
      '//yun.tuia.cn/tuia/vendors/simditor.min.css',
      '//yun.tuia.cn/tuia/vendors/module.min.js',
      '//yun.tuia.cn/tuia/vendors/uploader.min.js',
      '//yun.tuia.cn/tuia/vendors/hotkeys.min.js',
      '//yun.tuia.cn/tuia/vendors/simditor.min.js'
    ], () => {
      this.setState({
        resourcesReady: true
      }, () => {
        let toolbar = ['title', 'bold', 'italic', 'underline', 'ol', 'ul', 'color', 'link', 'image'];
        if (isImageHidden) {
          toolbar.pop();
        }
        let editor, Simditor = window.Simditor;

        Simditor.locale = 'zh-CN';
        editor = new Simditor({
          textarea: $(`#${this.props.name}`),
          placeholder: '这里输入文字...',
          toolbar: toolbar,
          upload: {
            url: '/upload/uploadRichText',
            fileKey: 'file'
          },
          cleanPaste: true
        });

        editor.setValue(this.props.value || '');

        editor.on('blur', (e) => {
          const text = editor.getValue().replace(new RegExp(/target="_blank"/g), '');
          this.props.cbBlur(text);
        });
        let colors = ['#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#4E5F70', '#F1C40F', '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#2C3E50', '#F39C12', '#E67E22', '#E74C3C', '#ECF0F1', '#95A5A6', '#DDD', '#FFF', '#D35400', '#C0392B', '#BDC3C7', '#7F8C8D', '#999', '#000'];
        let html = '';
        colors.map((color) => {
          return html += `<li><a href="javascript:;" class="font-color" style="background-color:${color}"></a></li>`
        })
        $('.color-list').empty().append(html);
        $('.menu-item-h3 span').html('标题 H3')
      })
    });
  }

  render() {
    return (
      <div>
        {
          this.state.resourcesReady
            ?
            <textarea id={this.props.name} autofocus></textarea>
            :
            null
        }
      </div>
    );
  }
}