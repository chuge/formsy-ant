import React from 'react';
import Formsy from 'formsy-react';

const HiddenInput = React.createClass({
  mixins: [Formsy.Mixin],

  render: function() {
    return (
      <div>
        <input type="hidden" value={this.getValue()}/>
      </div>
    );
  }
});
export default HiddenInput;