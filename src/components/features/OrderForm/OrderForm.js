import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderForm.module.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

const OrderForm = ({options, setOrderOption, tripCost}) => (
  <div className={styles.component}>
  <Row>
    {pricing.map(pricingOptionData => (
      <Col md={4} key={pricingOptionData.id}>
        <OrderOption
          {...pricingOptionData}
          tripCost={tripCost}
          currentValue={options[pricingOptionData.id]}
          setOrderOption={setOrderOption}
        />
      </Col>
      )
    )}
    <Col xs={12}>
      <OrderSummary {...{tripCost, options}} />
    </Col>
  </Row>
  </div>
);

OrderForm.propTypes = {
  options: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
  tripCost: PropTypes.string.isRequired,
};

export default OrderForm;
