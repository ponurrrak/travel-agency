import React from 'react';
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

const sendOrder = (options, tripCost, otherProps) => {
  if(!options.name || !options.contact){
    alert(settings.message);
    return;
  }
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
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({options, setOrderOption, tripCost, ...otherProps}) => (
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
    <Button variant='center bigger' onClick={() => sendOrder(options, tripCost, otherProps)}>Order now!</Button>
  </Row>
);

OrderForm.propTypes = {
  options: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
  tripCost: PropTypes.string.isRequired,
};

export default OrderForm;
