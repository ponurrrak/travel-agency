import React from 'react';
import PropTypes from 'prop-types';

class PhoneContact extends React.Component{
  static propTypes = {
    clientServiceSchedule: PropTypes.array.isRequired,
  };

  constructor(props){
    super(props);
    this.state = this.getDataForState();
  }

  extractTimeFromDate(hours, minutes, seconds){
    const timeOnly = new Date(0);
    timeOnly.setUTCHours(parseInt(hours));
    timeOnly.setUTCMinutes(parseInt(minutes) || 0);
    timeOnly.setUTCSeconds(parseInt(seconds) || 0);
    return timeOnly.getTime();
  }

  addExactTimeToSchedule(clientServiceSchedule){
    return (
      clientServiceSchedule.map(contact =>
        ({
          ...contact,
          availableFrom: this.extractTimeFromDate(...contact.availableFrom.split(':')),
          availableTo: this.extractTimeFromDate(...contact.availableTo.split(':')),
        })
      )
    );
  }

  findCurrentContact(clientServiceSchedule, timeOnlyNow) {
    clientServiceSchedule = this.addExactTimeToSchedule(clientServiceSchedule);
    return (
      clientServiceSchedule.filter(contact => (
        contact.availableFrom < contact.availableTo ?
          timeOnlyNow >= contact.availableFrom && timeOnlyNow < contact.availableTo
          :
          timeOnlyNow >= contact.availableFrom || timeOnlyNow < contact.availableTo
      ))
    )[0];
  }

  countTimeout(currentContact, timeOnlyNow){
    return (
      timeOnlyNow < currentContact.availableTo ?
        (currentContact.availableTo - timeOnlyNow)
        :
        ((currentContact.availableTo + 24 * 60 * 60 * 1000) - timeOnlyNow)
    );
  }

  getDataForState(){
    const {clientServiceSchedule} = this.props;
    const dateNow = new Date();
    const timeOnlyNow = this.extractTimeFromDate(dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds());
    const currentContact = this.findCurrentContact(clientServiceSchedule, timeOnlyNow);
    const delay = this.countTimeout(currentContact, timeOnlyNow);
    return {
      currentContact: {
        ...currentContact,
      },
      delay,
    };
  }

  updateState(){
    this.setState(() =>
      this.getDataForState()
    );
  }

  componentDidMount(){
    setTimeout(() => this.updateState(), this.state.delay);
  }

  componentDidUpdate(){
    setTimeout(() => this.updateState(), this.state.delay);
  }

  render(){
    const {currentContact} = this.state;
    return (
      <span className='phoneContact'>
        {currentContact.phone ? currentContact.phone : currentContact.message}
      </span>
    );
  }
}

export default PhoneContact;
