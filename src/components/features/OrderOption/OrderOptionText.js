import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionText = ({currentValue, setOptionValue}) => (
  <div>
    <input
      type="text"
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string.isRequired,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionText;
