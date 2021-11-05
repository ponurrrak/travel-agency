import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import {formatPrice} from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    {required ? '' : (
      <div
        className={currentValue === '' ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle'/>
        none
      </div>
    )}
    {values.map(value =>
      <div
        key={value.id}
        className={currentValue === value.id ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon}/>
        {`${value.name} (${formatPrice(value.price)})`}
      </div>
    )}
  </div>
);

OrderOptionIcons.propTypes = {
  currentValue: PropTypes.string.isRequired,
  setOptionValue: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

export default OrderOptionIcons;
