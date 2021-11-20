import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = {
  title: 'Happy Hour !',
  promoDescription: 'It\'s your time! Take advantage of Happy Hour! All offers 20% off!',
};

describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.isEmptyRender()).toEqual(false);
  });
  it('should render header and promo description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  it('should have title equal to corresponding prop', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find(select.title).text()).toEqual(mockProps.title);
  });
});

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

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    //global.Date = mockDate(`2019-05-14T${time}.135Z`);
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    jest.useFakeTimers();
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    //global.Date = mockDate(`2019-05-14T${time}.135Z`);
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newFakeTime = new Date();
    newFakeTime.setSeconds(newFakeTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newFakeTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked Date during Promo', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});

describe('Component HappyHourAd with mocked Date before Promo and delay that ends during Promo', () => {
  checkDescriptionAfterTime('11:59:59', 1, mockProps.promoDescription);
});
