import React from 'react';
import Formsy from 'formsy-react';
import UploadImageShim from './UploadImageShim';

const UploadImage = React.createClass({

  mixins: [Formsy.Mixin],

  handleImageChanged(imageLink) {
    this.setValue(imageLink);
    if (this.props.cbImageChanged) {
      this.props.cbImageChanged(imageLink);
    }
  },

  render() {
    const className = 'form-group clearfix ' + (this.props.className || ' ') +
      (this.showRequired() && !this.isPristine() ? ' required' : this.showError() ? ' error' : '');

    const errorMessage = this.getErrorMessage();

    const value = this.getValue();

    return (
      <div className={className}>
        <input type={this.props.type || 'text'} name={this.props.name} value={value} className="hide" readOnly/>
        <UploadImageShim value={value} width={this.props.width} height={this.props.height} className={this.props.className} cbImageChanged={this.handleImageChanged}/>

        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-required'>必填</span>
      </div>
    );
  }
});

export default UploadImage;