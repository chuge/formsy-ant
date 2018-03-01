import React, {Component, PropTypes} from 'react';
import {withFormsy} from 'formsy-react';
import {omitFormsyProps} from '../util';

import {
  Input,
  Icon
} from 'antd';

import './index.less';

class FormsyTTransfer extends Component {

  componentDidMount() {
    let defaultVal = this.props.getValue();
    Array.isArray(defaultVal) && defaultVal.length === 0 && this.props.setValue(undefined);
  }

  hoverData(key, type) {
    this.setState({
      activeKey: `${key}${type}`
    })
  }

  choseData(key, type) {
    let value = this.props.getValue() || [];
    if (type === '1') {
      value.push(key);
    } else {
      value = value.filter(item => {
        return item !== key;
      });
    }
    value = value.length === 0 ? undefined : value;
    this.setValue(value);
  }

  getChildData(data, value, type) {
    value = value || [];
    let newData = [];
    data.forEach(item => {
      let newChild = [];
      if (Array.isArray(item.children) && item.children.length > 0) {
        item.children.forEach(_item => {
          if (value.includes(_item.key)) {
            if (type === '2') {
              newChild.push(_item);
            }
          } else {
            if (type === '1') {
              newChild.push(_item);
            }
          }
        });
      }
      newData.push({
        key: item.key,
        text: item.text,
        children: newChild
      })
    });
    return newData;
  }

  getLength(data) {
    let len = 0;
    data.forEach(item => {
      len += Array.isArray(item.children) ? item.children.length : 0;
    });
    return len;
  }

  addAll() {
    let {
      dataSource,
      isTag
    } = this.props;
    let value = [];
    Array.isArray(dataSource) && dataSource.forEach(item => {
      Array.isArray(item.children) && item.children.forEach(_item => {
        if (!isTag || _item.key.indexOf('.') !== -1) {
          value.push(_item.key);
        }
      });
    });
    this.setValue(value);
  }

  deleteAll() {
    this.setValue(undefined);
  }

  searchData(type) {
    if (type === '1') {
      this.setState({
        unChoseWord: this.refs.unChoseWord.refs.input.value
      });
    } else {
      this.setState({
        choseWord: this.refs.choseWord.refs.input.value
      });
    }
  }

  render() {
    let {
      className,
      placeholder,
      dataSource,
      isTag,
      getValue
    } = this.props;
    let value = getValue() || [];
    let unChoseData = this.getChildData(dataSource, value, '1');
    let choseData = this.getChildData(dataSource, value, '2');
    let dataLength = this.getLength(dataSource);
    let {
      activeKey,
      choseWord,
      unChoseWord
    } = this.state;
    return (
      <div className={`mulit-select ${className || ''} clearfix`}>
        <div className="mulit-box fl mr10" ref = {this.props.name}>
          <div className="select-box">
            <div className="header">
              <span>选择标签{!isTag && `（${dataLength - (value.length || 0)}）`}</span>
              <span className="fr copy-a" onClick={this.addAll}>添加全部</span>
            </div>
            <div className="search">
              <Input type="text" ref="unChoseWord" size="large" onChange={this.searchData.bind(this, '1')} placeholder={placeholder || '搜索'} />
              <Icon type="search" className="icon-search" />
            </div>
            <div className="ms-list">
              {
                unChoseData.map((item) => {
                  let data = item.children;
                  if (Array.isArray(data) && data.length > 0 && item.key.indexOf('.') !== -1) {
                    let child = data.map((_item) => {
                      if ((!unChoseWord || _item.text.indexOf(unChoseWord) !== -1)) {
                        return <li key={_item.key} className={`text ${activeKey === `${_item.key}1` && 'text-hover'}`} onClick={this.choseData.bind(this, _item.key, '1')} onMouseOver={this.hoverData.bind(this, _item.key, '1')}>{_item.text}</li>
                      }
                    })
                    return (
                      <ul key={item.key}>
                        <li className="text-title">{item.text}</li>
                        <ul>
                          {child}
                        </ul>
                      </ul>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className="mulit-box fl" ref = {this.props.name}>
          <div className="select-box">
            <div className="header">
              <span>选择标签（{value.length || '0'}）</span>
              <span className="fr copy-a" onClick={this.deleteAll}>删除全部</span>
            </div>
            <div className="search">
              <Input type="text" ref="choseWord" size="large" onChange={this.searchData.bind(this, '2')} placeholder={placeholder || '搜索'} />
              <Icon type="search" className="icon-search" />
            </div>
            <div className="ms-list">
              {
                choseData.map((item) => {
                  let data = item.children;
                  if (Array.isArray(data) && data.length > 0) {
                    let child = data.map((_item) => {
                      if (!choseWord || _item.text.indexOf(choseWord) !== -1) {
                        return <li key={_item.key} className={`text ${activeKey === `${_item.key}2` && 'text-hover'}`} onClick={this.choseData.bind(this, _item.key, '2')} onMouseOver={this.hoverData.bind(this, _item.key, '2')}>{_item.text}</li>
                      }
                    });
                    return (
                      <ul key={item.key}>
                        <li className="text-title">{item.text}</li>
                        <ul>
                          {child}
                        </ul>
                      </ul>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        {
          this.showRequired() && <p className='validation-required red-text'>至少选择一个标签</p>
        }
      </div>
    );
  }
}

export default withFormsy(FormsyTTransfer);