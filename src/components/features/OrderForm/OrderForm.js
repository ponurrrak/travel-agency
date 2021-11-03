import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = props => (
  <Row>
    <Col xs={12}>
      <OrderSummary {...props} />
    </Col>
  </Row>
);

export default OrderForm;
