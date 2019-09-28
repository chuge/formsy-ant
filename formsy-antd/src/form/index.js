import React, {Component, PropTypes} from 'react';
import Formsy from 'formsy-react';
import classNames from 'classnames';

class FormEx extends Formsy {
  static defaultProps = {
    ...Formsy.defaultProps,
    prefixCls: 'ant-form'
  };

  static propTypes = {
    prefixCls: React.PropTypes.string,
    inline: PropTypes.bool,
    horizontal: PropTypes.bool
  };

  render() {
    const form = super.render();
    console.log(form);
    const {prefixCls, inline, horizontal, className, ...props} = form.props;
    const cn = classNames({
      [`${prefixCls}-horizontal`]: horizontal,
      [`${prefixCls}-inline`]: inline,
      [className]: !!className
    });

    return React.cloneElement(form, {...props, className: cn});
  }
}

export default FormEx;

