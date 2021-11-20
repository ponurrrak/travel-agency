import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.module.scss';
import {formatTime} from '../../../utils/FormatTime';

const promoStartHour = 12;

class HappyHourAd extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }
  static defaultProps = {
    title: 'Happy Hour !',
    promoDescription: 'It\'s your time! Take advantage of Happy Hour! All offers 20% off!',
  };
  constructor(props){
    super(props);
    setInterval(() => this.forceUpdate(), 1000);
  }
  getCountdownTime() {
    const localTimeNow = new Date();
    const nextPromoLocalTime = new Date(Date.UTC(localTimeNow.getUTCFullYear(), localTimeNow.getUTCMonth(), localTimeNow.getUTCDate(), promoStartHour));
    if(localTimeNow.getUTCHours() >= promoStartHour){
      nextPromoLocalTime.setUTCDate(localTimeNow.getUTCDate() + 1);
    }
    return Math.round((nextPromoLocalTime.getTime() - localTimeNow.getTime()) / 1000);
  }
  render() {
    const {promoDescription, title} = this.props;
    const coundownTime = this.getCountdownTime();
    const isPromoTimeNow = (coundownTime / (60 * 60)) > 23;
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>
          {isPromoTimeNow ? promoDescription : formatTime(coundownTime)}
        </div>
      </div>
    );
  }
}

export default HappyHourAd;
