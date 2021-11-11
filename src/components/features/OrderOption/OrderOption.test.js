import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing and return empty object if called without proper "type" prop', () => {
    const component = shallow(<OrderOption id='' type='' name='' setOrderOption={()=>{}}/>);
    expect(component).toBeTruthy();
    expect(component).toEqual({});
  });
  it('should render "name" prop', () => {
    const nameProp = 'My name';
    const component = shallow(<OrderOption id='' type='icons' name={nameProp} setOrderOption={()=>{}}/>);
    console.log(component.debug());
    expect(component.find('.title').text()).toEqual(nameProp);
  });
});
