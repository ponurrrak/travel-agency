import React from 'react';
import {shallow} from 'enzyme';
import PhoneContact from './PhoneContact';

const mockSchedule = [
  {
    name: 'Mike',
    phone: '987654321',
    availableFrom: '12:00:00',
    availableTo: '18:30:00',
  },
  {
    name: 'Amanda',
    phone: '123456789',
    availableFrom: '18:00',
    availableTo: '02:00:00',
  },
  {
    availableFrom: '02:00',
    availableTo: '12:00:00',
    message: 'Sorry, we are not available now',
  },
];


const select = {
  phoneContact: '.phoneContact',
};

const trueDate = Date;
const mockDate = customDate => (
  class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now(){
      return (new Date(customDate)).getTime();
    }
  }
);

const checkPhoneAtTime = (time, expectedPhone) => {
  it(`should show correct phone number or no contact info at ${time}`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    const component = shallow(<PhoneContact clientServiceSchedule={mockSchedule} />);
    const renderedPhone = component.find(select.phoneContact).text();
    expect(renderedPhone).toEqual(expectedPhone);
    global.Date = trueDate;
  });
};

const checkPhoneAfterTime = (time, delaySeconds, expectedPhone) => {
  it(`should show correct phone number or no contact info ${delaySeconds} seconds after ${time}`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    jest.useFakeTimers();
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    const component = shallow(<PhoneContact clientServiceSchedule={mockSchedule} />);
    const newFakeTime = new Date();
    newFakeTime.setSeconds(newFakeTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newFakeTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedPhone = component.find(select.phoneContact).text();
    expect(renderedPhone).toEqual(expectedPhone);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component PhoneContact', () => {
  it('should render without crashing when props are passed', () => {
    const component = shallow(<PhoneContact clientServiceSchedule={mockSchedule} />);
    expect(component.isEmptyRender()).toEqual(false);
  });
  it('should throw an error when no props are passed', () => {
    const component = () => shallow(<PhoneContact />);
    expect(component).toThrow();
  });
  checkPhoneAtTime('11:59:59', mockSchedule[2].message);
  checkPhoneAtTime('12:00:01', mockSchedule[0].phone);
  checkPhoneAtTime('18:29:59', mockSchedule[0].phone);
  checkPhoneAtTime('18:30:01', mockSchedule[1].phone);
  checkPhoneAtTime('01:59:59', mockSchedule[1].phone);
  checkPhoneAtTime('02:00:01', mockSchedule[2].message);
  checkPhoneAfterTime('02:00:00', 10 * 60 * 60, mockSchedule[0].phone);
  checkPhoneAfterTime('11:59:59', 2, mockSchedule[0].phone);
  checkPhoneAfterTime('12:00:00', 6 * 60 * 60 + 30 * 60, mockSchedule[1].phone);
  checkPhoneAfterTime('18:29:59', 2, mockSchedule[1].phone);
  checkPhoneAfterTime('18:30:00', 7 * 60 * 60 + 30 * 60, mockSchedule[2].message);
  checkPhoneAfterTime('01:59:59', 2, mockSchedule[2].message);
});
