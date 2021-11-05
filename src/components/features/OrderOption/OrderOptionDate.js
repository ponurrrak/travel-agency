import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import './DatePickerStyles/react-datepicker.css';

const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <div>
    <DatePicker selected={currentValue} onChange={(date) => setOptionValue(date)} />
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.instanceOf(Date).isRequired,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionDate;
