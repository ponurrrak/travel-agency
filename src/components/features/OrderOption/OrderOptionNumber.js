import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {parseOptionPrice} from '../../../utils/parseOptionPrice';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, setOptionValue, limits, tripCost, price}) => {
  const optionPrice = parseOptionPrice(price);
  let optionPriceTotal;
  switch (optionPrice.type){
    case 'number':
      optionPriceTotal = formatPrice(optionPrice.value);
      break;
    case 'multiplier':
      optionPriceTotal = formatPrice(optionPrice.value * parseOptionPrice(tripCost).value);
      break;
    default:
      optionPriceTotal = '';
  }
  return (
    <div className={styles.number}>
      <input
        type="number"
        className={styles.inputSmall}
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(parseInt(event.currentTarget.value))}
      />
      <span>
        {` (${optionPriceTotal})`}
      </span>
    </div>
  );
};

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number.isRequired,
  setOptionValue: PropTypes.func.isRequired,
  limits: PropTypes.object.isRequired,
  tripCost: PropTypes.string.isRequired,
  price: PropTypes.node.isRequired,
};

export default OrderOptionNumber;
