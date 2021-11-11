import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {formatPrice} from '../../../utils/formatPrice';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value !== id);
  }
};

const OrderOptionCheckboxes = ({currentValue, setOptionValue, values}) => (
  <div className={styles.checkboxes}>
    {values.map(value =>
      <label
        key={value.id}
      >
        <input
          type="checkbox"
          value={value.id}
          checked={currentValue.indexOf(value.id) > -1}
          onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        />
        {`${value.name} (${formatPrice(value.price)})`}
      </label>,
    )}
  </div>
);

OrderOptionCheckboxes.propTypes = {
  currentValue: PropTypes.array.isRequired,
  setOptionValue: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default OrderOptionCheckboxes;
