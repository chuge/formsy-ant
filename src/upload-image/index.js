import React, { Component, PropTypes } from 'react';
import { withFormsy } from 'formsy-react';
import { omitFormsyProps } from '../util';

import Shim from './shim';

class FormsyUploadImage extends Component {

  static propTypes = {
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    formsyAntd: PropTypes.shape({
      emitError: PropTypes.func.isRequired
    })
  };

  componentWillUpdate() {
    if (this.context.formsyAntd && !this.props.isPristine()) {
      const message = this.props.getErrorMessage();
      const status = message === null ? 'success' : 'error';
      this.context.formsyAntd.emitError(message, status);
    }
  }

  _change = (data) => {
    this.setValue(data.url);
    if (this.props.cbChange) {
      this.props.cbChange(data);
    }
  }

  render() {
    let {
      style,
      className,
      name,
      type,
      width,
      height,
      size,
      data,
      uploadUrl,
      disabledGIF
    } = this.props;

    const value = this.props.getValue();

    const props = omitFormsyProps(this.props);

    return (
      <div className={className}>
        <input type={type || 'text'} name={name} value={value} className="hide" readOnly/>

        <Shim {...props} style={style} value={value} width={width} height={height} size={size} className={className} cbChange={this._change} data={data} uploadUrl={uploadUrl} disabledGIF={disabledGIF}/>
      </div>
    );
  }
}

export default withFormsy(FormsyUploadImage);