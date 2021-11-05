import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  currentValue: PropTypes.string.isRequired,
  setOptionValue: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

export default OrderOptionDropdown;
