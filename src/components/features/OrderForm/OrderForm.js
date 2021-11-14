import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderForm.module.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import pricing from '../../../data/pricing.json';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import settings from '../../../data/settings';

const orderStatuses = {
  initial: 0,
  accepted: 1,
  rejected: 2,
};

const sendOrder = (options, tripCost, setOrderStatus, otherProps) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    ...otherProps,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(){
      setOrderStatus(orderStatuses.accepted);
    });
};

const OrderForm = ({options, setOrderOption, tripCost, ...otherProps}) => {
  const [orderStatus, setOrderStatus] = useState(orderStatuses.initial);
  useEffect(() => {
    if(orderStatus === 1){
      alert(settings.messages.success);
    } else if(orderStatus === 2){
      alert(settings.messages.error);
    }
    setOrderStatus(orderStatuses.initial);
  }, [orderStatus]);
  const errorHandler = (options, tripCost, otherProps) => {
    if(!options.name || !options.contact){
      setOrderStatus(orderStatuses.rejected);      
    } else {
      sendOrder(options, tripCost, setOrderStatus, otherProps);
    }
  };
  return (
    <Row className={styles.component}>
      {pricing.map(pricingOptionData => (
        <Col md={4} key={pricingOptionData.id}>
          <OrderOption
            {...pricingOptionData}
            tripCost={tripCost}
            currentValue={options[pricingOptionData.id]}
            setOrderOption={setOrderOption}
          />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary {...{tripCost, options}} />
      </Col>
      <Button variant='center bigger' onClick={() => errorHandler(options, tripCost, otherProps)}>Order now!</Button>
    </Row>
  );
};

OrderForm.propTypes = {
  options: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
  tripCost: PropTypes.string.isRequired,
};

export default OrderForm;
