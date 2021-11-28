import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate proper link url based on component id property', () => {
    const idProp = 'Panama';
    const component = shallow(<TripSummary id={idProp} image='' name='' days={0} cost='' />);
    expect(component.find('.link').prop('to')).toEqual(`/trip/${idProp}`);
  });
  it('should have <img> with proper src and alt attributes based on component image and name props', () => {
    const imageProp = 'image.jpg';
    const nameProp = 'image name';
    const component = shallow(<TripSummary id='' days={0} cost='' image={imageProp} name={nameProp} />);
    expect(component.find('img').prop('src')).toEqual(imageProp);
    expect(component.find('img').prop('alt')).toEqual(nameProp);
  });
  it('should render name, days and cost props properly', () => {
    const nameProp = 'image name';
    const daysProp = 10;
    const costProp = '100.000$';
    const component = shallow(<TripSummary id='' image='' name={nameProp} days={daysProp} cost={costProp} />);
    expect(component.find('.title').text()).toEqual(nameProp);
    expect(component.find('.details span:first-child').text()).toEqual(`${daysProp} days`);
    //expect(component.find('.details span:last-child').text()).toEqual(`from ${costProp}`);
  });
  it('should throw error without any of required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
  it('should render tags in <span> elements in the same order as defined in array that is passed as tags prop', () => {
    const tagsProp = ['Cuba', 'Peru', 'Zambia'];
    const component = shallow(<TripSummary id='' image='' name='' days={0} cost='' tags={tagsProp}/>);
    for(let i=0; i<tagsProp.length; i++){
      expect(component.find('.tags .tag').at(i).text()).toEqual(tagsProp[i]);
    }
  });
  it('shouldn\'t render div of .tags class when no tags are passed', () => {
    let component = shallow(<TripSummary id='' image='' name='' days={0} cost='' />);
    expect(component.find('.tags').exists()).toEqual(false);
    component = shallow(<TripSummary id='' image='' name='' days={0} cost='' tags={[]}/>);
    expect(component.find('.tags').exists()).toEqual(false);
  });
});
