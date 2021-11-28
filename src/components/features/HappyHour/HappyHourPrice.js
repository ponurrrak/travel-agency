import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourPrice.module.scss';

const countPromoPrice = (standardPriceString, promoRate) => {
  const standardPriceNumber = parseFloat(standardPriceString.replace(/[^0-9.]/g, ''));
  const promoPrice = (standardPriceNumber - standardPriceNumber * promoRate).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return promoPrice;
};

const getDataForState = (promoParams) => {
  const dateNow = new Date();
  const hourNow = dateNow.getUTCHours();
  const isPromoActive = (hourNow === promoParams.start) ? true : false;
  const delay = isPromoActive ?
    (Date.UTC(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), promoParams.end)) - (Math.round(dateNow.getTime() / 1000) * 1000)
    :
    hourNow < promoParams.start ?
      (Date.UTC(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), promoParams.start)) - (Math.round(dateNow.getTime() / 1000) * 1000)
      :
      (Date.UTC(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate() + 1, promoParams.start)) - (Math.round(dateNow.getTime() / 1000) * 1000);
  return {
    isPromoActive,
    delay,
  };
};

const HappyHourPrice = props => {
  const {cost, promoParams} = props;
  const promoPrice = countPromoPrice(cost, promoParams.rate);

  const [state, setState] = useState(getDataForState(promoParams));

  useEffect(() => {
    setTimeout(() => {
      setState(getDataForState(promoParams));
    }, state.delay);
  }, [state]);

  return (
    state.isPromoActive ?
      (<span>
        <strong className={styles.promoPrice}>{`Price from: ${promoPrice}`}</strong>
        {`Standard price: ${cost}`}
      </span>)
      :
      (<span>
        <strong>Price from: </strong>
        {cost}
      </span>)
  );
};

HappyHourPrice.propTypes = {
  cost: PropTypes.string.isRequired,
  promoParams: PropTypes.object.isRequired,
};

export default HappyHourPrice;
