import React, {Component, PropTypes} from 'react';
import Form from 'antd/lib/form';

const Item = Form.Item;

class FormItem extends Component {
  static childContextTypes = {
    formsyAntd: PropTypes.object
  };

  state = {};

  getChildContext() {
    return {formsyAntd: {
      emitError: this.handleError
    }};
  }

  handleError = (help, validateStatus) => this.setState({help, validateStatus});

  render() {
    const {help, validateStatus} = this.state;
    const {help: helpP, validateStatus: validateStatusP, ...props} = this.props;

    return (
      <Item
        {...props}
        help={help || helpP}
        validateStatus={validateStatus || validateStatusP}
      />
    );
  }
}

export default FormItem;
