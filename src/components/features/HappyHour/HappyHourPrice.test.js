import React from 'react';
import {act} from 'react-dom/test-utils';
import Enzyme, {shallow, mount} from 'enzyme';
import HappyHourPrice from './HappyHourPrice';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const select = {
  span: 'span',
  strong: 'span strong',
  promoPriceStrong: 'span .promoPrice',
};

const portionsOfText = {
  priceFrom: 'Price from: ',
  standardPrice: 'Standard price: ',
  promoPrice: '$41,104.49',
};

const mockProps = {
  cost: '$51,380.61',
  promoParams: {
    rate: 0.2,
    start: 12,
    end: 13,
  },
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

const checkElemAtTime = (time, select, expectedResultLength, expectedResultText) => {
  it(`should render at ${time} ${expectedResultLength} element(s) matching with "${select}" selector, having expected content as well`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    const component = shallow(<HappyHourPrice {...mockProps} />);
    const renderedResult = component.find(select);
    const renderedResultLength = renderedResult.length;
    expect(renderedResultLength).toBe(expectedResultLength);
    if(expectedResultLength === 1){
      const renderedResultText = renderedResult.text();
      expect(renderedResultText).toEqual(expectedResultText);
    }
    global.Date = trueDate;
  });
};

const checkElemAfterTime = (time, delaySeconds, select, expectedResult) => {
  it(`should render correct content of element matching with "${select}" selector ${delaySeconds} seconds after ${time}`, () => {
    const currentDateOnly = new Date().toISOString().split('T')[0];
    jest.useFakeTimers();
    global.Date = mockDate(`${currentDateOnly}T${time}.135Z`);
    const component = mount(<HappyHourPrice {...mockProps} />);
    const newFakeTime = new Date();
    newFakeTime.setSeconds(newFakeTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newFakeTime.getTime());
    act(()=> {
      jest.advanceTimersByTime(delaySeconds * 1000);
    });
    component.update();
    const renderedResult = component.find(select).text();
    expect(renderedResult).toEqual(expectedResult);
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourPrice', () => {
  it('should render without crashing when props are passed', () => {
    const component = shallow(<HappyHourPrice {...mockProps} />);
    expect(component.isEmptyRender()).toEqual(false);
  });
  it('should throw an error when no props are passed', () => {
    const component = () => shallow(<HappyHourPrice/>);
    expect(component).toThrow();  });
  checkElemAtTime('11:59:59', select.span, 1, portionsOfText.priceFrom + mockProps.cost);
  checkElemAtTime('11:59:59', select.strong, 1, portionsOfText.priceFrom);
  checkElemAtTime('11:59:59', select.promoPriceStrong, 0);
  checkElemAtTime('12:00:01', select.promoPriceStrong, 1, portionsOfText.priceFrom + portionsOfText.promoPrice);
  checkElemAtTime('12:00:01', select.span, 1, portionsOfText.priceFrom + portionsOfText.promoPrice + portionsOfText.standardPrice + mockProps.cost);
  checkElemAtTime('12:59:59', select.promoPriceStrong, 1, portionsOfText.priceFrom + portionsOfText.promoPrice);
  checkElemAtTime('12:59:59', select.span, 1, portionsOfText.priceFrom + portionsOfText.promoPrice + portionsOfText.standardPrice + mockProps.cost);
  checkElemAtTime('13:00:01', select.span, 1, portionsOfText.priceFrom + mockProps.cost);
  checkElemAtTime('13:00:01', select.strong, 1, portionsOfText.priceFrom);
  checkElemAtTime('13:00:01', select.promoPriceStrong, 0);

  //Those 6 tests below are not being passed although functionality tested seems to work fine in browser. I can't find where the problem is.
  checkElemAfterTime('13:00:00', 23 * 60 * 60, select.promoPriceStrong, portionsOfText.priceFrom + portionsOfText.promoPrice);
  checkElemAfterTime('13:00:00', 23 * 60 * 60, select.span, portionsOfText.priceFrom + portionsOfText.promoPrice + portionsOfText.standardPrice + mockProps.cost);
  checkElemAfterTime('11:59:59', 2, select.promoPriceStrong, portionsOfText.priceFrom + portionsOfText.promoPrice);
  checkElemAfterTime('11:59:59', 2, select.span, portionsOfText.priceFrom + portionsOfText.promoPrice + portionsOfText.standardPrice + mockProps.cost);
  checkElemAfterTime('12:00:00', 60 * 60, select.span, portionsOfText.priceFrom + mockProps.cost);
  checkElemAfterTime('12:59:59', 2, select.span, portionsOfText.priceFrom + mockProps.cost);
});
