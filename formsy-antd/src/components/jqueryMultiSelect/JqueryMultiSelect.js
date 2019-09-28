import React from 'react';

import Formsy from 'formsy-react';

import mutliSelect from './jquery.multi-select.js';
import quicksearch from './jquery.quicksearch.js';

import Style from './multi-select.less';

const JqueryMultiSelect = React.createClass({

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      name: this.props.name,
      dataSource: this.props.dataSource,
      value: this.props.value || []
    }
  },

  componentWillMount() {
    Style.use();
  },

  componentDidMount() {

    this.props.style && $(this.refs[this.state.name]).css(this.props.style)

    let html = '<select multiple="multiple">';

    this.state.dataSource && this.state.dataSource.length != 0 && this.state.dataSource.map((el, index) => {
      if (el.children) {
        html += '<optgroup label="' + el.text + '">';
        el.children.map((el, index) => {
          html += '<option value="' + el.key + '">' + el.text + '</option>'
        })
        html += '</optgroup>'
      } else {
        html += '<option value="' + el.key + '">' + el.text + '</option>'
      }
    })
    html += '</select>';

    let $select = $(this.refs[this.state.name]).html('').append(html).children('select');
    let $selectableCount, $selectionCount;

    let _this = this;
    let selectableHeaderTitle = _this.props.selectableHeader ? _this.props.selectableHeader : '选择标签';
    let selectionHeaderTitle = _this.props.selectionHeader ? _this.props.selectionHeader : '已选标签';

    $select.multiSelect({
      selectableHeader: '<div class="mutliSelectSearchGroup"><div class="mutliSelectHeader"><div class="title">' + selectableHeaderTitle + '<span class="matchCount"></span></div><div class="selectAll">添加全部</div></div><div class="searchInput"><input type="text" class="ant-input mutliSelectSearch selectableSearch" autocomplete="off" placeholder="搜索"><i class="anticon anticon-search"></i></div></div>',
      selectionHeader: '<div class="mutliSelectSearchGroup"><div class="mutliSelectHeader"><div class="title">' + selectionHeaderTitle + '<span class="matchCount"></span></div><div class="deleteAll">删除全部</div></div><div class="searchInput"><input type="text" class="ant-input mutliSelectSearch selectionSearch" autocomplete="off" placeholder="搜索"><i class="anticon anticon-search"></i></div></div>',
      //selectableOptgroup: true,
      afterInit: function(ms) {
        let that = this,
          $selectableSearch = that.$selectableUl.prev().find('input'),
          $selectionSearch = that.$selectionUl.prev().find('input'),
          selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
          selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';
        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
          .on('keydown', function(e) {
            if (e.which === 40) {
              that.$selectableUl.focus();
              return false;
            }
          });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
          .on('keydown', function(e) {
            if (e.which == 40) {
              that.$selectionUl.focus();
              return false;
            }
          });
        let $selectAll = that.$selectableUl.prev().find('.selectAll');
        let $delete = that.$selectionUl.prev().find('.deleteAll');
        $selectAll.on('click', function() {
          $select.multiSelect('select_all');
          return false;
        })
        $delete.on('click', function() {
          $select.multiSelect('deselect_all');
          return false;
        })

        $selectableCount = that.$selectableUl.prev().find('.matchCount');
        $selectionCount = that.$selectionUl.prev().find('.matchCount');

        $selectableCount.html('(' + this.qs1.matchedResultsCount + ')');
        $selectionCount.html('(' + this.qs2.matchedResultsCount + ')');
      },
      afterSelect: function() {
        this.qs1.cache();
        this.qs2.cache();
        $selectableCount.html('(' + this.qs1.matchedResultsCount + ')');
        $selectionCount.html('(' + this.qs2.matchedResultsCount + ')');

        let selectVal = $select.val();
        if (!selectVal || selectVal.length === 0) {
          _this.setValue(undefined);
        } else {
          _this.setValue(selectVal);
        }
        _this.props.cbSelect && _this.props.cbSelect(selectVal);
      },
      afterDeselect: function() {
        this.qs1.cache();
        this.qs2.cache();
        $selectableCount.html('(' + this.qs1.matchedResultsCount + ')');
        $selectionCount.html('(' + this.qs2.matchedResultsCount + ')');

        let selectVal = $select.val();
        if (!selectVal || selectVal.length === 0) {
          _this.setValue(undefined);
        } else {
          _this.setValue(selectVal);
        }
        _this.props.cbSelect && _this.props.cbSelect(selectVal);
      }
    }).multiSelect('select', this.state.value);
  },

  componentWillUnmount() {
    Style.unuse();
  },

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dataSource) != JSON.stringify(this.state.dataSource)) {
      this.setState({
        dataSource: nextProps.dataSource,
      }, function() {
        this.componentDidMount();
      })
    }

    if (JSON.stringify(nextProps.value) != JSON.stringify(this.state.value)) {
      this.setState({
        value: nextProps.value
      })
      $(this.refs[this.state.name]).find('select').multiSelect('select', nextProps.value);
    }
  },

  render() {
    return (
      <div ref = {this.state.name} >

      </div>
    );
  }
});
export default JqueryMultiSelect;