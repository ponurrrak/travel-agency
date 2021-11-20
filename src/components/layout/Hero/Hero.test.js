import React from 'react';
import {shallow} from 'enzyme';
import Hero from './Hero';

const select = {
  title: '.title',
  image: '.image',
};

const classNames = {
  component: 'component',
  small: 'small',
  dummy: 'dummy',
};

const mockProps = {
  titleText: 'Lorem ipsum',
  imageSrc: 'image.jpg',
  variants: 'small dummy',
};

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<Hero titleText={mockProps.titleText} imageSrc={mockProps.imageSrc}/>);
    expect(component).toBeTruthy();
  });
  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });
  it('should render correct title and image', () => {
    const component = shallow(<Hero titleText={mockProps.titleText} imageSrc={mockProps.imageSrc}/>);
    const renderedTitle = component.find(select.title).text();
    expect(renderedTitle).toEqual(mockProps.titleText);
    expect(component.find(select.image).prop('src')).toEqual(mockProps.imageSrc);
  });
  it('renders correct classNames', () => {
    const component = shallow(<Hero titleText={mockProps.titleText} imageSrc={mockProps.imageSrc} variant={mockProps.variants} />);
    expect(component.hasClass(classNames.component)).toBe(true);
    expect(component.hasClass(classNames.small)).toBe(true);
    expect(component.hasClass(classNames.dummy)).toBe(true);
  });
  it('should render HappyHourAd', () => {
    const component = shallow(<Hero titleText={mockProps.titleText} imageSrc={mockProps.imageSrc}/>);
    expect(component.find('HappyHourAd').length).toEqual(1);
  });
});
