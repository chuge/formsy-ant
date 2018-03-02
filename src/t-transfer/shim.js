/**
 *  左右交叉select组件
    必要参数：
            dataSource           :  Array               选择原数据   eg:[{key: "60100", text: "保险（旧）", children: [{key: "60111", text: "测试12（旧）", children: Array(0)}]]}]

    可选参数：
            className            ：  String              类名
            placeholder          :   String             默认提示输入信息
            isTag                :   Boolean            是否为标签类型（根据需求，标签类型有特殊处理，及旧标签只在右侧已选中区显示，当取消后，不在可选，及在左侧不显示旧标签）
            isSingle             :   Boolean            是否单选
            cbSelect             :   Function           修改选中项回调（会将修改后的value作为参数返回）
 */

import React from 'react';

import {
  Input,
  Icon
} from 'antd';

import Style from './shim.less';
export default class MyMulitSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: undefined,
      choseWord: undefined,
      unChoseWord: undefined,
      value: props.value || undefined
    };
  }

  componentDidMount () {
    Style.use();
  }

  componentWillUnmount() {
    Style.unuse();
  }

  hoverData(key, type) {
    this.setState({
      activeKey: `${key}${type}`
    })
  }

  choseData(key, type) {
    let {
      isSingle
    } = this.props;
    let value = this.state.value || [];
    if (type === '1') {
      if (!isSingle) {
        value.push(key);
      } else {
        value = [key];
      }
    } else {
      if (!isSingle) {
        value = value.filter(item => {
          return item !== key;
        });
      } else {
        value = [];
      }
    }
    value = value.length === 0 ? undefined : value;
    this.setState({
      value
    });
    this.props.cbSelect(value);
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
    this.setState({
      value
    });
    this.props.cbSelect(value);
  }

  deleteAll() {
    let value = undefined;
    this.setState({
      value
    });
    this.props.cbSelect(value);
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
      isSingle
    } = this.props;
    let {
      value
    } = this.state;
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
              <span>选择标签{!isTag && !isSingle && `（${dataLength - (value.length || 0)}）`}</span>
              {!isSingle && <span className="fr copy-a" onClick={() => {
                this.addAll();
              }}>添加全部</span>}
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
              <span>选择标签{!isSingle && `（${value && value.length || '0'}）`}</span>
              {!isSingle && <span className="fr copy-a" onClick={() => {
                this.deleteAll();
              }}>删除全部</span>}
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
      </div>
    );
  }
}